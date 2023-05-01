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
   