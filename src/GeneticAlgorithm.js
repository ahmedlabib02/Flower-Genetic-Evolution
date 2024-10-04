import Flower from './Flower';

class GeneticAlgorithm {
    constructor(crossover_rate) {
      this.flowers = [...Array(8)].map(() => new Flower()); // Initialize 8 flowers
      this.mutation_rate = 0.05;
      this.crossover_rate = crossover_rate;
      this.iteration = 0;
    }
  
    // Select the fittest n/2 flowers based on fitness
    select() {
      const n = this.flowers.length;
  
      // Sort flowers by their fitness in descending order
      const sortedFlowers = [...this.flowers].sort((a, b) => b.fitness - a.fitness);
    
      // Select the top n/2 fittest flowers
      const fittestFlowers = sortedFlowers.slice(0, n / 2);
  
      // Duplicate the selected flowers to maintain the same population size (n)
      this.flowers = [...fittestFlowers, ...fittestFlowers]; 
    //   console.log(this.flowers);
    }
  
    // Crossover method
    crossover() {
        const n = this.flowers.length; // Get current population size
        const offspring = [];
      
        // Shuffle the flower array to select random parents for crossover
        const shuffledFlowers = [...this.flowers].sort(() => Math.random() - 0.5);
      
        // Select n/2 parents for crossover, and n/2 for moving unchanged to next generation
        const crossoverParents = shuffledFlowers.slice(0, n / 2);   // Select n/2 parents for crossover
        const nonCrossoverParents = shuffledFlowers.slice(n / 2);   // Select n/2 parents that move unchanged
      
        // Perform crossover for selected parents
        for (let i = 0; i < crossoverParents.length; i += 2) {
          const parent1 = crossoverParents[i];
          const parent2 = crossoverParents[i + 1];
      
          const child1 = this.performCrossover(parent1, parent2);
          const child2 = this.performCrossover(parent2, parent1);
      
          offspring.push(child1, child2); // Add the offspring
        }
      
        // Set fitness to 0 for non-crossover parents and add them to the offspring
        nonCrossoverParents.forEach(parent => {
          parent.fitness = 0; // Reset fitness
          offspring.push(parent); // Add non-crossover parents to offspring
        });
      
        // Replace the current flowers population with the new offspring
        this.flowers = offspring;
      }
  
    // Helper function to perform crossover between two parents
    performCrossover(parent1, parent2) {
      const child = new Flower();
  
      // First half genes from parent1
      child.centerSize = parent1.centerSize;
      child.centerColor = {
        red: parent1.centerColor.red,
        green: parent1.centerColor.green,
        blue: parent1.centerColor.blue,
      };
  
      // Second half genes from parent2
      child.petalColor = {
        red: parent2.petalColor.red,
        green: parent2.petalColor.green,
        blue: parent2.petalColor.blue,
      };
      child.petalCount = parent2.petalCount;
  
      // Set fitness to 0 initially since it's a new flower
      child.fitness = 0;
  
      return child;
    }
  
    mutate() {
        const totalGenes = this.flowers.length * 8; // 8 flowers, 8 genes per flower
        const genesToMutate = Math.floor(this.mutation_rate * totalGenes); // Calculate 5% (around 3 genes)
        let mutatedGenes = 0;
    
        while (mutatedGenes < genesToMutate) {
          const flowerIndex = Math.floor(Math.random() * this.flowers.length); // Random flower
          const geneIndex = Math.floor(Math.random() * 8); // Random gene (0-7)
    
          const flower = this.flowers[flowerIndex];
          
          // Mutate the selected gene
          switch (geneIndex) {
            case 0:
              flower.centerSize = Math.floor(Math.random() * 100); // Randomize center size
              break;
            case 1:
              flower.centerColor.red = Math.floor(Math.random() * 256); // Randomize center color red
              break;
            case 2:
              flower.centerColor.green = Math.floor(Math.random() * 256); // Randomize center color green
              break;
            case 3:
              flower.centerColor.blue = Math.floor(Math.random() * 256); // Randomize center color blue
              break;
            case 4:
              flower.petalColor.red = Math.floor(Math.random() * 256); // Randomize petal color red
              break;
            case 5:
              flower.petalColor.green = Math.floor(Math.random() * 256); // Randomize petal color green
              break;
            case 6:
              flower.petalColor.blue = Math.floor(Math.random() * 256); // Randomize petal color blue
              break;
            case 7:
              flower.petalCount = Math.floor(Math.random() * 8); // Randomize petal count
              break;
          }
    
          mutatedGenes++; // Increment mutated genes count
        }
      }

      evolve(){
        
        this.select();
        this.crossover();
        this.mutate();
      }
  }
  
  export default GeneticAlgorithm;
  