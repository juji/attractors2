import { Plotter } from "./plotter";

export default class Aizawa extends Plotter {

  a: number = 0.95;
  b: number = 0.7;
  c: number = 0.65;
  d: number = 3.5;
  e: number = 0.25;
  f: number = 0.1;

  dt: number = 0.01

  constructor(){
    super({
      x: 0.1, 
      y: 0, 
      z: 0
    })
  }
  
  calculate():[number, number, number]{

    const {
      x, y, z, a, b, c, d, e, f, dt
    } = this

    const dx = dt * ((z - b) * x - d*y);
    const dy = dt * (d*x+(z-b)*y);
    const dz = dt * (c + a*z - (z**3)/3 - (x**2 + y**2)*(1+e*z) + f * z * x**3);
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
