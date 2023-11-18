

export function debounceReset( 
  initResize: () => void, 
  onResize: () => void,
  timeout: number = 100 
){
  
  let resetting: boolean | ReturnType<typeof setTimeout> = false;
  
  window.addEventListener("resize", (/* event */) => {
    initResize()
    if(resetting) clearTimeout(resetting as ReturnType<typeof setTimeout>)
    resetting = setTimeout(() => {
      resetting = false
      onResize()
    },timeout)
  })
}