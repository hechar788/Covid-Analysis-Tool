import { useEffect, useState } from "react";
import StatSelector from "./stat_selector";
import Countries from "./countries";
import Play from "../../assets/svg/play";
import '../../styles/model/analysis_menu.css';
import AnalysisModal from "./analysis_modal";

export default function AnalysisMenu({
  selectedCountries,
  setSelectedCountry,
  setAnalysisMode,
  analysisMode,
  selectedStats,
  setSelectedStats,
  selectedDates,
  setStopRotation
}) {
  const [countriesData, setCountriesData] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => selectedDates.length > 0 ? new Date(selectedDates[0]) : null);
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [playButton, setPlayButton] = useState(false);
  const [plusClickedCountry, setPlusClickedCountry] = useState(null); // Store entire country object

  useEffect(() => {
    async function fetchCovidStatsByCountries(countries) {
      const response = await fetch('http://localhost:80/multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ targetCountries: countries, targetDates: selectedDates }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCountriesData(data);
      if (data.length > 0 && data[0].data.length > 0) {
        setCurrentDate(new Date(data[0].data[0].date));
      }
    }

    fetchCovidStatsByCountries(selectedCountries);
  }, [selectedCountries, selectedDates]);

  const adjustDate = (adjustment) => {
    let newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + adjustment);

    const minDate = new Date(Math.min(...countriesData.map(country => new Date(country.data[0].date).getTime())));
    const maxDate = new Date(Math.max(...countriesData.map(country => new Date(country.data[country.data.length - 1].date).getTime())));

    if (newDate >= minDate && newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry({ name: country.country, lat: country.lat, lng: country.long });
    setStopRotation(true);
    setPlayButton(true)
  };

  const handlePlusClick = (event, country) => {
    event.stopPropagation(); // Stop the click event from bubbling up to the country div
    setIsPlusClicked(true);
    setPlusClickedCountry(country);
    console.log(country);
  };

  useEffect(() => {
    console.log(selectedStats);
  }, [selectedStats]);

  return (
    <>
      {playButton && <div onClick={() => {
        setStopRotation(false);
        setPlayButton(false);
      }}><Play /></div>}

      {isPlusClicked && plusClickedCountry && <AnalysisModal country={plusClickedCountry} setIsPlusClicked={setIsPlusClicked} />}

      <StatSelector
        selectedStats={selectedStats}
        setSelectedStats={setSelectedStats}
        start={false}
        analysisMode={analysisMode}
      />
      
      <Countries selectedDates={selectedDates} setCurrentDate={setCurrentDate} countriesData={countriesData} selectedStats={selectedStats} handleCountryClick={handleCountryClick} handlePlusClick={handlePlusClick} currentDate={currentDate} adjustDate={adjustDate}/>

      <button className="go-back-button" onClick={() => setAnalysisMode(analysisMode - 1)}>
        GO BACK
      </button>
    </>
  );
}