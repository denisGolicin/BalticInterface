const authPage = document.querySelector('.authorization');
const regPage = document.querySelector('.registration');

const authEnter = document.querySelector('#authEnter');
authEnter.addEventListener('click', function(){
    let countError = 0;
    if(!validLogin(authLogin, authLoginMessage, "button")){
        countError++;
    }
    if(!validPass(authPass, authPassMessage, "button")){
        countError++;
    }

    authLoginMessage.style.transform = 'translateY(0)';
    authPassMessage.style.transform = 'translateY(0)';

    if(countError > 0) return;
    // запрос на авторизацию, пока открываю интерфейс
    authPage.style.display = 'none';
});

const _regEnter = document.querySelector('#_regEnter');
_regEnter.addEventListener('click', function(){
    let countError = 0;
    if(!validLogin(regLogin, regLoginMessage, "button")){
        countError++;
    }
    if(!validPass(regPass, regPassMessage, "button")){
        countError++;
    }
    if(!validPhone(regPhone, regPhoneMessage, "button")){
        countError++;
    }
    if(!validMail(regMail, regMailMessage, "button")){
        countError++;
    }

    regLoginMessage.style.transform = 'translateY(0)';
    regPassMessage.style.transform = 'translateY(0)';
    regPhoneMessage.style.transform = 'translateY(0)';
    regMailMessage.style.transform = 'translateY(0)';

    if(countError > 0) return;
    // запрос на регистрацию, пока открываю интерфейс

});

const regEnter = document.querySelector('#regEnter');
regEnter.addEventListener('click', function(){
    regPage.style.display = 'block';
    authPage.style.display = 'none';
});

const _authEnter = document.querySelector('#_authEnter');
_authEnter.addEventListener('click', function(){
    regPage.style.display = 'none';
    authPage.style.display = 'block';
});

const re_passEnter = document.querySelector('#re_passEnter');
re_passEnter.addEventListener('click', function(){
    showLoader("feature in development", true, false);
});

window.addEventListener('load', function() {
    hideLoader();
    checkInternet = false;
});

const rulesEnter = document.querySelector('#rulesEnter');
const rulesWrapper = document.querySelector('.rules-wrapper');
const rulesBack = document.querySelector('#rulesBack');
rulesEnter.addEventListener('click', function(){
    rulesWrapper.style.display = 'block';
});
rulesBack.addEventListener('click', function(){
    rulesWrapper.style.display = 'none';
});