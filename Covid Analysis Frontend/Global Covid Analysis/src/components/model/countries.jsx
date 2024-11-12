import Plus from "../../assets/svg/plus";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/dark.css';

export default function Countries({
    setCurrentDate,
    selectedDates,
    countriesData,
    handleCountryClick,
    handlePlusClick,
    currentDate,
    adjustDate,
    selectedStats
}) {
    // Determine the min and max dates based on selectedDates
    const minDate = selectedDates && selectedDates.length > 0 ? selectedDates[0] : "2020-01-05";
    const maxDate = selectedDates && selectedDates.length > 1 ? selectedDates[1] : "2024-07-04";
    return (
        <>
            <div className="countries-title-wrapper">
                <h2 className="countries-list-title">Countries</h2>
                <div className="countries-title-date-wrapper">
                    <i className="fas fa-chevron-left" onClick={() => adjustDate(-1)}></i>
                    <Flatpickr
                        options={{
                            maxDate: maxDate,
                            minDate: minDate,
                            enableTime: false
                        }}
                        value={currentDate}
                        onChange={(date) => setCurrentDate(date.length > 0 ? date[0] : null)}
                    />
                    <i className="fas fa-chevron-right" onClick={() => adjustDate(1)}></i>
                </div>
            </div>
            <div className="countries-list">
                {countriesData.map((country, index) => {
                    const relevantData = country.data.find(item => {
                        const itemDate = new Date(item.date);
                        return (
                            itemDate.getFullYear() === currentDate.getFullYear() &&
                            itemDate.getMonth() === currentDate.getMonth() &&
                            itemDate.getDate() === currentDate.getDate()
                        );
                    }) || {};

                    return (
                        <div
                            key={index}
                            className="country"
                            onClick={() => handleCountryClick(country)}
                        >
                            <div className="countries-list-card-title list-header">
                                <p className="country-title">{country.location}</p>
                                {selectedStats.includes("Population") && (
                                    <p className="country-title population">Population: {country.population}</p>
                                )}
                                {selectedStats.includes("GDP (Economic Health)") && (
                                    <p className="country-title population">GDP: {country.gdp_per_capita}</p>
                                )}
                            </div>
                            <div className="countries-list-card-title">
                                <div className="country-stat">
                                    <p className="country-p">Total Cases: {relevantData.total_cases || 0}</p>
                                    <p className="country-p">Total Deaths: {relevantData.total_deaths || 0}</p>
                                    {selectedStats.includes("Vaccinations") && <p className="country-p">Total Vaccinated: {relevantData.people_vaccinated || 0}</p>}
                                </div>
                                <div className="country-stat">
                                    <p className="country-p">New Deaths: {relevantData.new_deaths || 0}</p>
                                    <p className="country-p">New Cases: {relevantData.new_cases || 0}</p>
                                    {selectedStats.includes("Vaccinations") && <p className="country-p">New Vaccinated: {relevantData.new_vaccinations || 0}</p>
                                    }
                                </div>

                                <div
                                    onClick={(event) => handlePlusClick(event, country)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Plus />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
