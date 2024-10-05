class Flower {
    constructor() {
      this.centerSize = Math.floor(Math.random() * 100); // Random size
      this.centerColor = {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
      };
      this.petalColor = {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
      };
      this.petalCount = Math.floor(Math.random() * 8); 
      this.fitness =0;
    }
    toString() {
      return `Flower:
        - Center Size: ${this.centerSize}
        - Center Color: rgb(${this.centerColor.red}, ${this.centerColor.green}, ${this.centerColor.blue})
        - Petal Color: rgb(${this.petalColor.red}, ${this.petalColor.green}, ${this.petalColor.blue})
        - Petal Count: ${this.petalCount}
        - Fitness: ${this.fitness.toFixed(1)}`;
    }
    
  }
export default Flower;