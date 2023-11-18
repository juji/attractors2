import { Plotter } from "./plotter";

export default class WangSun extends Plotter {

  a: number = 0.2;
  b: number = -0.01;
  c: number = 1;
  d: number = -0.4;
  e: number = -1;
  f: number = -1;

  dt: number = 0.01;

  constructor(){
    super(
      1, 1, 1
    )
  }
  
  calculate():[number, number, number]{

    const {
      x, y, z, a, b, c, d, e, f, dt
    } = this

    const xt = (a * x) + (c * y * z);
    const yt = (b * x) + (d * y) - (x * z);
    const zt = (e * z) + (f * x * y);

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
