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

      document.documentElement.style
          .setProperty('--name-transition', `color ease-in 1000ms`)
  
      const textToChange = document.getElementsByClassName('rainbow')

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
    document.getElementById("css-is-stupid").style.boxShadow = "0"
    document.getElementById("hexagon").style.filter = "grayscale(0%)"
    
    const textToChange = document.getElementsByClassName('rainbow')
    for(let i=0; i < textToChange.length; i++) {
      textToChange[i].style.color = '#DEDEDE'
    }
  }

  const handleAnimationOff = () => {
    document.documentElement.style.setProperty('--body-background', '#DEDEDE')
    document.documentElement.style.setProperty('--text-color', '#000000')
    document.getElementById("hexagon").style.filter = "grayscale(100%)";

    const textToChange = document.getElementsByClassName('rainbow')
    for(let i=0; i < textToChange.length; i++) {
      textToChange[i].style.color = '#000000'
    }
  }

  allowAnimation
    ? handleAnimationOn()
    : handleAnimationOff()
})

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// ensures alternate experience with random colors for people with reduced motion headers
// thanks to https://dev.to/vanaf1979/respecting-prefers-reduced-motion-with-javascript-and-react-42if
// for the media query technique
if (!mediaQuery || mediaQuery.matches) {
  
  document.getElementsByClassName('rainbow').style.color = `#${chooseRandomHexChars()}`

  allowAnimation === false
} else {
  colorAnimation()
} 