const error = document.getElementById('error');
error.style.display = 'none';

function getCategory() {
    let myPromise = new Promise(function(resolve,reject)
    {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET","https://opentdb.com/api_category.php",true);
        xhttp.onload = function(){
            if(xhttp.status === 200){
                resolve(xhttp.response);
                } else {
                reject("Not found")
                }
        };
        xhttp.send();
    });
    myPromise
    .then(function(response){
        const data = JSON.parse(response);
        const categories = data.trivia_categories.sort((a,b)=> a.name.localeCompare(b.name)); 
        const categoryDropdown = document.getElementById('category');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            categoryDropdown.appendChild(option);
        });
    })
    .catch(error => console.error(error));
}
getCategory();
//
const categoryId = document.getElementById('category');
const difficultyId = document.getElementById('difficulty');

function getUrl(){
    const categoryValue = categoryId.value;
    const difficultyValue = difficultyId.value.toLowerCase();

    return `https://opentdb.com/api.php?amount=10&category=${categoryValue}&difficulty=${difficultyValue}&type=multiple`
    
}

function getQuiz(){
    const categoryValue = categoryId.value;
    if (categoryValue === "Select Your Category") {
        const error = document.getElementById('error');
        error.style.display = 'block';
        return;
    }
    const quizUrl = getUrl();
    let myPromise = new Promise(function(resolve,reject)
    {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET",quizUrl,true);
        xhttp.onload = function(){
            if(xhttp.status === 200){
                resolve(xhttp.response);
                } else {
                reject("Not found")
                }
        };
        xhttp.send();
    });
    myPromise
    .then(function(response){
        const data = JSON.parse(response);
        sessionStorage.setItem('quizData', JSON.stringify(data));
        window.location.href = "quiz.html";

    })
    .catch(error => console.error(error));
}