const authEnter = document.querySelector('#authEnter');
authEnter.addEventListener('click', function(){
    alert('test');
});

const regEnter = document.querySelector('#regEnter');
regEnter.addEventListener('click', function(){
    alert('test');
});

const re_passEnter = document.querySelector('#re_passEnter');
re_passEnter.addEventListener('click', function(){
    showLoader("feature in development", true, false);
});

window.addEventListener('load', function() {
    hideLoader();
    checkInternet = false;
});