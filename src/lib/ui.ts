
export function init(){

  //
  const about = document.querySelector('.about')
  const infoClose = document.querySelector('.info-close')
  const info = document.querySelector('.info')
  
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

  return function onProgress( percent: number ){

    const progress = document.querySelector('#progress') as HTMLDivElement;
    if(!progress) return;
    progress.style.setProperty('--progress', `${percent}%`);
  
  }

}