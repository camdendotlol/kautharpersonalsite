const mobileQuery = window.matchMedia('(max-width: 1160px)')

// set up for scrolling between sections
const topNav = document.getElementById('top-nav-link')
const filmNav = document.getElementById('film-editor-nav-link')
const graphicNav = document.getElementById('graphic-design-nav-link')
const droneNav = document.getElementById('drone-nav-link')

const topSVG = document.getElementById('top-nav')
const filmSVG = document.getElementById('film-editor-nav')
const graphicSVG = document.getElementById('graphic-design-nav')
const droneSVG = document.getElementById('drone-nav')

const filmSection = document.getElementById('film-editor')
const graphicSection = document.getElementById('graphic-designer')
const droneSection = document.getElementById('drone-pilot')

// Special workaround because Safari doesn't support the scroll-margin-top CSS property.
// Support has been merged into WebKit, but the workaround should probably stay for the
// long-term due to old iOS and Mac devices still in use.

const appleDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod']

if ((appleDevices.includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) && mobileQuery.matches) {
  topNav.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  })
  filmNav.addEventListener('click', () => {
    filmSection.scrollIntoView({ behavior: 'smooth' })
    window.scrollBy(0, -65)
  })
  graphicNav.addEventListener('click', () => {
    graphicSection.scrollIntoView({ behavior: 'smooth' })
    window.scrollBy(0, -65)
  })
  droneNav.addEventListener('click', () => {
    droneSection.scrollIntoView({ behavior: 'smooth' })
    window.scrollBy(0, -65)
  })
} else {
  topNav.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
  filmNav.addEventListener('click', () => filmSection.scrollIntoView({ behavior: 'smooth' }))
  graphicNav.addEventListener('click', () => graphicSection.scrollIntoView({ behavior: 'smooth' }))
  droneNav.addEventListener('click', () => droneSection.scrollIntoView({ behavior: 'smooth' }))
}

const checkMobile = () => {
  if (mobileQuery.matches) {
    // remove rainbow class from SVG icons due to iOS bug
    topSVG.classList.remove('rainbow')
    filmSVG.classList.remove('rainbow')
    graphicSVG.classList.remove('rainbow')
    droneSVG.classList.remove('rainbow')

    // reset colors to avoid getting stuck in rainbow
    topSVG.style.setProperty('color', '#DEDEDE')
    filmSVG.style.setProperty('color', '#DEDEDE')
    graphicSVG.style.setProperty('color', '#DEDEDE')
    droneSVG.style.setProperty('color', '#DEDEDE')
  } else {
    // add rainbow class to SVG icons
    topSVG.classList.add('rainbow')
    filmSVG.classList.add('rainbow')
    graphicSVG.classList.add('rainbow')
    droneSVG.classList.add('rainbow')

    // change icons to black to match white background
    if (!allowAnimation) {
      topSVG.style.setProperty('color', '#000000')
      filmSVG.style.setProperty('color', '#000000')
      graphicSVG.style.setProperty('color', '#000000')
      droneSVG.style.setProperty('color', '#000000')
    }
  }
}

mobileQuery.addEventListener('change', checkMobile)

let allowAnimation = false

const chooseRandomHexChars = () => {
  const hexAlphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

  const color = []

  for (i = 0; i < 6; i++) {
      const char = hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)]
      color.push(char)
  }

  return color.join('')
}

const colorAnimation = () => {
  setInterval(() => {
      if (!allowAnimation) {
        return null
      }
  
      const textToChange = document.getElementsByClassName('rainbow')

      for(let i=0; i < textToChange.length; i++) {
        textToChange[i].style.color = `#${chooseRandomHexChars()}`
      }
  }, 5000)
}

const handleAnimation = () => {
  allowAnimation = !allowAnimation

  const handleAnimationOn = () => {
    document.documentElement.style.setProperty('--body-background', '#000000')
    document.documentElement.style.setProperty('--text-color', '#DEDEDE')
    document.documentElement.style.setProperty('--navbar-background-mobile', '#2c2c2c')
    document.documentElement.style.setProperty('--laurel-filter', 'invert(100)')
    document.getElementById("hexagon").style.filter = "grayscale(0%)"
    
    const textToChange = document.getElementsByClassName('rainbow')
    for(let i=0; i < textToChange.length; i++) {
        textToChange[i].style.color = 'var(--text-color)'
      }

    const favicon = document.querySelector('[rel=icon]');
    favicon.href = '/assets/img/rainbowhex.png'
  }

  const handleAnimationOff = () => {
    document.documentElement.style.setProperty('--body-background', '#DEDEDE')
    document.documentElement.style.setProperty('--text-color', '#000000')
    document.documentElement.style.setProperty('--navbar-background-mobile', '#000000')
    document.documentElement.style.setProperty('--laurel-filter', 'invert(0)')
    document.getElementById("hexagon").style.filter = "grayscale(100%)";

    const textToChange = document.getElementsByClassName('rainbow')
    for(let i=0; i < textToChange.length; i++) {
      textToChange[i].style.color = 'var(--text-color)'
    }

    const favicon = document.querySelector('[rel=icon]');
    favicon.href = '/assets/favicon.png'
  }

  allowAnimation
    ? handleAnimationOn()
    : handleAnimationOff()
}

// reduced motion headers will disable the entire dark mode and all animations
const a11yQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
if (!a11yQuery || a11yQuery.matches) {
  allowAnimation === false
} else {
  document.getElementById('hexagon').addEventListener("click", handleAnimation)
  colorAnimation()
}

checkMobile() // initial run on page load