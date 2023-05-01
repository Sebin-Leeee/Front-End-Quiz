const quizData = JSON.parse(sessionStorage.getItem('quizData'));
const container = document.getElementById('container');
const questionText = document.getElementById('questionText')
const answersList = document.getElementById('answerList');
const nextButton = document.getElementById('nextButton');

let currentQ = 0;
let selectedAnswer = [];
let score = [];
let wrongAnswer = [];


function getQuestion(){
    questionText.innerText = quizData.results[currentQ].question;
    answersList.innerHTML = '';
    nextButton.disabled = true;

    const answers = [...quizData.results[currentQ].incorrect_answers,quizData.results[currentQ].correct_answer];
    
    for (let i = answers.length-1; i > 0; i-- ){
        let j = Math.floor(Math.random() * (i+1));
        let temp =answers[i];
        answers[i] = answers[j];
        answers[j] = temp;
    }
    answers.forEach(answer => {
        const answerItem = document.createElement('button');
        answerItem.innerText = answer;
        answersList.appendChild(answerItem);
        answerItem.onclick = () => {
            selectedAnswer[currentQ] = answer;
            console.log(selectedAnswer);
            nextButton.disabled = false;
        }
    });
    container.appendChild(answersList);

}

getQuestion()
//
function checkCorrect(){
    const selected = selectedAnswer[currentQ];
    const correct = quizData.results[currentQ].correct_answer;
    
    if(selected === correct){
        score[currentQ] = 1;
    } else if(selected !== correct){
        wrongAnswer[currentQ] = selected;
        score[currentQ] = 0;
    }
}
//
function nextBtn(){
    checkCorrect();
    currentQ++;
     if (currentQ < quizData.results.length){
        answersList.remove();
        getQuestion();
        console.log("CurrentQ =" + currentQ);
        console.log("Score =" +score);
    }  else {
        window.location.href = "result.html"
    }
}

function backBtn(){
     if (currentQ >0 ){
        checkCorrect();
        score[currentQ] = undefined;
        currentQ--;
        answersList.remove();
        getQuestion();
        console.log("CurrentQ =" + currentQ);
        console.log("Score =" +score);
      
    } else {
        
         window.location.href = "index.html";
    }
}
//