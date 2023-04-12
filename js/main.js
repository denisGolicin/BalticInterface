const pageAuth = document.querySelector('.wrapper-auth');
const pageRegister = document.querySelector('.wrapper-register');
const buttonRegister = document.querySelector('#button-register');
const buttonLogin = document.querySelector('#button-login');
const enterClient = document.querySelector('#enter-client');
const pageStartNews = document.querySelector('.wrapper-main');
const loader = document.querySelector('.loader-page');
const loginEnt = document.querySelector('#login-ent');
const nat = document.querySelector('.natification-wrapper');
nat.style.display = 'none';
const buyToken = document.querySelector('#buy-token');
let pages = [];
pages = document.querySelectorAll('.main-page');
let navItem = [];
navItem = document.querySelectorAll('.nav-item');
pageid = 3;
let showLoaderBool = false;
navItem[pageid].style.backgroundColor = '#004753';
let pageMove = false;

const natWrapper = document.querySelector('.natification-wrapper');
natWrapper.addEventListener('click', function(){
    this.style.display = 'none';
});

let buttonMenu = [];
buttonMenu = document.querySelectorAll('.button-menu');

for(let i = 0; i < buttonMenu.length; i++){

    buttonMenu[i].addEventListener('click', function(){
        nat.style.display = 'flex';
    });
}

for(let i = 0; i < navItem.length; i++){

    navItem[i].addEventListener('click', function(){
        // if(!showLoader(3000)) return;
        // pages[i].style.display = "flex";
        // pages[pageid].style.display = "none";
        if(i === pageid || pageMove) return;
        setTimeout(() => {
            pages[i].style.transform = "scaleY(1)";
            pages[i].style.transform = "scaleY(1)";
            pageMove = false;
            
        }, 300)

        pages[pageid].style.transform = "scaleY(0)";
        pages[pageid].style.transform = "scaleY(0)";
        pagaMove = true;
        

        navItem[i].style.backgroundColor = '#004753';
        navItem[pageid].style.backgroundColor = '#00465300';

        pageid = i;
    });

    if(i === 3) continue;
    pages[i].style.transform = "scaleY(0)";
    //pages[i].style.transform = "0";
    console.log(i);
}

buyToken.addEventListener('click', function(){
    nat.style.display = 'flex';
});

buttonRegister.addEventListener('click', function(){
    pageAuth.style.transform = 'translateY(-100%)';
    pageRegister.style.transform = 'translateY(-100%)';


});

buttonLogin.addEventListener('click', function(){
    pageAuth.style.transform = 'translateY(0)';
    pageRegister.style.transform = 'translateY(0)';


});

enterClient.addEventListener('click', function(){
    
    showLoader();

});

loginEnt.addEventListener('click', function(){
    
    pageAuth.style.display = 'flex';
    pageRegister.style.display = 'flex';
    pageStartNews.style.display = 'none';
    nat.style.display = 'none';

});

function showLoader(time = 100){
    if(showLoaderBool) return false;
    showLoaderBool = true;
    loader.style.display = 'block';

    setTimeout(() => {
        pageAuth.style.display = 'none';
        pageRegister.style.display = 'none';
        pageStartNews.style.display = 'flex';
        loader.style.display = 'none';
        showLoaderBool = false;
    }, time);

    return true;
}