import { Plotter } from "./plotter";

export default class Clifford extends Plotter {

  a: number = 0.9;
  b: number = -0.6013;
  c: number = 2.0;
  d: number = 0.5;

  constructor(){
    super(0.1, 0.1)
  }
  
  calculate():[number, number]{

    const {
      x, y, a, b, c, d
    } = this

    const xt = (x*x) - (y*y) + (a*x) + (b*y);
    const yt = (2*x*y) + (c*x) + (d*y);

    this.x = xt;
    this.y = yt;

    return [
      this.x, 
      this.y
    ]
    
  }
}
