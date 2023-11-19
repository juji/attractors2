import { Plotter } from "./plotter";

export default class ChenLee extends Plotter {

  a: number = 5;
  b: number = -10;
  d: number = -0.38;

  dt: number = 0.001

  constructor(){
    super({
      x: 1, 
      y: 1, 
      z: 2
    })
  }
  
  calculate():[number, number, number]{

    const {
      x, y, z, a, b, d, dt
    } = this

    const dx = a * x - y * z
    const dy = b * y + x * z
    const dz = d * z + (x * y) / 3

    this.x += dt * dx;
    this.y += dt * dy;
    this.z += dt * dz;

    return [
      this.x, 
      this.y, 
      this.z 
    ]

  }
}
