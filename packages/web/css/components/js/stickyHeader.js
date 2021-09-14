const header = document.querySelector(".header-wrapper")
const nav = document.querySelector("nav")
const hambuger = document.querySelector("#hamburguer-wrap")

document.addEventListener("DOMContentLoaded", () => {
  var lastScrollTop = 0
  /* 
   * add padding to body, so content doesnt hide
   * solution 1: give body a class of .sticky and inside this class modify nav & hamburger
   * solution 2: use css sibling selector (~), and when .sticky is active, access the body and give it the padding
   * solution 3: add padding via javascript
  */
  /* check wheter it's mobile, if it is, keep the whole hamburguer header on top */
  document.addEventListener("scroll", event => {
    const scroll = this.scrollY
    const headerHeight = 200
    
    const isDownScroll = scroll > lastScrollTop
    if(isDownScroll === false && lastScrollTop > headerHeight) {
      /* up */
      hambuger.className = ""
      nav.className = "nav"
      hambuger.classList.add("scrollUp")
      nav.classList.add("scrollUp")
    } else if(scroll >= headerHeight) {
      /* add sticky navbar class */
      hambuger.className = ""
      nav.className = "nav"
      hambuger.classList.add("sticky")
      nav.classList.add("sticky")
    } else {
      hambuger.className = ""
      nav.className = "nav"
    }

    lastScrollTop = scroll
  })
})