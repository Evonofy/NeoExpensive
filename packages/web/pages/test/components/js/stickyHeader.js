const header = document.querySelector(".header-wrapper")
const nav = document.querySelector("nav")

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("scroll", event => {
    const scroll = this.scrollY
    const headerHeight = 200

    if(scroll >= headerHeight) {
      console.log("hey")
      /* add sticky navbar class */
      nav.classList.add("sticky")
    } else {
      nav.classList.remove("sticky")
    }
  })
})