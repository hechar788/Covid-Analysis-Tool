import React, { useState } from "react";
import "../../styles/model/country_selector.css";
import "flag-icons/css/flag-icons.min.css";
import countries from '../../countries.json';

export default function CountrySelector({ setSelectedCountries, selectedCountries, setSelectedCountry, setStopRotation }) {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleActive = () => {
    setIsActive(!isActive);
    setStopRotation(!isActive); // Stop rotation when dropdown is activated
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSelect = (country) => {
    let updatedCountries;
    if (selectedCountries.includes(country)) {
      updatedCountries = selectedCountries.filter(c => c !== country);
    } else {
      updatedCountries = [...selectedCountries, country];
    }
    setSelectedCountries(updatedCountries); // Notify the parent component
    setSelectedCountry(country); // Notify the parent component
    setSearchQuery(""); // Reset search input
  };

  const handleSelectAll = () => {
    if (selectedCountries.length === countries.length) {
      setSelectedCountries([]); // Deselect all
    } else {
      setSelectedCountries(countries); // Select all
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery)
  );

  const selectedCountriesSorted = filteredCountries.filter(country =>
    selectedCountries.includes(country)
  );

  const unselectedCountriesSorted = filteredCountries.filter(country =>
    !selectedCountries.includes(country)
  );

  const sortedCountries = [...selectedCountriesSorted, ...unselectedCountriesSorted];

  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
      <div className="btn" onClick={toggleActive}>
        <span>{selectedCountries.length > 0 ? `${selectedCountries.length} countries selected` : 'Select Countries'}</span>
        <i className="fas fa-chevron-down"></i>
      </div>
      {isActive && (
        <div className="content">
          <div className="search">
            <i className="fas fa-search"></i>
            <input
              spellCheck="false"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <ul>
            <li
              onClick={handleSelectAll}
              className='select-all'
              style={{ cursor: 'pointer' }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={selectedCountries.length === countries.length}
                  readOnly
                  onClick={(event) => event.stopPropagation()}
                />
                <span className="country-name">
                  {selectedCountries.length === countries.length ? "Deselect All" : "Select All"}
                </span>
              </label>
            </li>
            {sortedCountries.map((country) => (
              <li
                key={country.code}
                onClick={() => handleSelect(country)}
                style={{ cursor: 'pointer' }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country)}
                    readOnly
                    onClick={(event) => event.stopPropagation()}
                  />
                  <span className={`fi fi-${country.code.toLowerCase()}`}></span>
                  <span className="country-name">{country.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}