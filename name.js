const mobileQuery = window.matchMedia('(max-width: 1160px)')

const navScroll = (elementLoc, isMobile) => {
  console.log('scroll fired')
  if (isMobile) {
    return window.scrollTo({ top: (elementLoc - 65), behavior: 'smooth' })
  } else {
    return window.scrollTo({ top: elementLoc, behavior: 'smooth' })
  }
}

const navScrollMobile = navScroll

// set up for scrolling between sections
const filmNav = document.getElementById('film-editor-nav-link')
const graphicNav = document.getElementById('graphic-design-nav-link')
const droneNav = document.getElementById('drone-nav-link')

const checkMobile = () => {
  console.log('mobile changed')

  // TODO: set it up so it waits for the graphic design pics to
  // to load before getting the drone nav location

  // find locations of each item
  const filmNavLoc = document.getElementById('film-editor').offsetTop
  const graphicNavLoc = document.getElementById('graphic-designer').offsetTop
  const droneNavLoc = document.getElementById('drone-pilot').offsetTop

  // set variables for the nav icons
  const filmSVG = document.getElementById('film-editor-nav')
  const graphicSVG = document.getElementById('graphic-design-nav')
  const droneSVG = document.getElementById('drone-nav')
  if (mobileQuery.matches) {
    // add scrolling offset
    filmNav.addEventListener('click', () => navScroll(filmNavLoc, true))
    graphicNav.addEventListener('click', () => navScroll(graphicNavLoc, true))
    droneNav.addEventListener('click', () => navScroll(droneNavLoc, true))

    // remove rainbow class from SVG icons due to iOS bug
    filmSVG.classList.remove('rainbow')
    graphicSVG.classList.remove('rainbow')
    droneSVG.classList.remove('rainbow')

    // reset colors to avoid getting stuck in rainbow
    filmSVG.style.setProperty('color', '#DEDEDE')
    graphicSVG.style.setProperty('color', '#DEDEDE')
    droneSVG.style.setProperty('color', '#DEDEDE')
  } else {
    ////////////////////////////////////////////////////////////////////////////////////
    // The event listener below is not removed when the mobile state changes.
    // This has been a huge annoyance because there's no way to handle the scroll
    // function without using an anonymous function, but you cannot remove the
    // event handler when it's an anonymous function. So if you resize the window
    // over and over, it will call previous event handlers many times simultaneously.
    // However, scrolling behaves as expected and this issue does not seem to have
    // any noticeable performance impact in real-world usage, so for now:
    //                      _               _                         _    __ _      
    //   _ __ ___  ___  ___ | |_   _____  __| |_  __      _____  _ __ | |_ / _(_)_  __
    //  | '__/ _ \/ __|/ _ \| \ \ / / _ \/ _` (_) \ \ /\ / / _ \| '_ \| __| |_| \ \/ /
    //  | | |  __/\__ \ (_) | |\ V /  __/ (_| |_   \ V  V / (_) | | | | |_|  _| |>  < 
    //  |_|  \___||___/\___/|_| \_/ \___|\__,_(_)   \_/\_/ \___/|_| |_|\__|_| |_/_/\_\
    //
    ////////////////////////////////////////////////////////////////////////////////////
    filmNav.addEventListener('click', () => navScroll(filmNavLoc, false))
    graphicNav.addEventListener('click', () => navScroll(graphicNavLoc, false))
    droneNav.addEventListener('click', () => navScroll(droneNavLoc, false))

    // add rainbow class to SVG icons
    filmSVG.classList.add('rainbow')
    graphicSVG.classList.add('rainbow')
    droneSVG.classList.add('rainbow')

    // change icons to black to match white background
    if (!allowAnimation) {
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
    // TODO: can maybe remove this loop with some CSS changes
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
    favicon.href = '/favicon.png'
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