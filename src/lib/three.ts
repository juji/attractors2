import * as THREE from 'three';
import { type Plotter } from './plotters/plotter';
import { debounceReset } from '@/lib/debounce-reset';

export type TransformFunction = (x:number, y:number, z:number) => [number, number, number]

function defaultTransform(x:number, y:number, z: number){
  return [x,y,z];
}


export default function start({
  canvas,
  plotter,
  scale,
  itterationPerCycle,
  totalCycle,
  transform,
  onProgress,
  opacity = 0.9,
  rotateX = false,
  rotateY = true
}:{
  canvas: HTMLCanvasElement,
  plotter: Plotter,
  scale?: number,
  itterationPerCycle?: number,
  totalCycle?: number,
  transform?: TransformFunction,
  onProgress?: (num: number) => void
  opacity?: number,
  rotateX?: boolean
  rotateY?: boolean
}){
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.setClearColor( 0x000000, 0 )
  renderer.autoClear = true

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial( { 
    color: 0xff0000,
    transparent: true,
    opacity
  } );
  const thing = new THREE.Points( geometry, material );
  scene.add(thing);

  let vert: number[] = [
    plotter.x,
    plotter.y,
    plotter.z
  ]

  camera.position.z = 500;
  let idx = 0
  let scaleNum = scale || 10
  let itt = itterationPerCycle || 3;
  let cycle = totalCycle || 5000;
  let transformFunc = transform || defaultTransform;

  const total = itt * cycle
  let progress = 0
  let running = true

  debounceReset(() => {

    running = false;
    renderer.clear()
    onProgress && onProgress( 0 )
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    
  },() => {

    plotter.reset()
    progress = 0
    idx = 0
    running = true
    vert = [
      plotter.x,
      plotter.y,
      plotter.z
    ]
    animate()

  }, 500)

  function animate() {
    if(!running) return;

    requestAnimationFrame( animate );

    if(idx < cycle){
      for ( let i = 0; i < itt; i ++ ) {
        const [ ix, iy, iz ] = plotter.calculate()
        const [ x, y, z ] = transformFunc(
          ix * scaleNum, 
          iy * scaleNum, 
          iz * scaleNum
        )
        vert.push(x, y, z);
        progress++;
      }
      onProgress && onProgress( 100 * progress / total )
      geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vert, 3 ) );
      thing.geometry = geometry
      idx++
    }

    if(rotateX) thing.rotation.x += 0.003;
    if(rotateY) scene.rotation.y += 0.003;
    renderer.render( scene, camera );

  }

  animate();

  function activateZoomButton(){

    const plus = document.querySelector('button.plus')
    const minus = document.querySelector('button.minus')
    const maxZ = 800
    const minZ = 300
    const delta = 50

    if(!plus || !minus) return;

    const zoomIn = () => {
      camera.position.z = Math.max(camera.position.z - delta, minZ)
      if(camera.position.z === minZ){
        plus.setAttribute('disabled','')
      }
      if(camera.position.z < maxZ){
        minus.removeAttribute('disabled')
      }
    }
    
    const zoomOut = () => {
      camera.position.z = Math.min(camera.position.z + delta, maxZ)
      if(camera.position.z === maxZ){
        minus.setAttribute('disabled','')
      }
      if(camera.position.z > minZ){
        plus.removeAttribute('disabled')
      }
    }

    plus.addEventListener('click', zoomIn)
    minus.addEventListener('click', zoomOut)


  }

  activateZoomButton()

}

