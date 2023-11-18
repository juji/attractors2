import { Plotter } from "./plotter";

// three scroll unified chaotic system attractor
export default class Tsucs extends Plotter {

  a: number = 40;
  b: number = 0.833;
  c: number = 0.5;
  d: number = 0.65;
  e: number = 20;

  dt: number = 0.001

  constructor(){
    super(
      1, 0, 0
    )
  }
  
  calculate():[number, number, number]{

    const {
      x, y, z, a, b, c, d, e, dt
    } = this

    const xt = a * ( y - x ) + c * x * z
    const yt = e * y - x * z
    const zt = b * z + (x * y) - d * x**2;

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
