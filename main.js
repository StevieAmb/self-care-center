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

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const showUserChoice = (e) => {
  e.preventDefault()
  hide([meditateImage])
  show([clearLink])
  userMessage.classList.remove('error-message')
  let noChoiceSelected = !affirmRadioButton.checked || !mantraRadioButton.checked
  if(affirmRadioButton.checked) {
    userMessage.textContent = `${affirmations[getRandomIndex(affirmations)]}`
  } else if (mantraRadioButton.checked) {
    userMessage.textContent = `${mantras[getRandomIndex(mantras)]}`
  } else if(noChoiceSelected) {
    userMessage.classList.add('error-message')
    userMessage.textContent = `You need to choose a message type.`
  }
}

const clearMessage = () => {
  userMessage.innerHTML = ''
  meditateImage.classList.remove('hidden')
  clearLink.classList.add('hidden')
}

const addOwnMessageToDataSet = () => {
  if(affirmRadioButton.checked) {
    affirmations.push(userInputField.value !== "" && userInputField.value)
  } else {
    mantras.push(userInputField.value !== "" && userInputField.value)
  }
}

const showSubmitGemField = () => {
  userMessage.classList.remove('error-message')
  checkForChoiceSelection()
  hide([meditateImage, receiveButton, userMessage])
  show([userInputField, submitInputButton])
  showErrorMessage()
}


const checkForChoiceSelection = () => {
  let choiceSelected = affirmRadioButton.checked || mantraRadioButton.checked
  if(!choiceSelected) {
    submitInputButton.disabled = true
  } else {
    submitInputButton.disabled = false
  }
}

const showErrorMessage = () => {
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

const submitMessage = () => {
  addOwnMessageToDataSet()
  formTitle.textContent = "What type of message are you entering?"
  userMessage.textContent = userInputField.value
  show([clearLink, receiveButton, userMessage])
  hide([userInputField, submitInputButton])
  userInputField.textContent = ""
}

//BUG, there's an empty message in the array, after the user adds a gem.
//Interesting.

//Separation of tasks.
//One function for adding to the array,
//One function for showing the message

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


//BUG
// - The user can submit a 
