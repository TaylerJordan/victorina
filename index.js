let tests = []
let currentTest = 0
let rez = 0
let totalQuestion = 0

const question = document.querySelector('.question')
const answersWrap = document.querySelector('.answers')
const next = document.querySelector('.next')
const counter = document.querySelector('.counter')

fetch('db.json')
  .then((data) => data.json())
  .then((data) => {
    tests = data.tests
    totalQuestion = tests.length
    showQuestion(currentTest)
  })

function showQuestion(n) {
  question.textContent = tests[n].question
  tests[n].answers.forEach((item) => {
    const answer = document.createElement('div')
    answer.classList.add('answer')
    answer.textContent = item
    answersWrap.append(answer)
  })
  counter.textContent = n + 1
}

next.addEventListener('click', () => {
  answersWrap.innerHTML = ''
  currentTest++
  showQuestion(currentTest)
})
