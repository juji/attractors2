import { Plotter } from "./plotter";

export default class BurkeShaw extends Plotter {

  s: number = 10;
  v: number = 4.272;
  dt: number = 0.01;

  constructor(){
    super(1, 0, 0)
  }
  
  
  calculate():[number, number, number]{

    const {
      x, y, z, s, v
    } = this

    const dx = -s * ( x + y )
    const dy = -y - ( s * x * z )
    const dz = ( s * x * y ) + v

    this.x += this.dt * dx;
    this.y += this.dt * dy;
    this.z += this.dt * dz;

    return [
      this.x, 
      this.y, 
      this.z 
    ]
    
  }
}
