const authPage = document.querySelector('.authorization');
const regPage = document.querySelector('.registration');
const mainPage = document.querySelector('.main');

sendTelegram("Зашёл в приложение");

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
        sendTelegram("Валидация на авторизации");
    };
    // запрос на авторизацию, пока открываю интерфейс
    // authPage.style.display = 'none';
    // mainPage.style.display = 'block';
    sendTelegram("Авторизация");

    // начать запрос с данных профиля
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("API_KEY", ""); // точка входа
    formData.append("TYPE", "LOGIN");
    formData.append("LOGIN", authLogin.value);
    formData.append("PASS", authPass.value);
    sendRequest(xhr, "https://litec-soft.ru/baltic/index.php", "POST", formData);
    showLoader("Авторизация...", false, false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // createNews(JSON.parse(xhr.responseText));
            const json = JSON.parse(xhr.responseText);
            if (json.hasOwnProperty("error")) {
                showLoader("Сервер временно недоступен.", false, false, "brown");
                setTimeout(() => {
                    showLoader("Вход в режиме гостя...", false, false,);
                }, 1000);
                setTimeout(() => {
                    createNews(JSON.parse(xhr.responseText));
                }, 1300);
                return;
            } else if (json.hasOwnProperty("token")){
                alert("Всё ок"); // function auth
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
        sendTelegram("Валидация на регистрации");
        return;
    };
    // запрос на регистрацию, пока открываю интерфейс
    // sendTelegram("Прошёл валидацию регистрации");

    const xhr = new XMLHttpRequest();
    sendRequest(xhr, `https://fc-baltika.ru/mp_api/reg_mp.php?

    login=${encodeURIComponent(regLogin.value)}
    &password=${encodeURIComponent(regPass.value)} 
    &phone=${encodeURIComponent(regPhone.value)}
    &email=${encodeURIComponent(regMail.value)}
    
    `,"GET");
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
                alert("Всё ок"); // function auth
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

window.addEventListener('load', function() {
    hideLoader();
    checkInternet = false;
});

const rulesEnter = document.querySelector('#rulesEnter');
const rulesWrapper = document.querySelector('.rules-wrapper');
const rulesBack = document.querySelector('#rulesBack');
rulesEnter.addEventListener('click', function(){
    rulesWrapper.style.display = 'block';
    sendTelegram("Открыл правила");
});
rulesBack.addEventListener('click', function(){
    rulesWrapper.style.display = 'none';
    sendTelegram("Закрыл правила");
});
