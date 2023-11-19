import * as THREE from 'three';
import { type Plotter } from './plotters/plotter';
import { debounceReset } from '@/lib/debounce-reset';
import { init as initUi } from '@/lib/ui'

export type TransformFunction = (x:number, y:number, z:number) => [number, number, number]

function defaultTransform(x:number, y:number, z: number){
  return [x,y,z];
}

function zoomFunctions(
  camera: THREE.PerspectiveCamera
){

  const maxZ = 800
  const minZ = 100
  const delta = 100
  let currentZ = camera.position.z
  let targetZ = camera.position.z

  function animateZ(){
    if(Math.abs(currentZ - targetZ) <= 0.1) {
      currentZ = targetZ 
    }else{
      currentZ += (targetZ - currentZ ) / 10
      requestAnimationFrame( animateZ );
    }
    camera.position.z = currentZ
  }

  const zoomIn = () => {
    targetZ = Math.max(camera.position.z - delta, minZ)
    animateZ()
    return {
      plus: targetZ !== minZ,
      minus: targetZ !== maxZ
    }
  }
  
  const zoomOut = () => {
    targetZ = Math.min(camera.position.z + delta, maxZ)
    animateZ()
    return {
      plus: targetZ !== minZ,
      minus: targetZ !== maxZ
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
  opacity?: number,
  rotateX?: boolean
  rotateY?: boolean
}){
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 500;

  const { zoomIn, zoomOut } = zoomFunctions(camera)
  const onProgress = initUi({ zoomIn, zoomOut })
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

}

