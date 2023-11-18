import { Plotter } from "./plotter";

export default class RayleighBenard extends Plotter {

  a: number = 8;
  r: number = 34;
  b: number = 3;
  dt: number = 0.01

  constructor(){
    super(
      0.1, 0, 0
    )
  }
  
  calculate():[number, number, number]{

    const {
      x, y, z, a, r, b, dt
    } = this

    const xt = (-a * x) + (a * y);
    const yt = (r * x) - y - (x * z);
    const zt = (x * y) - (b * z);

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
