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
let favoriteMessagesCheckbox = document.getElementById('favorite-messages-list-choice')

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
  meditateImage.classList.remove('hidden')
  clearLink.classList.add('hidden')
}

const showSubmitGemField = () => {
  formTitle.textContent = "What type of message are you entering?"
  checkForChoiceSelection()
  userMessage.classList.remove('error-message')
  hide([meditateImage, receiveButton, userMessage])
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

const addFavoriteMessage = () => {
  if(mantraRadioButton.checked) {
    favoriteAffirmations.push(userMessage.textContent)
    hide([favoriteButton])
    show([addedMessage, favoriteMessagesCheckbox])
  } else {
    favoriteMantras.push(userMessage.textContent)
    hide([favoriteButton])
    show([addedMessage, favoriteMessagesCheckbox])
  }
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
submitInputButton.addEventListener('click', submitMessage)
userInputField.addEventListener('click', checkForChoiceSelection)
favoriteButton.addEventListener('click', addFavoriteMessage)

