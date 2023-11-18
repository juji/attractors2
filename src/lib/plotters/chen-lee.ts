import { Plotter } from "./plotter";

export default class ChenLee extends Plotter {

  a: number = 5;
  b: number = -10;
  d: number = -0.38;

  dt: number = 0.001

  constructor(){
    super(
      1, 1, 2
    )
  }
  
  calculate():[number, number, number]{

    const {
      x, y, z, a, b, d, dt
    } = this

    const xt = a * x - y * z
    const yt = b * y + x * z
    const zt = d * z + (x * y) / 3

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
