
// const HairSpace = '•'
const HairSpace = '\u200A'
// const strings = '݆ⴁ⩳ᩀпⶫ⴮Ȕಂ삳ⲧᚇm⃋✾য়쩎ڳᆚฐ⨶᥈ሧ⥍ḙལᎍข⬪˙뜲ⱱஏஂவẜ⌳෌ሮࣨ⶝ӛပ쪜ᣎ℉✑᭥࿐ឣᅨ⳪탍☷ṕቔૈ⌧ᖜΉℓ겚⳩ᬂởᵦᓑⵅề�긺⛸ᰛⲒ╙⃽ဧ̚┇᜴झᐐᷔΚᕽԕנ⍜ᧃ᱇'.split('')
// const strings = 'qwertyuopasdfghjklzxcvbnm`!@#$%^&*()_+-={}[];\':",./<>?'.split('')
const strings = 'qwertyuopasdfghjklzxcvbnm'.split('')
const maxIndex = strings.length - 1

function getRandomString(len: number){
  let i = 0;
  let str = ''
  while(i<len){
    str += strings[ Math.round(Math.random()*maxIndex) ]
    i++
  }
  return str
}

function start({
  elm,
  text,
  current,
  stopper
}:{
  elm: HTMLSpanElement
  text: string
  current: string
  stopper: { canceled: boolean }
}){
  
  if(stopper.canceled) return;
  const currentString = current ? current.split(HairSpace) : ['']
  const nextChar = text.charAt(currentString[0].length)
  let nextString = currentString[0] + (Math.random()<0.5?nextChar:'')
  
  if(nextString === text) {
    elm.innerText = nextString
  }else{
    const random = getRandomString( text.length - currentString[0].length )
    nextString += HairSpace + random
    elm.innerText = nextString
  }

  requestAnimationFrame(() => {
    if(stopper.canceled) return;
    start({
      elm,
      text,
      current: nextString,
      stopper
    })
  })

}

function onMouseOver(
  elm: HTMLSpanElement,
  stopper: { canceled: boolean }
){
  const text = elm.getAttribute('data-text')
  if(!text) throw new Error('data-text is gone!!')

  start({
    elm,
    text,
    current: '',
    stopper
  })

}

function onMouseLeave(
  elm: HTMLSpanElement, 
  stopper: { canceled: boolean }
){
  stopper.canceled = true
  elm.innerText = ''
  setTimeout(() => {
    stopper.canceled = false
  },100)
}


export function randomizeText({
  anchor,
  text = 'span',
}:{
  anchor: string
  text?: string
}){

  const anchorElm = document.querySelectorAll(anchor) as NodeListOf<HTMLAnchorElement>
  anchorElm.forEach(elm => {

    const textElm = elm.querySelector(text) as HTMLSpanElement
    console.log(textElm)
    textElm.setAttribute('data-text', textElm.innerText)
    textElm.innerText = ''

    const stopper = { canceled: false }
    elm.addEventListener('mouseenter', (e) => {
      if(e.currentTarget !== elm) return;
      onMouseOver(textElm, stopper)
    })

    elm.addEventListener('focus', (e) => {
      if(e.currentTarget !== elm) return;
      onMouseOver(textElm, stopper)
    })

    elm.addEventListener('mouseleave', (e) => {
      if(e.currentTarget !== elm) return;
      onMouseLeave(textElm, stopper)
    })

  })

}