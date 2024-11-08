import React, { useState } from 'react';
import Globe from './globe';
import Menu from './menu';
import Settings from '../../assets/svg/settings';
import Modal from './settings_modal';
import "../../styles/model/model.css";

export default function Model() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState([])
    const [stopRotation, setStopRotation] = useState(false);

    const [webPageMode, setWebPageMode] = useState(false);
    const [globeMode, setGlobeMode] = useState(false);
    const [animationEnabled, setAnimationEnabled] = useState(false);
    
    return (
        <div className="model-wrapper">
            <Menu setStopRotation={setStopRotation} setSelectedCountry={setSelectedCountry} setSelectedCountries={setSelectedCountries} selectedCountries={selectedCountries}/>
            <Globe selectedCountry={selectedCountry} globeMode={globeMode} selectedCountries={selectedCountries} stopRotation={stopRotation} />
            <div onClick={() => setModalOpen(prevState => !prevState)}>
                <Settings />
            </div>
            {modalOpen && <Modal 
                    setOpenModal={setModalOpen}
                    webPageMode={webPageMode}
                    setWebPageMode={setWebPageMode}
                    globeMode={globeMode}
                    setGlobeMode={setGlobeMode}
                    animationEnabled={animationEnabled}
                    setAnimationEnabled={setAnimationEnabled} />
                    }
        </div>
    );
}
