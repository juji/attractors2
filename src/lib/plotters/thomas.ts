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

    const xt = Math.sin(y) - (b*x)
    const yt = Math.sin(z) - (b*y)
    const zt = Math.sin(x) - (b*z)

    this.x += xt;
    this.y += yt;
    this.z += zt;

    return [
      this.x, 
      this.y, 
      this.z 
    ]
    
  }
}
