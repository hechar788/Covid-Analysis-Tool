import { useState, useEffect } from "react";
import BackButton from "../../assets/svg/goback";
import MenuSelection from "./menu_selection";
import AnalysisMenu from "./analysis_menu";
import HelpModal from "../help_modal";

function Menu({ setStopRotation, setSelectedCountry, selectedCountries, setSelectedCountries }) {
    const [analysisMode, setAnalysisMode] = useState(0);
    const [selectedStats, setSelectedStats] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [helpModalOpen, setHelpModalOpen] = useState(false);


    useEffect(() => { console.log(selectedStats) }, [selectedStats])

    return (
        <div className="model-selection">
            <div className="model-title">
                <BackButton /> <h1>Analysis Menu</h1>
            </div>

            {analysisMode < 1 ? (
                <MenuSelection
                    setSelectedCountry={setSelectedCountry}
                    selectedStats={selectedStats}
                    setSelectedStats={setSelectedStats}
                    setSelectedCountries={setSelectedCountries}
                    selectedCountries={selectedCountries}
                    setAnalysisMode={setAnalysisMode}
                    analysisMode={analysisMode}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                    setStopRotation={setStopRotation}  // Pass setStopRotation to MenuSelection
                />
            ) : (
                <AnalysisMenu
                    setStopRotation={setStopRotation}
                    selectedStats={selectedStats}
                    selectedDates={selectedDates}
                    setSelectedStats={setSelectedStats}
                    selectedCountries={selectedCountries}
                    setSelectedCountry={setSelectedCountry}
                    setAnalysisMode={setAnalysisMode}
                    analysisMode={analysisMode}
                />
            )}
            <p className="help-button" onClick={() => setHelpModalOpen(true)}>click for more info</p>
            {helpModalOpen && <HelpModal setOpenHelpModal={setHelpModalOpen} />}
            
        </div>
    );
}

export default Menu;