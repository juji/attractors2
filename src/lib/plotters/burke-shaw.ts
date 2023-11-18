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

    const xt = -s * ( x + y )
    const yt = -y - ( s * x * z )
    const zt = ( s * x * y ) + v

    this.x += this.dt * xt;
    this.y += this.dt * yt;
    this.z += this.dt * zt;

    return [
      this.x, 
      this.y, 
      this.z 
    ]
    
  }
}
