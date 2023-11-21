
import { Plotter } from './plotters/plotter';
import { debounceReset } from './debounce-reset';
import { init as initUi } from '@/lib/ui'

export type TransformFunction = (x:number, y:number) => [number, number]

//
function defaultTransform(x:number, y:number){
  return [x,y];
}

//
function defaultDraw(
  x: number, 
  y: number, 
  context: CanvasRenderingContext2D,
  alpha: number = 0.3
){

  const radius = alpha * 2

  context.beginPath();
  context.arc(
    x,
    y,
    radius,
    0,
    2*Math.PI,
    true
  );
  context.fillStyle = `rgba(255,0,0,${alpha})`
  context.fill()

}

function zoomFunctions(
  canvas: HTMLCanvasElement
){

  let scale = 1
  const delta = 0.2
  const maxScale = 2
  const minScale = 0.1

  const zoomIn = () => {
    scale = Math.min(scale + delta, maxScale)
    canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`
    return {
      plus: scale !== maxScale,
      minus: scale !== minScale
    }
  }
  
  const zoomOut = () => {
    scale = Math.max(scale - delta, minScale)
    canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`
    return {
      plus: scale !== maxScale,
      minus: scale !== minScale
    }
  }

  return { zoomIn, zoomOut }

}

export default function start({
  canvas,
  plotter,
  scale,
  itterationPerCycle,
  totalCycle,
  transform,
  alpha
}:{
  canvas: HTMLCanvasElement
  plotter: Plotter
  scale?: number
  itterationPerCycle?: number
  totalCycle?: number
  transform?: TransformFunction
  alpha?: number
}){  

  let idx = 0
  let scaleNum = scale || 10
  let itt = itterationPerCycle || 3;
  let cycle = totalCycle || 5000;
  let transformFunc = transform || defaultTransform;
  
  const total = itt * cycle
  let progress = 0
  let running = true

  const { zoomIn, zoomOut } = zoomFunctions(canvas)
  const onProgress = initUi({ zoomIn, zoomOut })

  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context.translate(canvas.width/2, canvas.height/2);

  debounceReset(() => {
    
    running = false;
    onProgress && onProgress( 0 )
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
  },() => {
    
    plotter.reset()
    progress = 0
    idx = 0
    running = true
    context.translate(canvas.width/2, canvas.height/2);
    defaultDraw(
      plotter.x,
      plotter.y,
      context
    )
    animate()

  })

  onProgress && onProgress( 0 )

  defaultDraw(
    plotter.x,
    plotter.y,
    context
  )

  function animate() {

    if(!running) return;

    if(idx < cycle){

      requestAnimationFrame( animate );

      for ( let i = 0; i < itt; i ++ ) {
        
        const [ ix, iy ] = plotter.calculate()
        
        const [ x, y ] = transformFunc(
          ix * scaleNum, 
          iy * scaleNum
        )
        
        defaultDraw(
          x,
          y,
          context as CanvasRenderingContext2D,
          alpha
        )
        
        progress++;

      }

      onProgress && onProgress( 100 * progress / total )
      idx++

    }
  }

  animate();

}

