import React, { useEffect } from 'react';
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/dark.css';
import CountrySelector from "./country_selector";
import StatSelector from "./stat_selector";

export default function MenuSelection({ setSelectedDates, selectedDates, setAnalysisMode, analysisMode, setSelectedCountries, selectedCountries, setSelectedCountry, setSelectedStats, selectedStats, setStopRotation }) {

    const handleTargetDateChange = (dates) => {
        setSelectedDates((prevDates) => {
            const newDates = [...prevDates];
            newDates[0] = dates.length > 0 ? dates[0] : null;
            return newDates;
        });
    };

    const handleEndDateChange = (dates) => {
        setSelectedDates((prevDates) => {
            const newDates = [...prevDates];
            newDates[1] = dates.length > 0 ? dates[0] : null;
            return newDates;
        });
    };

    useEffect(() => {
        console.log(selectedDates);
    }, [selectedDates]);

    return (
        <>
            <div className="first-selection">
                <CountrySelector
                    setSelectedCountries={setSelectedCountries}
                    selectedCountries={selectedCountries}
                    setSelectedCountry={setSelectedCountry}
                    setStopRotation={setStopRotation}
                />
                <Flatpickr
                    placeholder="Target Date"
                    options={{
                        maxDate: "2024-07-06",
                        minDate: "2020-01-05",
                        enableTime: false
                    }}
                    value={selectedDates[0] || ''}
                    onChange={handleTargetDateChange}
                />
                {selectedDates[0] && (
                    <Flatpickr
                        placeholder="End Date (Optional)"
                        options={{
                            maxDate: "2024-07-06",
                            minDate: selectedDates[0],
                            enableTime: false
                        }}
                        value={selectedDates[1] || ''}
                        onChange={handleEndDateChange}
                    />
                )}
            </div>
            <StatSelector selectedStats={selectedStats} setSelectedStats={setSelectedStats} analysisMode={analysisMode}/>
            <button onClick={() => {
                setAnalysisMode(analysisMode + 1);
            }} className="go-button">Continue</button>
        </>
    );
}
