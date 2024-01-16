let affirmRadioButton = document.getElementById('affirm')
let mantraRadioButton = document.getElementById('mantra')

let receiveButton = document.getElementById('receive-button')
let userMessage = document.getElementById('user-message')
let meditateImage = document.getElementById('meditate-image')
let clearLink = document.getElementById('clear-link')
let addGem = document.getElementById('add-gem')
let formTitle = document.getElementById('form-title')
let userInputField = document.getElementById('user-input-message')
let submitInputButton = document.getElementById('submit-message')
let favoriteButton = document.getElementById('favorite-button')
let addedMessage = document.getElementById('added-message')
let favoriteMessagesLink = document.getElementById('favorite-messages-list-choice')
let centerBody = document.getElementById('user-choice-section')
let firstContainer = document.getElementById('first-container')
let secondContainer = document.getElementById('second-container')
let backOfCard = document.getElementById('flip-card-back')
let backOfCardWords = document.getElementById('back-card-words')
let favoriteAffirmationsList = document.getElementById('favorite-affirmations-list')
let favoriteMantrasList = document.getElementById('favorite-mantras-list')
let backToMainLink = document.getElementById('back-to-main-link')

let affirmations = 
['I alone hold the truth of who I am.', 
 'I affirm and encourage others, as I do myself.',
 'I am allowed to ask for what I want and what I need.',
 'I am allowed to feel good.',
 'I am capable of balancing ease and effort in my life.',
 'I am complete as I am, others simply support me.'
]

let mantras = [
  "I surrender to the divine within.",
  "May everyone be blessed with peace and harmony.",
  "Guide me from ignorance to enlightenment.",
  "That is whole, and this is whole.",
  "May there be peace within and around me.",
  "May all beings everywhere be happy and free, and may the thoughts, words, and actions of my own life contribute to the happiness and freedom for all.",
  "Expect nothing and appreciate everything.",
  "Love and kindness guide my actions, creating a world filled with compassion.",
  "Divine love flows through me, offering comfort and healing to those in need."
]

let favoriteMantras = []
let favoriteAffirmations = []

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const showUserChoice = (e) => {
  e.preventDefault()
  hide([meditateImage])
  show([clearLink])
  userMessage.classList.remove('error-message')
  if(affirmRadioButton.checked) {
    userMessage.textContent = `${affirmations[getRandomIndex(affirmations)]}`
    favoriteButton.classList.remove('hidden')
  } else if (mantraRadioButton.checked) {
    userMessage.textContent = `${mantras[getRandomIndex(mantras)]}`
    favoriteButton.classList.remove('hidden')
  } else {
    showSelectionErrorMessage()
  }
}

const showSelectionErrorMessage = () => {
  let noChoiceSelected = !affirmRadioButton.checked && !mantraRadioButton.checked
  console.log(noChoiceSelected)
  if(noChoiceSelected) {
    show([userMessage])
    userMessage.classList.add('error-message')
    userMessage.textContent = `You need to choose a message type.`
  } else {
    userMessage.classList.remove('error-message')
  }
}

const clearMessage = () => {
  userMessage.innerHTML = ''
  show([meditateImage])
  hide([clearLink, favoriteButton])
}

const showSubmitGemField = () => {
  formTitle.textContent = "What type of message are you entering?"
  checkForChoiceSelection()
  userMessage.classList.remove('error-message')
  hide([meditateImage, receiveButton, userMessage, favoriteButton])
  show([userInputField, submitInputButton])
  showUserInputErrorMessage()
}

const addUserMessageToDataSets = () => {
  if(affirmRadioButton.checked) {
    affirmations.push(userInputField.value !== "" && userInputField.value)
  } else {
    mantras.push(userInputField.value !== "" && userInputField.value)
  }
  formTitle.textContent = "What type of messages do you need today?"
}

const checkForChoiceSelection = () => {
  submitInputButton.classList.remove('grey')
  let choiceSelected = affirmRadioButton.checked || mantraRadioButton.checked
  if(!choiceSelected) {
    submitInputButton.disabled = true
    submitInputButton.classList.add('grey')
  } else {
    submitInputButton.disabled = false
    submitInputButton.classList.remove('grey')
    userMessage.classList.remove('error-message')
    userMessage.textContent = ''
  }
}

