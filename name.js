// const nameDisplay = document.getElementById('name')

// let tracker = 0

// const nameTicker = setInterval(() => {
//   nameDisplay.innerHTML = name[tracker]
//   tracker += 1

//   if (tracker >= name.length) {
//     clearInterval(nameTicker)
//   }
// }, 500)

// const name = 'Kauthar'

// nameTicker(name)

const chooseRandomHexChars = () => {
  const hexAlphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

  const color = []

  for (i = 0; i < 6; i++) {
      const char = hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)]
      color.push(char)
  }

  return color.join('')
}

const isMobile = window.matchMedia('(max-width: 1160px)')

let allowAnimation = false

const colorAnimation = () => {
  setInterval(() => {
      if (!allowAnimation) {
        return null
      }
  
      let textToChange = document.getElementsByClassName('rainbow')

      // disable icon coloring on mobile for now
      // there seems to be a bug in iOS with SVG animations
      if (isMobile.matches) {
        textToChange = document.querySelectorAll('.rainbow:not(.nav-icon)')
      }

      for(let i=0; i < textToChange.length; i++) {
        textToChange[i].style.color = `#${chooseRandomHexChars()}`
      }
  }, 3000)
}

document.getElementById('hexagon').addEventListener("click", () => {
  allowAnimation = !allowAnimation

  const handleAnimationOn = () => {
    document.documentElement.style.setProperty('--body-background', '#000000')
    document.documentElement.style.setProperty('--text-color', '#DEDEDE')
    document.documentElement.style.setProperty('--navbar-background-mobile', '#2c2c2c')
    document.documentElement.style.setProperty('--laurel-filter', 'invert(100)')
    document.getElementById("hexagon").style.filter = "grayscale(0%)"
    
    const textToChange = document.getElementsByClassName('rainbow')
    for(let i=0; i < textToChange.length; i++) {
      if (["film-editor-nav", "graphic-design-nav", "drone-nav"].includes(textToChange[i].id) && isMobile.matches) {
        textToChange[i].style.color = '#DEDEDE'
      } else {
        textToChange[i].style.color = '#DEDEDE'
      }
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
      if (["film-editor-nav", "graphic-design-nav", "drone-nav"].includes(textToChange[i].id) && isMobile.matches) {
        textToChange[i].style.color = '#DEDEDE'
      } else {
        textToChange[i].style.color = '#000000'
      }
    }

    const favicon = document.querySelector('[rel=icon]');
    favicon.href = '/favicon.png'
  }

  allowAnimation
    ? handleAnimationOn()
    : handleAnimationOff()
})


// ensures alternate experience with random colors for people with reduced motion headers
// TODO: update this section so it works
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
if (!mediaQuery || mediaQuery.matches) {
  
  document.getElementsByClassName('rainbow').style.color = `#${chooseRandomHexChars()}`

  allowAnimation === false
} else {
  colorAnimation()
} 