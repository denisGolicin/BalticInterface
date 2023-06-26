const authLogin = document.querySelector('#authLogin');
const authLoginMessage = document.querySelector('#authLoginMessage');
authLogin.addEventListener('input', function(event) {

    validLogin(event, authLoginMessage);
    
});
// ======================================================================
const authPass = document.querySelector('#authPass');
const authPassMessage = document.querySelector('#authPassMessage');
authPass.addEventListener('input', function(event) {

    validPass(event, authPassMessage);
    
});
// ======================================================================
const regPass = document.querySelector('#regPass');
const regPassMessage = document.querySelector('#regPassMessage');
regPass.addEventListener('input', function(event) {

    validPass(event, regPassMessage);
    
});
// ======================================================================
const regLogin = document.querySelector('#regLogin');
const regLoginMessage = document.querySelector('#regLoginMessage');
regLogin.addEventListener('input', function(event) {

    validLogin(event, regLoginMessage);
    
});
const regPhone = document.querySelector('#regPhone');
const regPhoneMessage = document.querySelector('#regPhoneMessage');
regPhone.addEventListener('input', function(event) {

    validPhone(event, regPhoneMessage);
    
});
const regMail = document.querySelector('#regMail');
const regMailMessage = document.querySelector('#regMailMessage');
regMail.addEventListener('input', function(event) {

    validMail(event, regMailMessage);
    
});

function validLogin(event, message, type){
    let value;
    if(type == 'button'){
        value = event.value;
    } else {
        value = event.target.value;
    }
    message.style.backgroundColor = "brown";
    if(value.length <= 0){
        message.innerHTML = "Заполните поле!";
        return false;
    } else if(!/^[a-zA-Z0-9]+$/.test(value)) {
        message.innerHTML = "Недопустимые символы!";
        return false;
    } else if (/^[0-9]+$/.test(value)){
        message.innerHTML = "Добавте символы: a-z | A-Z";
        return false;
    } else if (value.length < 8){
        message.innerHTML = "Слишком короткий логин!";
        return false;
    } else if (value.length > 16){
        message.innerHTML = "Слишком длинный логин!";
        return false;
    } 

    message.innerHTML = "Поле заполнено!";
    message.style.backgroundColor = "green";

    return true;
}

function validPass(event, message, type){
    let value;
    if(type == 'button'){
        value = event.value;
    } else {
        value = event.target.value;
    }
    message.style.backgroundColor = "brown";
    if(value.length <= 0){
        message.innerHTML = "Заполните поле!";
        return false;
    } else if(!/^[a-zA-Z0-9]+$/.test(value)) {
        message.innerHTML = "Недопустимые символы!";
        return false;
    } else if (/^[0-9]+$/.test(value)){
        message.innerHTML = "Добавте символы: a-z | A-Z";
        return false;
    } else if (value.length < 8){
        message.innerHTML = "Слишком короткий пароль!";
        return false;
    } else if (value.length > 16){
        message.innerHTML = "Слишком длинный пароль!";
        return false;
    } 

    message.innerHTML = "Поле заполнено!";
    message.style.backgroundColor = "green";

    return true;
}

function validPhone(event, message, type){
    
    let value;
    if(type == 'button'){
        value = event.value;
    } else {
        value = event.target.value;
    }
    message.style.backgroundColor = "brown";
    if(value.length <= 0){
        message.innerHTML = "Заполните поле!";
        return false;
    } else if(value[0] != '+' || value[1] == undefined || value[1] != '7') {
        message.innerHTML = "Формат: +79005001122";
        return false;
    } else if(!/^[+0-9]+$/.test(value)) {
        message.innerHTML = "Недопустимые символы!";
        return false;
    } else if (value.length < 12){
        message.innerHTML = "Короткий номер телефона!";
        return false;
    } else if (value.length > 12){
        message.innerHTML = "Длинный номер телефона!";
        return false;
    }
    message.innerHTML = "Поле заполнено!";
    message.style.backgroundColor = "green";

    return true;
}

function validMail(event, message, type){
    let value;
    if(type == 'button'){
        value = event.value;
    } else {
        value = event.target.value;
    }
    message.style.backgroundColor = "brown";
    if(value.length <= 0){
        message.innerHTML = "Заполните поле!";
        return false;
    } else if (value.length < 3){
        message.innerHTML = "Слишком короткий Email!";
        return false;
    } else if (value.length > 25){
        message.innerHTML = "Слишком длинный Email!";
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message.innerHTML = "Некорректный Email!";
        return false;
    }
    message.innerHTML = "Поле заполнено!";
    message.style.backgroundColor = "green";

    return true;
}