const showUserInputErrorMessage = () => {
  let noChoiceSelected = !affirmRadioButton.checked && !mantraRadioButton.checked
  if(noChoiceSelected) {
    show([userMessage])
    userMessage.classList.add('error-message')
    userMessage.textContent = 'Pick a message type, then type in your message.'
  } else {
    userMessage.classList.remove('error-message')
  }
}

const submitMessage = () => {
  addUserMessageToDataSets()
  userMessage.textContent = userInputField.value
  show([clearLink, receiveButton, userMessage])
  hide([userInputField, submitInputButton])
}

const checkInputMessageLength = () => {
  let choiceSelected = affirmRadioButton.checked || mantraRadioButton.checked
  submitInputButton.disabled = false
  if(choiceSelected && userInputField.value.length < 10) {
    userMessage.classList.add('error-message')
    userMessage.textContent = 'Make sure your message is at least 10 characters in length.'
    submitInputButton.disabled = true
  } else {
    submitMessage()
  }
}
//SOLVE
//The user doesn't have to click into the input field when they HAVE
//made a choice, and the function is called by clicking into the input field, and so
//That's why it's not showing UP!!!!

const addFavoriteMessage = () => {
  if(mantraRadioButton.checked) {
    hide([favoriteButton])
    show([addedMessage, favoriteMessagesLink])
    favoriteMantras.push(userMessage.textContent)
    console.log(favoriteMantras)
  } else {
    hide([favoriteButton])
    show([addedMessage, favoriteMessagesLink])
    favoriteAffirmations.push(userMessage.textContent)
    console.log(favoriteAffirmations)
  }
}

const flipCard = () => {
  firstContainer.classList.remove('spin-back')
  secondContainer.classList.remove('spin-back')
  flip([firstContainer, secondContainer, backOfCardWords])
  favoriteAffirmations.forEach(affirmation => {
    favoriteAffirmationsList.insertAdjacentHTML('beforeend', `<p class="favorite-list">${affirmation}<p>`)
  })
  favoriteMantras.forEach(mantra => {
    favoriteMantrasList.insertAdjacentHTML('beforeend', `<p class="favorite-list">${mantra}<p>`)
  })
}

let flipBackToMainView = () => {
  flipBack([firstContainer, secondContainer])
  console.log('hi')
}

const flip = (elements) => {
  elements.forEach(element => element.classList.add('spin'));
}

const flipBack = (elements) => {
  elements.forEach(element => element.classList.add('spin-back'));
}

const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
}

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
}

receiveButton.addEventListener('click', (e) =>  showUserChoice(e))
clearLink.addEventListener('click', clearMessage)
addGem.addEventListener('click', showSubmitGemField)
submitInputButton.addEventListener('click', checkInputMessageLength)
userInputField.addEventListener('click', checkForChoiceSelection)
favoriteButton.addEventListener('click', addFavoriteMessage)
favoriteMessagesLink.addEventListener('click', flipCard)
backToMainLink.addEventListener('click', flipBackToMainView)

//Error messaging that checks the length of the message that is being sent.

//So, there's two things, 
//First thing is, check the length of the message (value of the input field)
//Show an error message if the length is not long enough

//You shouldn't be able to push the message into the array of messages IF it isn't long enough
//You probably shouldn't be able to click the button either?
//So disable the button, but keep it green, instead of grey. So there's a separation there,
//And it makes sense which error you're getting.


//Pseudocode for flipping the card.
//So, as far as I can see with w3 school, there's 
//two divs that wrap both the front of the card, and the back of the card.
//So the main contents of the card are wrapped in two divs, so I would need to wrap
//The main content of the card in two divs.
//Now, the two divs have two class names that have different
//names, because the CSS are different,
//And so those need to be added by the check of the box
//This means I need to add those CSS styling on click,
//And add it to each div respectively on click, so that (hopefully) the card turns
//So, when the check box is checked, or on click of the checkbox,
//I have to add the styling .classList.add to the wrapping divs
//This means I need to query the checkbox, so I can ... Maybe U should make the checkbox a link.
//I will do that.