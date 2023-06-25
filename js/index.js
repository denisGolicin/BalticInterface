const authPage = document.querySelector('.authorization');
const regPage = document.querySelector('.registration');

const authEnter = document.querySelector('#authEnter');
authEnter.addEventListener('click', function(){
    alert('test');
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