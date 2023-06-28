//showLoader("Теси", true, true, "brown");
const pageName = [
    "Профиль",
    "Новости",
    "Турнирная таблица",
    "Прошедшие матчи"
]

const WINDOW_PROFILE = 0;
const WINDOW_NEWS = 1;

const navItem = [] = document.querySelectorAll('.navItem');
const windowPage = [] = document.querySelectorAll('.window');
const headerText = document.querySelector('#main-header-text');
const newsItem = [] = document.querySelectorAll('.news-item');

let activeNavItem = navItem[WINDOW_NEWS];
activeNavItem.style.opacity = '1';

let activeWindowPage = windowPage[WINDOW_NEWS];
activeWindowPage.style.display = 'block';
headerText.innerHTML = pageName[WINDOW_NEWS];

const headerButtonImg = document.querySelector('#headerButton');
const headerButton = document.querySelector('.header-button-main');
headerButton.addEventListener('click', function(){
    const headerReload = document.querySelector('.reload-button');
    //console.log('ok')
    if(headerReload){
        window.location.reload();
    } else {
        localStorage.setItem('token', null);
        window.location.reload();
    }
});
for(let i = 0; i < navItem.length; i++){
    navItem[i].addEventListener('click', function(){

        if(activeNavItem == navItem[i]) return;
        if(i == 0){
            if(headerButton.classList.contains("reload-button")){
                headerButton.classList.remove('reload-button');
            }
            headerButtonImg.src = 'src/svg/setting_gu56xo0zm6k3.svg';
        } else {
            if(!headerButton.classList.contains("reload-button")){
                headerButton.classList.add('reload-button');
            }
            headerButtonImg.src = 'src/svg/reload_b0mkt0syhw79.svg';
        }

        navItem[i].style.opacity = 1;
        activeNavItem.style.opacity = '.4';
        activeNavItem = navItem[i];

        windowPage[i].style.display = 'block';
        activeWindowPage.style.display = 'none';
        activeWindowPage = windowPage[i];

        headerText.innerHTML = pageName[i];

        sendTelegram("Навигация в " + pageName[i]);

    });
}
function getUserInfo(){
    const xhr = new XMLHttpRequest();
    sendRequest(xhr, `https://fc-baltika.ru/mp_api/get_user_date_mp.php?token=${localStorage.getItem('token')}`, "GET");
    showLoader("Вход в профиль", false, false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            const json = JSON.parse(xhr.responseText);
            if (json.hasOwnProperty("error")) {
                showLoader(json.error, true, true, "brown");
                
                return;
            } else if (json.hasOwnProperty("login")){
                const userLogin = document.querySelector('.profile-login');
                const userMail = document.querySelector('.profile-mail');
                const userPhone = document.querySelector('.profile-phone');
                const userBrithday = document.querySelector('.profile-date_birthday');

                userLogin.innerHTML = "Логин: " + json.login;
                userMail.innerHTML = "Почта: " +  json.email;
                userPhone.innerHTML = "Телефон: " +  json.phone;
                userBrithday.innerHTML = "День рождения: " +  json.date_birthday;

                createNews();
                return;
            }
            showLoader("Ошибка на сервере! 101", true, true, "brown");
            console.log(xhr.responseText);

        } else {
            showLoader("Ошибка на сервере", true, true, "brown");
        }
    };
}

function createNews(){

    const xhr = new XMLHttpRequest();
    sendRequest(xhr, "https://fc-baltika.ru/mp_api/news.php", "GET");
    showLoader("Узнаю новости", false, false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const newsTitle = [] = document.querySelectorAll('.news-title');
            const newsImg = [] = document.querySelectorAll('.news-img');
            const imgLoader = [] = document.querySelectorAll('.img-loader');
            const newsRead = [] = document.querySelectorAll('.news-read');
            const json = JSON.parse(xhr.responseText);

            for(let i = 0; i < newsItem.length; i++){
                newsItem[i].dataset.value = json[i].link;
                newsTitle[i].innerHTML = json[i].title;
                newsImg[i].src = json[i].image;
                newsImg[i].addEventListener('load', function() {
                    imgLoader[i].style.display = 'none';
                    newsRead[i].style.transform = 'translate(0, -100%)';
                });
                
            }

            createTable();
        } else {
            showLoader("Ошибка на сервере", true, true, "brown");
        }
    };
}
for(let i= 0; i < newsItem.length; i++){
    newsItem[i].addEventListener('click', function(){
        const xhr = new XMLHttpRequest();
        sendRequest(xhr, newsItem[i].dataset.value + "index.php", "GET");
        showLoader("Загружаю информацию", false, false);
        xhr.onerror = function() {
            showLoader("Поизшла ошибка CORS.", true, true, "brown");
        };
        xhr.onload = function() {
            if (xhr.status === 200) {
                const html = xhr.responseText;
                // let parser = new DOMParser();
                // let doc = parser.parseFromString(html, "text/html");

                console.log(html);

            } else {
                showLoader("Ошибка на сервере", true, true, "brown");
            }
        };
        sendTelegram("Нажал на кнопку новостей");
    });
}

