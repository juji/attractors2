import { Plotter } from "./plotter";

export default class Halvorsen extends Plotter {

  a: number = 1.4;
  dt: number = 0.005

  constructor(){
    super(
      1, 0, 0
    )
  }
  
  calculate():[number, number, number]{

    const {
      x, y, z, a, dt
    } = this

    const xt = -a * x - 4 * y - 4 * z - y * y;
    const yt = -a * y - 4 * z - 4 * x - z * z;
    const zt = -a * z - 4 * x - 4 * y - x * x;

    this.x += dt * xt;
    this.y += dt * yt;
    this.z += dt * zt;

    return [
      this.x, 
      this.y, 
      this.z 
    ]

  }
}
