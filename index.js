const content = document.querySelectorAll('.content')
const bodyTest = document.querySelector('.body__test')
const bodyRez = document.querySelector('.body__rez')
const bodyStart = document.querySelector('.body__start')
const victory = document.querySelector('.victory')
const failur = document.querySelector('.failur')

const start = document.querySelector('.start')
const question = document.querySelector('.question')
const answersWrap = document.querySelector('.answers')
const next = document.querySelector('.next')
const counter = document.querySelector('.counter')
const rezult = document.querySelector('.rez')

const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

let tests = []
let currentTest = 0
let rez = 0
let totalQuestion = 0
let toDoAnswer = {
  toDoChoice: -1,
  toDoActive: false,
}
let whatSay = false
let totalTime = 0
let startTime = 0
let subTime = 0
let stopInterval = false

showContent(bodyStart)

start.addEventListener('click', () => {
  fetch('db.json')
    .then((data) => data.json())
    .then((data) => {
      tests = data.tests
      totalQuestion = tests.length
      startTime = new Date()
      if (getData()) {
        let { currentFromLoc, rezultFromLoc } = getData()
        currentTest = currentFromLoc
        rez = rezultFromLoc
      }
      startTimer()
      showContent(bodyTest)
      showQuestion(currentTest)
    })
})

function showContent(con) {
  content.forEach((item) => {
    item.style.display = 'none'
  })
  con.style.display = 'block'
}

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
    whatSay = true
  }

  if (currentTest === totalQuestion - 1) {
    showContent(bodyRez)
    stopInterval = true
    rezult.textContent = countRez() + '%'
    localStorage.clear()
    return
  }

  if (toDoAnswer.toDoActive) {
    momentRezult(whatSay)
    answersWrap.innerHTML = ''
    currentTest++
    showQuestion(currentTest)

    sendData(currentTest, rez)

    toDoAnswer = {
      toDoChoice: -1,
      toDoActive: false,
    }
    whatSay = false
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

function momentRezult(rez) {
  if (rez) {
    showContent(victory)
  } else {
    showContent(failur)
  }
  setTimeout(() => {
    showContent(bodyTest)
  }, 750)
}

function sendData(current, rez) {
  let obj = { currentFromLoc: current, rezultFromLoc: rez }
  obj = JSON.stringify(obj)
  localStorage.setItem('data', obj)
}
function getData() {
  let obj = localStorage.getItem('data')
  obj = JSON.parse(obj)
  return obj
}
//timer//////////

function startTimer() {
  const timerId = setInterval(() => {
    if (stopInterval) {
      clearInterval(timerId)
    }
    subTime = Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
    console.log(subTime)
    minutes.textContent = getZero(Math.floor(subTime / 60))
    seconds.textContent = getZero(subTime % 60)
  }, 1000)
}

function getZero(num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return num
  }
}
