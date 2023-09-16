// general elements
const loader = document.getElementById('pageLoader')
const yearText = document.getElementById('year')
const lightBox = document.getElementById('lightBox')
const socialList = document.getElementById("socialList")
const socialTitle = document.getElementById("socialTitle")
const burger = document.getElementById('burger')
const mobileNav = document.getElementById('mobileNav')

// helpers
function fadeOut() {
  // fade out the element after a delay
  window.setTimeout(() => {
    // add a smooth fade-out effect
    loader.style.transition = 'opacity 1s'
    // set the opacity to 0 to initiate the fade-out
    loader.style.opacity = '0'

    // remove the element from the DOM after the animation
    setTimeout(() => {
      loader.remove()
    }, 750)
  }, 1000)
}

function setYear() {
  // append the current year
  yearText.appendChild(document.createTextNode(new Date().getFullYear()))
}

function scrollToSection(sectionId) {
  // remove mobile menu and restore scrolling
  burger.classList.remove('isOpen')
	mobileNav.classList.remove('isOpen')
  document.body.style.overflow = 'visible'

  // grab section based on id
  const section = document.getElementById(sectionId)

  // set y-axis offset
  let marginTop = 25

  // calculate scroll position
  const scrollPosition = section.getBoundingClientRect().top + window.scrollY - marginTop

  // scroll to the adjusted position
  window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
}

function toggleMenu() {
  // scroll to top to ensure smooth animation transition
  window.scrollTo({ top: 0, behavior: 'smooth' })

  // toggle 'open' classes
  burger.classList.toggle('isOpen')
	mobileNav.classList.toggle('isOpen')

  // freeze scrolling when open
  if (mobileNav.classList.contains('isOpen')) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'visible'
  }
}

function toggleLightBox() {
  // toggle 'focused' classes
  lightBox.classList.toggle('focused')

  // freeze scrolling when focused
  if (lightBox.classList.contains('focused')) {
    clearInterval(intervalId)
    document.body.style.overflow = 'hidden'
  } else {
    resetInterval()
    document.body.style.overflow = 'visible'
  }
}

// ---------------------------- Image Carousel ---------------------------- //

// elements
const carouselImage = document.getElementById('carouselImage')
const focusedImage = document.getElementById('focusedImage')
const prevButton = document.getElementById('prevButton')
const nextButton = document.getElementById('nextButton')
let intervalId
let currentIndex = 0

// image paths
const imageSources = [
  'assets/project_1.jpg',
  'assets/project_2.jpg',
  'assets/project_3.jpg',
  'assets/project_4.jpg',
  'assets/project_5.jpg',
  'assets/project_6.jpg',
  'assets/project_7.jpg',
  'assets/project_8.jpg',
  'assets/project_9.jpg',
  'assets/project_10.jpg',
  'assets/project_11.jpg',
  'assets/project_12.jpg',
  'assets/project_13.jpg'
]

// start the slideshow
function startSlideshow() {
  // start the interval
  resetInterval()

  // show the first image
  showImage(currentIndex)
}


// show an image
function showImage(index) {
  if (index < 0) {
    currentIndex = imageSources.length - 1
  } else if (index >= imageSources.length) {
    currentIndex = 0
  }

  // set the new image source
  carouselImage.src = imageSources[currentIndex]
  focusedImage.src = imageSources[currentIndex]

  // reset the interval after user interaction
  resetInterval()
}

// reset the interval
function resetInterval() {
  // clear the existing interval
  clearInterval(intervalId)

  // start a new one
  intervalId = setInterval(() => {
    currentIndex++
    showImage(currentIndex)
  }, 4000)
}

// previous button listener
prevButton.addEventListener('click', () => {
  currentIndex--
  showImage(currentIndex)
})

// next button listener
nextButton.addEventListener('click', () => {
  currentIndex++
  showImage(currentIndex)
})

// ---------------------------- Social Icons ---------------------------- //

// hover listener for icons
socialList.addEventListener('mouseover', (event) => {
  const listItem = event.target

  clearTimeout(timeoutId)

  // confirm it is the clickable portion
  if (listItem.tagName === 'A') {
    // grab the title
    const title = listItem.getAttribute('data-title')

    // split the words
    const words = title.split(" ")

    // target the last word
    const lastWord = words[words.length - 1]

    // insert the content back in with a new tag and styling for the last word
    socialTitle.innerHTML = words.slice(0, -1).join(" ") + ' <span class="blueText">' + lastWord + '</span>'
  }
})

// reset text content to default on mouse exit
socialList.addEventListener('mouseout', () => {
  timeoutId = setTimeout(() => {
    socialTitle.textContent = 'Get in touch!'
  }, 500)
})

// ---------------------------- Contact Form ---------------------------- //

// elements
const feedback = document.getElementById('feedback')
const contactForm = document.getElementById('contactForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const nameError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const messageError = document.getElementById('messageError')

const validateForm = () => {
  let isValid = true

  // reset previous error messages
  nameError.textContent = ''
  emailError.textContent = ''
  messageError.textContent = ''

  // validate name
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Name is required!'
    isValid = false
  }

  // validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required!'
    isValid = false
  } else if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = 'Invalid email address!'
    isValid = false
  }

  // validate message
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'Message is required!'
    isValid = false
  }

  return isValid
}

const showMessage = (message, isSuccess) => {
  // set feedback text content
  feedback.textContent = message

  // show feedback
  feedback.style.display = 'grid'

  // hide it again after 3 seconds
  setTimeout(() => {
    feedback.style.display = 'none'
  }, 3000)

  if (isSuccess) {
    // reset form inputs
    contactForm.reset()
    feedback.style.color = '#59C9D5'
  } else {
    feedback.style.color = '#F73939'
  }
}

// listen for form submission
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  // check if form is valid
  if (validateForm()) {
    // continue with form submission
    const formData = new FormData(contactForm)

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        showMessage('Thanks! We\'ll get back to you as soon as possible', true)
      } else {
        showMessage('Message could not be sent.\nPlease try again later.', false)
      }
    } catch (error) {
      showMessage('An error occurred.\nPlease try again later.', false)
    }
  }
})


// listeners
window.addEventListener('load', () => {
  setYear()
  fadeOut()
  startSlideshow()
})
