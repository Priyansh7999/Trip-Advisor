import React from "react";

const Flight = () => {
  return (
    <div className="flight-container">
      {/* From */}
      <div className="flight-field">
        <label className="field-label" htmlFor="from">
          From
        </label>
        <input
          type="text"
          id="from"
          placeholder="Enter departure city or airport"
          className="field-input"
        />
      </div>

      {/* To */}
      <div className="flight-field">
        <label className="field-label" htmlFor="to">
          To
        </label>
        <input
          type="text"
          id="to"
          placeholder="Enter destination city or airport"
          className="field-input"
        />
      </div>

      {/* Travel Date */}
      <div className="flight-field">
        <label className="field-label" htmlFor="travel-date">
          Travel Date
        </label>
        <input
          type="date"
          id="travel-date"
          className="field-input"
        />
      </div>

      {/* Number of Travelers */}
      <div className="flight-field">
        <label className="field-label" htmlFor="travelers">
          No. of Travelers
        </label>
        <input
          type="number"
          id="travelers"
          placeholder="1"
          className="field-input"
          min="1"
          max="10"
        />
      </div>

      {/* Class */}
      <div className="flight-field">
        <label className="field-label" htmlFor="class">
          Class
        </label>
        <select id="class" className="field-input">
          <option value="economy">Economy</option>
          <option value="premium-economy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
      </div>

      {/* Search Button */}
      <div className="search-button-container">
        <button className="search-button">SEARCH</button>
      </div>
    </div>
  );
};

export default Flight;
