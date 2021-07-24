const $ = document.querySelector.bind(document)

const evo = $(".toggle")
const logo = $("#logo svg")
const nav = $("nav")
const body = $("body")
const [itemdrop, itemdrop2] = document.querySelectorAll(".nav__itemdrop")

const memoryTheme = localStorage.getItem("theme")
const availableThemes = {
  light: "light",
  dark: "dark",
  rgb: "rgb"
}

const setTheme = ({ theme }) => {
  localStorage.setItem("theme", theme)
  document.body.setAttribute("data-theme", theme)

  if(!theme) {
    /** Recursively call the setTheme function to set dark as default */
    setTheme({ theme: "dark" })
  }
}

/** Pattern matching to find theme in localStorage */
/** Set localStorage theme as app theme */
setTheme({ theme: availableThemes[memoryTheme] })

/** This will cycle through all themes */
const cycleTheme = () => {
  const themeArray = Object.keys(availableThemes)
  const current = themeArray.indexOf(document.body.getAttribute("data-theme"))
  const max = themeArray.length
  var next = current + 1

  /** If next item reaches the max of the array, set it to the first array item */
  if(next === max) next = 0

  setTheme({ theme: themeArray[next] })
}

evo.addEventListener("click", cycleTheme())