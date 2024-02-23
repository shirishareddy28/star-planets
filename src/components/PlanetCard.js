// src/components/PlanetCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanetCard = ({ planetUrl }) => {
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const response = await axios.get(planetUrl);
        setPlanet(response.data);
      } catch (error) {
        console.error('Error fetching planet data:', error);
      }
    };

    fetchPlanetData();
  }, [planetUrl]);

  return (
    <div className="planet-card">
      {planet ? (
        <>
          <h2>{planet.name}</h2>
          <p><strong>Climate:</strong> {planet.climate}</p>
          <p><strong>Population:</strong> {planet.population}</p>
          <p><strong>Terrain:</strong> {planet.terrain}</p>
        </>
      ) : (
        <p>Loading planet data...</p>
      )}
    </div>
  );
};

export default PlanetCard;
