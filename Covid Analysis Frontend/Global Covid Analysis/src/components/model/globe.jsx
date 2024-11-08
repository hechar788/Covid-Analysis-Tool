import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import JEASINGS, { Cubic, JEasing } from 'jeasings';
import day_map from '../../assets/3dmodel/day_earthmap.jpg';
import night_map from '../../assets/3dmodel/night_earthmap.jpg';
import background from '../../assets/3dmodel/model_background.jpg';

export default function Globe({ selectedCountry, globeMode, selectedCountries, stopRotation}) {
    const canvasRef = useRef();
    const sceneRef = useRef(new THREE.Scene());
    const cameraRef = useRef();
    const rendererRef = useRef();
    const yaw = useRef(new THREE.Object3D());
    const pitch = useRef(new THREE.Object3D());
    const earthRef = useRef();
    const pivot = useRef(new THREE.Object3D());


    useEffect(() => {
        const scene = sceneRef.current;
        scene.background = new THREE.TextureLoader().load(background);

        const camera = new THREE.PerspectiveCamera(75, (window.innerWidth * 0.7) / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 2);
        camera.lookAt(scene.position);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth * 0.7, window.innerHeight);
        rendererRef.current = renderer;

        const geometry = new THREE.SphereGeometry(1, 720, 360);
        const earthMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(globeMode ? night_map : day_map),
        });
        const earth = new THREE.Mesh(geometry, earthMaterial);
        earth.rotation.y = -Math.PI / 2;
        scene.add(earth);
        earthRef.current = earth;

        const pointerlight = new THREE.PointLight(0xffffff, 0.9);
        pointerlight.position.set(5, 3, 5);
        scene.add(pointerlight);

        const raycaster = new THREE.Raycaster();

        function onMouseDown(event) {
            const rect = renderer.domElement.getBoundingClientRect();
            const coords = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            raycaster.setFromCamera(coords, camera);
            const intersections = raycaster.intersectObjects(scene.getObjectByName('pins').children, true);
            if (intersections.length > 0) {
                const selectedObject = intersections[0].object;
                const color = new THREE.Color(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
                selectedObject.material.color = color;
                console.log(`${selectedObject.name} was clicked!`);
            }
        }

        function handlePointerMove(e) {
            if (e.buttons) {
                yaw.current.rotation.y -= e.movementX * 0.005;
                pitch.current.rotation.x -= e.movementY * 0.005;
                pitch.current.rotation.x = Math.min(Math.max(pitch.current.rotation.x, -Math.PI / 2), Math.PI / 2);
            }
        }

        renderer.domElement.addEventListener('pointermove', handlePointerMove);

        function animate() {
            renderer.render(scene, camera);
            JEASINGS.update();
        }

        renderer.setAnimationLoop(animate);

        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('wheel', function (e) {
            camera.position.z = camera.position.z + e.deltaY * 0.005
        })

        return () => {
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('pointermove', handlePointerMove);
            renderer.domElement.removeEventListener('wheel', function (e) {
                camera.position.z = camera.position.z + e.deltaY * 0.005
            })
    
        };
    }, []);

    useEffect(() => {
        let rotationFrameId;
        
        const verticalRotationSpeed = -0.000035; // Adjust this value for vertical speed
        const horizontalRotationSpeed = 0.00125; // Adjust this value for horizontal speed
    
        if (!stopRotation) {
            const rotateGlobe = () => {
                if (yaw.current && pitch.current) {
                    yaw.current.rotation.y += horizontalRotationSpeed; // Horizontal rotation
                    pitch.current.rotation.x += verticalRotationSpeed; // Vertical rotation
                    
                    // Ensure vertical rotation stays within bounds
                    pitch.current.rotation.x = Math.min(Math.max(pitch.current.rotation.x, -Math.PI / 2), Math.PI / 2);
                }
                rotationFrameId = requestAnimationFrame(rotateGlobe);
            };
            
            rotateGlobe();
        }
    
        // Cleanup to stop rotation on unmount or when stopRotation is true
        return () => cancelAnimationFrame(rotationFrameId);
    }, [stopRotation]);

    useEffect(() => {
        if (selectedCountry) {
          const { lat, lng } = selectedCountry;
          if (lat !== undefined && lng !== undefined) {
            goto(lat, lng);
          }
        }
      }, [selectedCountry]);
    useEffect(() => {
        if (earthRef.current) {
            const map = new THREE.TextureLoader().load(globeMode ? night_map : day_map);
            earthRef.current.material.map = map;
            earthRef.current.material.needsUpdate = true;
        }
    }, [globeMode]);

    useEffect(() => {
        if (!earthRef.current) return;
    
        // Find or create the pins group
        let pins = earthRef.current.getObjectByName('pins');
        if (!pins) {
            pins = new THREE.Group();
            pins.name = 'pins';
            earthRef.current.add(pins);
        }
    
        // Clear existing pins
        pins.clear();
    
        // Add new pins for each selected country
        selectedCountries.forEach((country) => {
            const pin = sphericalCoordinateConversion(country.lat, country.lng, country.name);
            pins.add(pin);
        });
    }, [selectedCountries]);    

    useEffect(() => {
        const scene = sceneRef.current;
        scene.add(pivot.current);
        pivot.current.add(yaw.current);
        yaw.current.add(pitch.current);
        pitch.current.add(cameraRef.current);
    }, []);

    function sphericalCoordinateConversion(lat, long, countryName) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (long + 180) * (Math.PI / 180);
        const x = -(Math.sin(phi) * Math.cos(theta));
        const z = Math.sin(phi) * Math.sin(theta);
        const y = Math.cos(phi);

        const pin = new THREE.Mesh(
            new THREE.SphereGeometry(0.01, 20, 20),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff0000) })
        );
        pin.name = countryName;
        pin.position.set(x, y, z);
        return pin;
    }

    function goto(lat, long) {
        const duration = 1250;

        new JEasing(pitch.current.rotation)
            .to({ x: (lat / 180) * Math.PI * -1 }, duration)
            .easing(Cubic.InOut)
            .start();

        new JEasing(yaw.current.rotation)
            .to({ y: (long / 180) * Math.PI }, duration)
            .easing(Cubic.InOut)
            .start();

        const halfDuration = duration / 2;

        new JEasing(cameraRef.current.position)
            .to({ z: 2 }, halfDuration)
            .easing(Cubic.InOut)
            .start()
            .onComplete(() => {
                new JEasing(cameraRef.current.position)
                    .to({ z: 1.65 }, halfDuration)
                    .easing(Cubic.InOut)
                    .start();
            });
    }

    function onWindowResize() {
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        camera.aspect = (window.innerWidth * 0.7) / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth * 0.7, window.innerHeight);
    }


    return <canvas ref={canvasRef} />;
}