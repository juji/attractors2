import { Plotter } from "./plotter";

export default class Clifford extends Plotter {

  // introduce chaos a little
  // a: number = -1.9 + (Math.random()/5) * (Math.random()<0.5?-1:1);
  // b: number = -1.9;
  // c: number = -1.9;
  // d: number = -1; 
  a: number = 2 + (Math.random()/5) * (Math.random()<0.5?-1:1);
  b: number = -2;
  c: number = 1;
  d: number = -1; 

  constructor(){
    super({
      x: 0, 
      y: 0
    })
  }

  reset(){
    super.reset()
    // this.a = -1.9 + (Math.random()/5) * (Math.random()<0.5?-1:1);
  }
  
  calculate():[number, number]{

    const {
      x, y, a, b, c, d
    } = this

    const xt = Math.sin(a * y) + c * Math.cos(a * x);
    const yt = Math.sin(b * x) + d * Math.cos(b * y);

    this.x = xt;
    this.y = yt;

    return [
      this.x, 
      this.y
    ]
    
  }
}
