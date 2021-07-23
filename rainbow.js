const evo = document.querySelector(".toggle")
const logo = document.querySelector("#logo svg")
const nav = document.querySelector("nav")
const body = document.querySelector("body")
const itemdrop = document.querySelectorAll(".nav__itemdrop")

evo.addEventListener("click", () => {
  logo.classList.toggle("rgb")
  nav.classList.toggle("rgb")
  body.classList.toggle("light")
  
  itemdrop[0].classList.toggle("rgb")
  itemdrop[1].classList.toggle("rgb")
})