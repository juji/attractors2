

export function debounceReset( 
  initResize: () => void, 
  onResize: () => void,
  timeout: number = 100 
){
  
  let resetting: false | ReturnType<typeof setTimeout> = false;
  
  window.addEventListener("resize", (/* event */) => {
    initResize()
    if(resetting) clearTimeout(resetting)
    resetting = setTimeout(() => {
      resetting = false
      onResize()
    },timeout)
  })
}