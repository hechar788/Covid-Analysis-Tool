import { useEffect } from "react";
import "../styles/help_modal.css";
import vid from '../assets/vid_tutorial.mp4'
import click from '../assets/click-sound.mp3'

export default function HelpModal({ setOpenHelpModal }) {
    useEffect(() => {
        // Create an Audio instance
        const audio = new Audio(click);
    
        // Play the audio when the component mounts
        audio.play().catch((error) => {
          console.error("Failed to play sound:", error);
        });
    
        // Optionally, you can clean up or reset if needed
        // But typically not necessary for just playing a sound once
      }, []);  // Dependency array is empty to run only on mount
    

  return (
    <div onClick={() => setOpenHelpModal(false)} className="helpModalBackground">
      <div onClick={(e) => e.stopPropagation()} className="helpModalContainer">
        <div className="helpModalHeader">
          <button onClick={() => setOpenHelpModal(false)}>X</button>
        </div>
        <div className="helpModalContent">
          <h1>Information</h1>
          <p>This modal contains helpful information for using the analysis menu.</p>
        </div>
        <div className="helpModalContent">
            <h2>How to use</h2>
            <video width="65%" controls>
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}