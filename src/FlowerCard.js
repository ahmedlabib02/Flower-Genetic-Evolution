import {useState, useRef} from 'react';
import { Stage, Layer, Rect, Circle, Ellipse, Group } from 'react-konva';

// Flower Component using React Konva
const Flower = ({ dna }) => {
  const centerX = 100; // Center of the canvas
  const centerY = 100; // Set a more appropriate Y position for the center
  const petalRadiusX = 20; // Fixed radius for petal width
  const petalRadiusY = 20; // Fixed radius for petal height

  // Safeguard to ensure color values are valid and within the proper range
  const petalRed = Math.min(Math.max(dna.petalColor?.red ?? 0, 0), 255);
  const petalGreen = Math.min(Math.max(dna.petalColor?.green ?? 0, 0), 255);
  const petalBlue = Math.min(Math.max(dna.petalColor?.blue ?? 0, 0), 255);
  
  const centerRed = Math.min(Math.max(dna.centerColor?.red ?? 0, 0), 255);
  const centerGreen = Math.min(Math.max(dna.centerColor?.green ?? 0, 0), 255);
  const centerBlue = Math.min(Math.max(dna.centerColor?.blue ?? 0, 0), 255);

  // Convert colors to CSS format
  const petalColor = `rgb(${petalRed}, ${petalGreen}, ${petalBlue})`;
  const centerColor = `rgb(${centerRed}, ${centerGreen}, ${centerBlue})`;

  // Crossover logic for angles
  const angleStep = (2 * Math.PI) / dna.petalCount || 1; // Prevent division by zero

  return (
    <Group>
      {/* Draw Stem */}
      <Rect
        x={centerX - 3}
        y={centerY + dna.centerSize / 1.5}
        width={6}
        height={120}
        fill="#4CAF50"
      />

      

      {/* Draw Petals */}
      {[...Array(dna.petalCount)].map((_, i) => {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * (dna.centerSize + petalRadiusX); // Position petals outside the center
        const y = centerY + Math.sin(angle) * (dna.centerSize + petalRadiusY); // Ensure they are around the center


        return (
          <Ellipse
            key={i}
            x={x}
            y={y}
            radiusX={petalRadiusX} // Fixed petal width
            radiusY={petalRadiusY} // Fixed petal height
            fill={petalColor}
            stroke="#000"
            strokeWidth={0.5}
            rotation={(angle * 180) / Math.PI} // Rotate based on angle
          />
        );
      })}

      {/* Draw Flower Center */}
      <Circle
        x={centerX}
        y={centerY}
        radius={dna.centerSize} // Keeping the center size from DNA
        fill={centerColor}
        stroke="#000"
        strokeWidth={1}
      />
    </Group>
  );
};

// FlowerCard Component using React Konva Stage
const FlowerCard = ({ dna }) => {
  const [hoverTime, setHoverTime] = useState(0); // Track hover time (fitness)
  const intervalRef = useRef(null); // Use ref to store the interval ID

  // Function to handle when the mouse enters the card
  const handleMouseEnter = () => {
    // Start an interval if not already running
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setHoverTime((prevTime) => prevTime + 1); // Increase hover time by 1 every half second
        dna.fitness += 1; // Increase fitness by 0.5 every half second
      }, 100);
    }
  };

  // Function to handle when the mouse leaves the card
  const handleMouseLeave = () => {
    // Clear the interval and stop increasing fitness
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval
      intervalRef.current = null; // Reset the interval reference
    }
  };

  return (
    <div
      className="flex flex-col items-center border border-gray-300 rounded-lg shadow-lg p-4 m-4 w-64 h-72 bg-gradient-to-r from-blue-100 to-purple-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas size */}
      <Stage width={200} height={250}>
        <Layer>
          <Flower dna={dna} />
        </Layer>
      </Stage>
      <div className="mt-2 text-gray-700 text-sm">
        <p>Fitness {dna.fitness.toFixed(0)}</p> {/* Display fitness */}
      </div>
    </div>
  );
};


export default FlowerCard;
