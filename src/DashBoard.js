import React, { useState, useEffect } from "react";

export function Dashboard({ data }) {
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [selectedTopic, setSelectedTopic] = useState("");

  const filterData = (endYear, topic) => {
    let filtered = data;

    if (endYear !== "") {
      filtered = filtered.filter(
        (item) => String(item.end_year).trim() === endYear
      );
    }

    if (topic !== "") {
      filtered = filtered.filter(
        (item) => String(item.topic).trim() === topic
      );
    }

    setFilteredData(filtered);
  };

  const handleTopicChange = (e) => {
    const topic = e.target.value.trim();
    setSelectedTopic(topic);
    filterData(selectedEndYear, topic);
  };

  const handleEndYearChange = (e) => {
    const endYear = e.target.value;
    setSelectedEndYear(endYear);
    if (endYear !== "") {
      const filtered = data.filter((item) => String(item.end_year) === endYear);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    filterData(selectedEndYear, selectedTopic);
  }, [selectedEndYear, selectedTopic, data]);

  return (
    <div>
      <div className="dropdowns">

      <div>
        <label htmlFor="topics">Select Topic:</label>
        <select id="topics" value={selectedTopic} onChange={handleTopicChange}>
          <option value="">All</option>
          {Array.from(new Set(data.map((item) => item.topic))).map(
            (topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label htmlFor="endYear">Select End Year:</label>
        <select
          id="endYear"
          value={selectedEndYear}
          onChange={handleEndYearChange}
        >
          <option value="">All</option>
          {Array.from(new Set(data.map((item) => item.end_year))).map(
            (year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            )
          )}
        </select>
      </div>

      </div>

      <div className="dashboard-container">
        
        {filteredData.map((item, index) => (
        <div className="data-item" key={index}>
          <div>Country: {item.country}</div>
          <h6>Title: {item.title}</h6>
          <div>
            End Year: {item.end_year} Start Year: {item.start_year}
          </div>
          <h6>Added On: {item.added}</h6>
          <div>
            <h6>Intensity: {item.intensity}</h6>
            <h6>Sector: {item.sector}</h6>
            <h6>Topic: {item.topic}</h6>
            <h6>Insight: {item.insight}</h6>
          </div>
          <div>URL: {item.url}</div>
          <div>
            {item.region} {item.impact}
          </div>
          <h6>Publication: {item.published}</h6>
          <h6>Relevance: {item.relevance}</h6>
          <div>
            <h6>Pestle: {item.pestle}</h6>
            <h6>Source: {item.source}</h6>
            <h6>Likelihood: {item.likelihood}</h6>
          </div>
        </div>
      ))}
      
      
      </div>
    
    
    </div>
  );
}
