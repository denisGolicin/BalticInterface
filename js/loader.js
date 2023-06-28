const loader = document.querySelector('.loader-wrapper');
const loaderText = document.querySelector('#loaderText');
const loaderButton = document.querySelector('#loaderButton');
const loaderCurcle = document.querySelector('#loaderCurcle');
let getLoaderState = false;
let getLoaderError = false;
let checkInternet = false;

function showLoader(text, state, error, color = '#fff'){

    if(getLoaderError) return;
    if(color == "brown") color = "#da1414";
    loaderText.style.color = color;
    loaderCurcle.style.display = 'none';
    loaderButton.style.display = 'none';

    if(!getLoaderState){
        loader.style.display = 'block';
    }
    if(!state) loaderCurcle.style.display = 'block'; else loaderButton.style.display = 'block';

    loaderText.innerHTML = text;
    getLoaderState = true;
    getLoaderError = error;
}

function hideLoader(){
    if(getLoaderError) return;
    loader.style.display = 'none';
    loaderText.innerHTML = "Загрузка...";
    getLoaderState = false;
}

loaderButton.addEventListener('click', function(){
    getLoaderError = false;
    hideLoader();
});
showLoader("Загрузка приложения...", false, false);
checkInternet = true;
setTimeout(() => {
    if(checkInternet){
        showLoader("Медленное интернет соединение", false /* кнопка */, false /* ошибка */, "brown");
    }
}, 7000);

let queryString = window.location.search;
let params = new URLSearchParams(queryString);

let key = params.get('key');

if(key != 'iuCsPGD9NmVS1SBLvFzsD5g0'){
    showLoader("Отказано в доступе!", false, true, "brown"); 
}