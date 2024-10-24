document.addEventListener("DOMContentLoaded", function() {

    const guideButton = document.getElementById("guide");
    const guideElement = document.getElementById("guide-content");
    const closeButton = document.getElementById("close");

    guideButton.addEventListener("click", function() {

        if(guideElement.style.display === "none") {
            guideElement.style.display = "block";
        } else {
            guideElement.style.display = "block";
        }
    });

    closeButton.addEventListener("click", function() {
        guideElement.style.display = "none";
    });
})





/** 
 * Code below was written from a tutorial guide on https://www.youtube.com/watch?v=PBcqGxrr9g8&t=179s
 *  DOM Elements declaration */

const questionsElement = document.getElementById("questions");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const questions = [
    {
        question: "What mechanical tool is used for tigthening a 13-size bolt?",
        answers: [
            {text: "screw driver", correct: false},
            {text: "13-spanner", correct: true},
            {text: "hammer", correct: false}
        ]
    },
    {
        question: "A G-clamp is a tool used in the workshop to hold components when filing or cuting.",
        answers: [
            {text: "Yes", correct: true},
            {text: "No", correct: false},
            {text: "None", correct: false}
        ]  
    },
    {
        question: '<img id="img1" src="assets/images/tape.webp" alt="tape">',
        answers: [
             {text: "This is a tape measure", correct: true},
             {text: "This is a grip plier", correct: false},
             {text: "This is a spanner", correct: false}        
        ]
    },
    {
        question: "A Plier is a simple tool used to hold electrical cables when working on an electrical component",
        answers: [
            {text: "No", correct: false},
            {text: "None", correct: false},
            {text: "Yes", correct: true}
        ]
    },
    {
        question: "A hammer is a simple tool used in the workshop to make work easier and faster.",
        answers: [
            {text: "Yes", correct: true},
            {text: "No", correct: false},
            {text: "None", correct: false}
        ]
    },
    {
        question: '<img id="img1" src="assets/images/adjustable spanner.jpg" alt="adjustable spanner">',
        answers: [
             {text: "A set of screw drivers", correct: false},
             {text: "This is a set of adjustable spanners", correct: true},
             {text: "A set", correct: false}        
        ]
    },
    {
        question: "What simple mechanical tool is used for tigthening and loosening of a screw?",
        answers: [
            {text: "screw driver", correct: true},
            {text: "13-spanner", correct: false},
            {text: "hammer", correct: false}
        ]
    },
    {
        question: '<img id="img1" src="assets/images/hammer.webp" alt="hammer">',
        answers: [
             {text: "This is a set of pencils", correct: false},
             {text: "This is a set of hammers", correct: true},
             {text: "These are not tools", correct: false}        
        ]
    },
    {
        question: "Allen key is a special type of tool used in loosening and tigthening of allen bolts",
        answers: [
            {text: "Yes", correct: true},
            {text: "None", correct: false},
            {text: "No", correct: false}
        ] 
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    
    questionsElement.innerHTML = questionNo + "." + currentQuestion.question;
   
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answersElement.firstChild){
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersElement.children).forEach(button =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionsElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.style.display = "block";
    nextButton.innerHTML = "Play Again";
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }

}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();