let tests = []
let currentTest = 0
let rez = 0
let totalQuestion = 0
let toDoAnswer = {
  toDoChoice: -1,
  toDoActive: false,
}

const bodyRez = document.querySelector('.body__rez')
const bodyTest = document.querySelector('.body__test')
const question = document.querySelector('.question')
const answersWrap = document.querySelector('.answers')
const next = document.querySelector('.next')
const counter = document.querySelector('.counter')
const rezult = document.querySelector('.rez')

bodyRez.style.display = 'none'

fetch('db.json')
  .then((data) => data.json())
  .then((data) => {
    tests = data.tests
    totalQuestion = tests.length
    showQuestion(currentTest)
  })

function showQuestion(n) {
  question.textContent = tests[n].question
  tests[n].answers.forEach((item, i) => {
    const answer = document.createElement('div')
    answer.classList.add('answer')
    answer.setAttribute('number', i)
    answer.textContent = item
    answersWrap.append(answer)
  })
  const answerArray = document.querySelectorAll('.answer')
  choice(answerArray)
  counter.textContent = n + 1
}

next.addEventListener('click', () => {
  if (+toDoAnswer.toDoChoice === tests[currentTest].trueAnswer) {
    rez++
  }

  if (currentTest === totalQuestion - 1) {
    bodyTest.style.display = 'none'
    bodyRez.style.display = 'block'
    rezult.textContent = countRez() + '%'
    return
  }

  if (toDoAnswer.toDoActive) {
    answersWrap.innerHTML = ''
    currentTest++
    showQuestion(currentTest)

    toDoAnswer = {
      toDoChoice: -1,
      toDoActive: false,
    }
  }
})

function choice(arr) {
  arr.forEach((item) => {
    item.addEventListener('click', (e) => {
      arr.forEach((el) => {
        el.style.backgroundColor = 'white'
      })
      if (toDoAnswer.toDoChoice === e.target.getAttribute('number')) {
        toDoAnswer = {
          toDoChoice: -1,
          toDoActive: false,
        }
      } else {
        e.target.style.backgroundColor = '#95D1CC'
        toDoAnswer.toDoChoice = e.target.getAttribute('number')
        toDoAnswer.toDoActive = true
      }
    })
  })
}

function countRez() {
  return Math.floor((rez / totalQuestion) * 100)
}