function createTable(){
    const xhr = new XMLHttpRequest();
    sendRequest(xhr, "https://fc-baltika.ru/mp_api/table.php", "GET");
    showLoader("Формирую турнирную таблицу", false, false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const tableWrapper = document.querySelector('.table-wrapper');
            const json = JSON.parse(xhr.responseText);

            for(let index = 0; index < json.length; index++){
                let bgColor = '#fff';
                if(index % 2 === 0){
                    bgColor = '';
                }
                tableWrapper.insertAdjacentHTML('beforeend', 
                    `
                    <div class="${(json[index].team == "Балтика") ? "table-item bg-baltic-table" : "table-item"}" style = "background-color: ${(index % 2 === 0) ? ('#f4f7fb') : '#fff'};">
                        <div class="table-number table-item-child">
                            <p class = "${(json[index].team == "Балтика") ? "text-table-baltic" : "text-table"}">${index + 1}</p>
                        </div>
                        <div class="table-img table-item-child">
                            <div class="img-loader-table">
								<div class="curcle" style = "width: 30px; height: 30px;"></div>
							</div>
                            <img class = "table-img-load" src="${json[index].logo}" alt="">
                        </div>
                        <div class="table-name table-item-child">
                            <p class = "${(json[index].team == "Балтика") ? "text-table-baltic" : "text-table"}">${json[index].team}</p>
                        </div>
                        <div class="table-i table-item-child">
                            <p class = "${(json[index].team == "Балтика") ? "text-table-baltic" : "text-table"}">${json[index].i}</p>
                        </div>
                        <div class="table-o table-item-child">
                            <p class = "${(json[index].team == "Балтика") ? "text-table-baltic" : "text-table"}">${json[index].o}</p>
                        </div>
                    </div>
                    `
                );
            }
            const tableImg = [] = document.querySelectorAll('.table-img-load');
            const imgLoaderTable = [] = document.querySelectorAll('.img-loader-table')
            for(let i = 0; i < tableImg.length; i++){
                tableImg[i].addEventListener('load', function() {
                    imgLoaderTable[i].style.display = 'none';
                    tableImg[i].style.opacity = '1';
                });
            }

            createMatchs();
        } else {
            showLoader("Ошибка на сервере", true, true, "brown");
        }
    };
}

function createMatchs(){

    const xhr = new XMLHttpRequest();
    sendRequest(xhr, "https://fc-baltika.ru/mp_api/actual_match.php", "GET");
    showLoader("Проверяю матчи", false, false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const actualMatchsWrapper = document.querySelector('.actual-matchs-wrapper');
            const json = JSON.parse(xhr.responseText);

            for(let i = 0; i < json.length; i++){
                actualMatchsWrapper.insertAdjacentHTML('beforeend', 
                    `
                    <div class="actual-matchs-item">
                        <div class="actual-matchs-item-box">
                            <div class="actual-matchs-date">
                                <p class="actual-matchs-date-text">${json[i].date}</p>
                            </div>
                            <div class="actual-matchs-info">
                                <div class="actual-matchs-team-name">
                                    <p>${json[i].teams[0].name}</p>
                                </div>
                                <div class="actual-matchs-team-logo">
                                    <div class="img-loader-actual-matchs">
                                        <div class="curcle" style = "width: 30px; height: 30px;"></div>
                                    </div>
                                    <img class="actual-matchs-img-load" src="${"https://fc-baltika.ru" + json[i].teams[0].image}" alt="">
                                </div>

                                <div class="actual-matchs-team-count">
                                    <p>${json[i].teams[0].count}:${json[i].teams[1].count}</p>
                                </div>

                                <div class="actual-matchs-team-logo">
                                    <div class="img-loader-actual-matchs">
                                        <div class="curcle" style = "width: 30px; height: 30px;"></div>
                                    </div>
                                    <img class="actual-matchs-img-load" src="${"https://fc-baltika.ru" + json[i].teams[1].image}" alt="">
                                </div>
                                <div class="actual-matchs-team-name">
                                    <p>${json[i].teams[1].name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                );
            }

            const actualMatchsImg = [] = document.querySelectorAll('.actual-matchs-img-load');
            const imgLoaderactualMatchs = [] = document.querySelectorAll('.img-loader-actual-matchs')
            for(let i = 0; i < actualMatchsImg.length; i++){
                actualMatchsImg[i].addEventListener('load', function() {
                    imgLoaderactualMatchs[i].style.display = 'none';
                    actualMatchsImg[i].style.opacity = '1';
                });
            }

            authPage.style.display = 'none';
            mainPage.style.display = 'block';
            hideLoader();
        } else {
            showLoader("Ошибка на сервере", true, true, "brown");
        }
    };
}