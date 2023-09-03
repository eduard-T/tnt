// elements
const loader = document.getElementById('pageLoader')
const yearText = document.getElementById('year')


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
  // grab section based on id
  const section = document.getElementById(sectionId)

  // set y-axis offset
  let marginTop = 25

  // calculate scroll position
  const scrollPosition = section.getBoundingClientRect().top + window.scrollY - marginTop

  // scroll to the adjusted position
  window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
}

const imageUrls = [
  'assets/home1.jpg',
  'assets/home2.jpg',
  'assets/home3.jpg',
  'assets/img1.jpg',
  'assets/img2.jpg'
  // Add more image URLs here
]

// Function to update the carousel images
function updateCarouselImages() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const imageElements = document.querySelectorAll('.card img');

  // Find the selected radio button
  let selectedImageIndex = -1
  radioButtons.forEach((radio, index) => {
    if (radio.checked) {
      selectedImageIndex = index
    }
  })

  // Update image elements based on the selected radio button
  if (selectedImageIndex !== -1) {
    imageElements.forEach((image, index) => {
      const newIndex = (selectedImageIndex + index) % imageUrls.length
      image.src = imageUrls[newIndex]
    })
  }
}

// Add event listeners to radio buttons to trigger image updates
const radioButtons = document.querySelectorAll('input[type="radio"]')
radioButtons.forEach((radio) => {
  radio.addEventListener('change', updateCarouselImages)
})


// listeners
window.addEventListener('load', () => {
  setYear()
  fadeOut()
  updateCarouselImages()
})
