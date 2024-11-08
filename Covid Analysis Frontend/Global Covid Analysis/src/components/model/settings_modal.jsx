import React from "react";
import "../../styles/model/settings_modal.css";

export default function Modal({
  setOpenModal,
  webPageMode,
  setWebPageMode,
  globeMode,
  setGlobeMode,
  animationEnabled,
  setAnimationEnabled
}) {
  return (
    <div onClick={() => { setOpenModal(false); }} className="modalBackground">
      <div onClick={(e) => { e.stopPropagation() }} className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => { setOpenModal(false); }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Settings</h1>
        </div>
        <div className="body">
          <div className="modal-setting">
            <h1>Web Page</h1>
            <label className="switch">
              <input
                type="checkbox"
                checked={webPageMode}
                onChange={(e) => setWebPageMode(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="modal-setting">
            <h1>Globe Mode</h1>
            <label className="switch">
              <input
                type="checkbox"
                checked={globeMode}
                onChange={(e) => setGlobeMode(e.target.checked)}
              />
            <span className="slider" data-label={globeMode ? "Night" : "Day"}></span>
            </label>
          </div>
          <div className="modal-setting">
            <h1>Animation</h1>
            <label className="switch">
              <input
                type="checkbox"
                checked={animationEnabled}
                onChange={(e) => setAnimationEnabled(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => { setOpenModal(false); }}
            id="cancelBtn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}