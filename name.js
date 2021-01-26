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

let allowAnimation = false

const colorAnimation = () => {
  setInterval(() => {
      if (!allowAnimation) {
          return null
      }
  
      const textToChange = document.getElementsByClassName('rainbow')

      for(let i=0; i < textToChange.length; i++) {
        textToChange[i].style.color = `#${chooseRandomHexChars()}`
      }
  }, 3000)
}

const isMobile = window.matchMedia('(max-width: 1160px)')

//TODO: Currently there is a bug in which the icons are the wrong color
//      if the user resizes from HD to phone-size. I would like to add a
//      media query event listener to fix this, but it's complicated and
//      poorly supported in some browsers

// const handleWindowResize = e => {
//   if (e.matches) {
//     const fen = document.getElementById("film-editor-nav")
//     // if (allowAnimation) return null
//     if (fen.style.color === '#DEDEDE') {
//       fen.style.color = '#000000'
//     } else if (fen.style.color === '#000000') {
//       fen.style.color = '#DEDEDE'
//     }
//   }
// }

// isMobile.addListener(handleWindowResize)

document.getElementById('hexagon').addEventListener("click", () => {
  allowAnimation = !allowAnimation

  const handleAnimationOn = () => {
    document.documentElement.style.setProperty('--body-background', '#000000')
    document.documentElement.style.setProperty('--text-color', '#DEDEDE')
    document.documentElement.style.setProperty('--navbar-background-mobile', '#2c2c2c')
    document.getElementById("hexagon").style.filter = "grayscale(0%)"
    
    const textToChange = document.getElementsByClassName('rainbow')
    for(let i=0; i < textToChange.length; i++) {
      if (["film-editor-nav", "graphic-design-nav", "drone-nav"].includes(textToChange[i].id) && isMobile.matches) {
        textToChange[i].style.color = '#000000'
      } else {
        textToChange[i].style.color = '#DEDEDE'
      }
    }
  }

  const handleAnimationOff = () => {
    document.documentElement.style.setProperty('--body-background', '#DEDEDE')
    document.documentElement.style.setProperty('--text-color', '#000000')
    document.documentElement.style.setProperty('--navbar-background-mobile', '#000000')
    document.getElementById("hexagon").style.filter = "grayscale(100%)";

    const textToChange = document.getElementsByClassName('rainbow')
    for(let i=0; i < textToChange.length; i++) {
      if (["film-editor-nav", "graphic-design-nav", "drone-nav"].includes(textToChange[i].id) && isMobile.matches) {
        textToChange[i].style.color = '#DEDEDE'
      } else {
        textToChange[i].style.color = '#000000'
      }
    }
  }

  allowAnimation
    ? handleAnimationOn()
    : handleAnimationOff()
})


// ensures alternate experience with random colors for people with reduced motion headers
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
if (!mediaQuery || mediaQuery.matches) {
  
  document.getElementsByClassName('rainbow').style.color = `#${chooseRandomHexChars()}`

  allowAnimation === false
} else {
  colorAnimation()
} 