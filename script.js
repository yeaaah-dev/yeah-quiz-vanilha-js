const startGameButton = document.querySelector(".button-start-quiz") 
const questionsContainer = document.querySelector(".question-container")
const answersContainer = document.querySelector(".answers")
const stopButton = document.querySelector(".button-stop")
const confirmButton = document.querySelector(".button-two")
const questionText = document.querySelector(".question")

let currentQuestionsIndex = 0

startGameButton.addEventListener("click",startGame)
stopButton.addEventListener("click",startGame)

function startGame() {
    startGameButton.classList.add("hide")
    questionsContainer.classList.remove("hide")
    answersContainer.classList.remove("hide")
    stopButton.classList.remove("hide")
    confirmButton.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    while(answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild)
    }

    questionText.textContent = questions[currentQuestionsIndex].question
    questions[currentQuestionsIndex].answers.forEach(answer =>{
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("content_button-one","answer")

        const imageSpan = document.createElement("span")
        imageSpan.classList.add("image")

        const imageCircle = document.createElement("img")
        imageCircle.src = "/assets/images/blue-circle.svg"
        imageCircle.alt = "circulo azul"

        const textAnswerSpan = document.createElement("span")
        textAnswerSpan.classList.add("text")
        textAnswerSpan.textContent = answer.text 

        imageSpan.appendChild(imageCircle)

        newAnswer.appendChild(imageSpan)
        newAnswer.appendChild(textAnswerSpan)

        answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function selectAnswer(event) {
    const answerClicked = event.target
    const isSelect = answerClicked.classList.contains("selectAnswers")
    
    document.querySelectorAll(".answer").forEach(button =>{
       button.classList.remove("selectAnswers")

        button.classList.remove("otherAnswers")

       const blueButtonCircle = button.querySelector(".image")
       if(blueButtonCircle){
        const newImageCircle = blueButtonCircle.querySelector("img")
        newImageCircle.src = "/assets/images/blue-circle.svg"
        newImageCircle.alt = "circulo azul"
       }

       answerClicked.classList.add("selectAnswers")

       const selectButtonCircleFull = answerClicked.querySelector(".image")
       if(selectButtonCircleFull){
        const newImageCircleFull = selectButtonCircleFull.querySelector("img")
        newImageCircleFull.src = "/assets/images/blue-button.svg"
        newImageCircleFull.alt = "circulo azul cheio"
       }

       const selectButtonCircleBlack = button.classList.contains("selectAnswers")
       if(!selectButtonCircleBlack){
        button.classList.add("otherAnswers")
        const newImageCircleBlack = blueButtonCircle.querySelector("img")
        newImageCircleBlack.src = "/assets/images/black-circle.svg"
        newImageCircleBlack.alt = "circulo preto vazio"
       }
    })

    if(!isSelect){
        confirmButton.classList.add("confirmAnswer")
    } else {
        confirmButton.classList.remove("confirmAnswer")
    }

    confirmButton.addEventListener("click", () => {
        validAnswer()
    })
}

function validAnswer() {
    const correctAnswer = questions[currentQuestionsIndex].answers.findIndex(answer => answer.correct)
    document.querySelectorAll(".answer").forEach((button, index) =>{
        const checkedButtonCircleWhite = button.querySelector(".image")
        if(index === correctAnswer){
            button.classList.add("correct")
            
            if(checkedButtonCircleWhite){
             const imageCircleWhiteChecked = checkedButtonCircleWhite.querySelector("img")
             imageCircleWhiteChecked.src = "/assets/images/white-circle.svg"
             imageCircleWhiteChecked.alt = "circulo branco vazio"
            }
        }
        if(index === correctAnswer && button.classList.contains("selectAnswers")){
            button.classList.add("correct")

            if(checkedButtonCircleWhite){
                const imageCircleWhiteChecked = checkedButtonCircleWhite.querySelector("img")
                imageCircleWhiteChecked.src = "/assets/images/white-circle.svg"
                imageCircleWhiteChecked.alt = "circulo branco vazio"
               }
        }   
        if(index !== correctAnswer && button.classList.contains("selectAnswers")){
            button.classList.add("incorrect")

            const selectButtonCircleWhite = button.querySelector(".image")
            if(selectButtonCircleWhite){
             const newImageCircleWhite = selectButtonCircleWhite.querySelector("img")
             newImageCircleWhite.src = "/assets/images/white-circle-no.svg"
             newImageCircleWhite.alt = "circulo branco vazio"
            }
        }
        button.classList.remove("selectAnswer")
        confirmButton.classList.remove("confirmAnswer")

    })
    document.querySelectorAll(".answer").forEach (button =>{
        button.setAttribute("disabled", true)
    })
}

function stopQuiz() {
    startGame()
}

const questions = [
    {
        question: "Dentro de qual elemento HTML colocamos o JavaScript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<scripting>", correct: false }
        ]
    },
    {
        question: "Onde é o lugar correto para inserir JavaScript?",
        answers: [
          { text: "Tanto no <head> quanto no <body> está correto", correct: true },
          { text: "No <body>", correct: false },
          { text: "No <head>", correct: false },
          { text: "Em outro lugar", correct: false }
        ]
    },
    {
        question: 'Qual é a sintaxe correta para se referir a um script externo chamado "xxx.js"',
        answers: [
          { text: '<script src="xxx.js">', correct: true },
          { text: '<script href="xxx.js">', correct: false },
          { text: '<script name="xxx.js">', correct: false },
          { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: 'Como podemos criar uma função no JavaScript?',
        answers: [
          { text: 'function:myFunction()', correct: false },
          { text: 'function myFunction()', correct: true },
          { text: 'function = myFunction()', correct: false },
          { text: 'Nenhum desses códigos criaria uma função', correct: false }
        ]
    },
]