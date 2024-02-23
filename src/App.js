// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './components/PlanetCard';
import './App.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get(nextPage || 'https://swapi.dev/api/planets/?format=json');
        setPlanets(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [nextPage]);

  return (
    <div className="app-container">
      <header className="navbar">
        <h1>Star Wars Planets</h1>
      </header>

      <div className="planet-container">
        {planets.map(planet => (
          <PlanetCard key={planet.name} planetUrl={planet.url} />
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-btn" onClick={() => setNextPage(prevPage)}>Previous</button>
        <button className="pagination-btn" onClick={() => setNextPage(nextPage)}>Next</button>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Star Wars Planets</p>
      </footer>
    </div>
  );
};

export default App;
