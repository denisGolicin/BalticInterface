const authPage = document.querySelector('.authorization');
const regPage = document.querySelector('.registration');
const mainPage = document.querySelector('.main');
const verPage = document.querySelector('.verification');
sendTelegram("Зашёл в приложение");
window.addEventListener('load', function() {
    checkInternet = false;
    //alert(localStorage.getItem('token'));
    if(localStorage.getItem('token') == null){
        hideLoader();
        return;
    }
    if(localStorage.getItem('token').length > 10){
        getUserInfo();
    } else {
        hideLoader();
    }

    //hideLoader();
});
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

    if(countError > 0) {
        return;
    };
    // запрос на авторизацию, пока открываю интерфейс
    // authPage.style.display = 'none';
    // mainPage.style.display = 'block';

    // начать запрос с данных профиля
    const xhr = new XMLHttpRequest();
    // const formData = new FormData();
    // formData.append("API_KEY", ""); // точка входа
    // formData.append("TYPE", "LOGIN");
    // formData.append("LOGIN", authLogin.value);
    // formData.append("PASS", authPass.value);
    //sendRequest(xhr, "https://litec-soft.ru/baltic/index.php", "POST", formData);
    sendRequest(xhr, `https://fc-baltika.ru/mp_api/auth_mp.php?login=${authLogin.value}&password=${authPass.value}`, "GET");
    showLoader("Авторизация...", false, false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // createNews(JSON.parse(xhr.responseText));
            const json = JSON.parse(xhr.responseText);
            if (json.hasOwnProperty("error")) {
                showLoader(json.error, true, false, "brown");
                // setTimeout(() => {
                //     showLoader("Вход в режиме гостя...", false, false);
                // }, 1000);
                // setTimeout(() => {
                //     createNews(JSON.parse(xhr.responseText));
                // }, 1300);
                return;
            } else if (json.hasOwnProperty("token")){
                //alert("Всё ок"); // function auth
                localStorage.setItem('token', json.token);
                getUserInfo();
                return;
            }
            showLoader("Ошибка на сервере! 101", true, true, "brown");
            return;
            
        } else {
            showLoader("Ошибка на сервере! 400", true, true, "brown");
        }
        
    };
    
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

    if(countError > 0) {
        return;
    };
    // запрос на регистрацию, пока открываю интерфейс
    // sendTelegram("Прошёл валидацию регистрации");

    const xhr = new XMLHttpRequest();
    sendRequest(xhr, `https://fc-baltika.ru/mp_api/reg_mp.php?login=${regLogin.value}&password=${regPass.value}&phone=${regPhone.value}&email=${regMail.value}`, "GET");
    showLoader("Регистрация аккаунта...", false, false);

    console.log(regLogin.value);
    console.log(regPass.value);
    console.log(regPhone.value);
    console.log(regMail.value);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // createNews(JSON.parse(xhr.responseText));
            const json = JSON.parse(xhr.responseText);
            if (json.hasOwnProperty("error")) {
                showLoader(json.error, true, true, "brown");
                
                return;
            } else if (json.hasOwnProperty("token")){
                if(localStorage.getItem('token') == null){
                    
                } else { localStorage.setItem('token', json.token); }
                localStorage.setItem('token', json.token);

                showLoader("Аккаунт успешно зарегистирован!", false, false);
                setTimeout(function(){
                    // getUserInfo();

                    authPage.style.display = 'none';
                    regPage.style.display = 'none';
                    verPage.style.display = 'block';
                    //mainPage.style.display = 'none';
                    hideLoader();
                }, 3000);
                return;
            }
            showLoader("Ошибка на сервере! 101", true, true, "brown");
            console.log(xhr.responseText);
            return;
            
        } else {
            showLoader("Ошибка на сервере! 400", true, true, "brown");
        }
        
    };

});
const skipEnter = document.querySelector('.skip-verification-button');
skipEnter.addEventListener('click', function(){
    getUserInfo();
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
    sendTelegram("Нажал на восстановление пароля");
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

function getCookie(name){
    const cookies = document.cookie.split("; "); 
    for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("="); 
        if (cookie[0] === name) {
            return cookie[1];
        }
    }

    return 'null';
}

// document.cookie = `formSubmitted=1; expires=${expirationDate.toUTCString()}; path=/`;
// document.cookie = `formDogName=${dogName.value}; expires=${expirationDate.toUTCString()}; path=/`;
// document.cookie = `formUserName=${nameUser.value}; expires=${expirationDate.toUTCString()}; path=/`;
// document.cookie = `formPhone=${phone.value}; expires=${expirationDate.toUTCString()}; path=/`;
// document.cookie = `formInfo=${info.value}; expires=${expirationDate.toUTCString()}; path=/`;

// if (document.cookie.indexOf('formSubmitted=1') !== -1) {
//     nameUser.value = getCookie('formUserName');
//     dogName.value = getCookie('formDogName');
//     phone.value = getCookie('formPhone');
//     info.value = getCookie('formInfo');

//     infoTest.innerHTML = "Ваши данные на конкурс";
//     photoButton.style.display = 'none';

//     const savedImage = localStorage.getItem('savedImage');
//     if (savedImage) {
//         imgCookie.src = savedImage;
//     }
