
export class Plotter {

  x: number;
  y: number;
  z: number;

  init: [number, number, number];

  // can be 3d or 2d
  constructor(
    initX: number, 
    initY: number, 
    initZ?: number
  ){
    this.init = [ initX, initY, initZ?initZ:0 ]
    this.x = this.init[0]; 
    this.y = this.init[1];
    this.z = this.init[2]; 
  }

  reset(){

    this.x = this.init[0]; 
    this.y = this.init[1];
    this.z = this.init[2]; 

  }

  calculate():number[]{
    throw new Error('The calculate method should be overriden')
  }
}
