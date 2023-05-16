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
    questionText.innerText ="Q"+ [currentQ+1]+ ": " + quizData.results[currentQ].question;
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
function checkCorrect() {
    const selected = selectedAnswer[currentQ];
    const correct = quizData.results[currentQ].correct_answer;

    if(selected === correct) {
        score[currentQ] = 1;
    } else if(selected !== correct) {
        wrongAnswer[currentQ] = selected;
        score[currentQ] = 0;
    }
    // saves each answer separately :)
    sessionStorage.setItem(`selectedAnswer${currentQ}`, JSON.stringify(selected));
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
    } else {
        sessionStorage.setItem('score', JSON.stringify(score));
        window.location.href = "result.html";
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
        
         window.location.href = "quizzes.html";
    }
}
/*Timer*/

const timer = document.getElementById('timer');
let total_seconds = 60*5;
let c_minutes = parseInt(total_seconds/60);
let c_seconds = parseInt(total_seconds%60).toString().padStart(2, "0");

function checkTime(){
    timer.innerHTML = c_minutes+":"+c_seconds;
    if(total_seconds<=0){
        setTimeout(() => {
            window.alert("Sorry, times up :(");
            window.location.href = "timeOut.html";
        }, 1000);
    } else {
        total_seconds = total_seconds-1;
        c_minutes = parseInt(total_seconds/60);
        c_seconds = parseInt(total_seconds%60).toString().padStart(2, "0");
        setTimeout(checkTime, 1000);
    }
}

checkTime();