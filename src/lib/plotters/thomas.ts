import { Plotter } from "./plotter";

export default class BurkeShaw extends Plotter {

  b: number = 0.21;

  constructor(){
    super(-0.23, -0.82, -0.4)
  }
  
  
  calculate():[number, number, number]{

    const {
      x, y, z, b
    } = this

    const dx = Math.sin(y) - (b*x)
    const dy = Math.sin(z) - (b*y)
    const dz = Math.sin(x) - (b*z)

    this.x += dx;
    this.y += dy;
    this.z += dz;

    return [
      this.x, 
      this.y, 
      this.z 
    ]
    
  }
}
