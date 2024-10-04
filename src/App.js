import React, { useState } from 'react';
import FlowerCard from './FlowerCard';
import GeneticAlgorithm from './GeneticAlgorithm';

function App() {
  // Initialize the genetic algorithm
  const geneticAlgorithm = new GeneticAlgorithm(0.5); // You can set the crossover rate here

  
  const initialPopulation = geneticAlgorithm.flowers;

  
  const [flowers, setFlowers] = useState(initialPopulation);

  
  const handleEvolveGeneration = () => {
    
    geneticAlgorithm.evolve();

    // console.log(geneticAlgorithm.flowers)
    setFlowers([...geneticAlgorithm.flowers]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Flower Evolution Simulation 🌸</h1>

      <div className="flex flex-wrap justify-center">
        {flowers.map((flower, index) => (
          <FlowerCard key={index} dna={flower} hoverTime={flower.fitness} />
        ))}
      </div>

      <button
        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleEvolveGeneration}
      >
        Evolve New Generation
      </button>
    </div>
  );
}

export default App;
