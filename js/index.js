import { Theme } from "./themes/index.js"

const $ = document.querySelector.bind(document)
const evo = $(".toggle")

/** Global theme */
var theme = new Theme()

/** When localStorage changes, change the theme */
window.addEventListener("storage", event => theme = new Theme(event.newValue))

/** When logo clicked, cycle through themes */
evo.addEventListener("click", () => theme.cycleTheme())