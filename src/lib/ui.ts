
export function init({
  zoomIn,
  zoomOut
}:{
  zoomIn: () => { plus: boolean, minus: boolean }
  zoomOut: () => { plus: boolean, minus: boolean }
}){

  //
  const about = document.querySelector('.about')
  const infoClose = document.querySelector('.info-close')
  const info = document.querySelector('.info')
  const plus = document.querySelector('button.plus') as HTMLButtonElement
  const minus = document.querySelector('button.minus') as HTMLButtonElement
  
  function toggleInfo(){
    if(info) info.classList.toggle('open')
  }

  if(about) about.addEventListener('click', toggleInfo)
  if(infoClose) infoClose.addEventListener('click', toggleInfo)

  // open about
  if(window.innerWidth >= 546){

    setTimeout(() => {
      toggleInfo()
    },400)

  }

  // zoom in and out
  plus.addEventListener('click', () => {
    const { plus: plusEnabled, minus: minusEnabled } = zoomIn()
    if(plusEnabled) plus.removeAttribute('disabled')
    else plus.setAttribute('disabled','')
    if(minusEnabled) minus.removeAttribute('disabled')
    else minus.setAttribute('disabled','')
  })

  minus.addEventListener('click', () => {
    const { plus: plusEnabled, minus: minusEnabled } = zoomOut()
    if(plusEnabled) plus.removeAttribute('disabled')
    else plus.setAttribute('disabled','')
    if(minusEnabled) minus.removeAttribute('disabled')
    else minus.setAttribute('disabled','')
  })

  function onProgress( percent: number ){

    const progress = document.querySelector('#progress') as HTMLDivElement;
    if(!progress) return;
    progress.style.setProperty('--progress', `${percent}%`);
  
  }

  return onProgress

}