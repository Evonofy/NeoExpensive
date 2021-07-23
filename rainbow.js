const evo = document.querySelector(".toggle")
const logo = document.querySelector("#logo svg")
const nav = document.querySelector("nav")

evo.addEventListener("click", () => {
  logo.classList.toggle("rgb")
  nav.classList.toggle("rgb")
})