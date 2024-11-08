import React, { useState } from 'react';
import '../../styles/model/stat_selector.css';

const StatSelector = ({ selectedStats, setSelectedStats, start = true, analysisMode }) => {
    const [isOpen, setIsOpen] = useState(start);

    const stats = [
        "Vaccinations",
        "Population",
        "GDP (Economic Health)",
        "Life Expectancy",
        "%Age Over 65",
        "Hand-washing Facilities"
    ];

    const handleCheckboxChange = (stat) => {
        setSelectedStats(prevStats => {
            if (prevStats.includes(stat)) {
                return prevStats.filter(s => s !== stat);
            } else {
                return [...prevStats, stat];
            }
        });
    };

    // Determine max-height based on analysisMode
    const dropdownMaxHeight = analysisMode === 1 ? '25vh' : '37.5vh';

    return (
        <div className="stat-selector">
            <div className="stat-selector-title" onClick={() => setIsOpen(!isOpen)}>
                <h2 className="stat-selector-header">Statistics</h2>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} aria-hidden="true"></i>
            </div>
            {isOpen && (
                <div 
                    className='dropdown-menu'
                    style={{ maxHeight: dropdownMaxHeight }}
                >
                    {stats.map(stat => (
                        <div 
                            key={stat} 
                            className="stat" 
                            onClick={() => handleCheckboxChange(stat)}
                        >
                            <p>{stat}</p>
                            <input
                                type="checkbox"
                                checked={selectedStats.includes(stat)}
                                onChange={(e) => e.stopPropagation()} // Prevent event from reaching the div
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatSelector;