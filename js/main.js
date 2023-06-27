const pageName = [
    "Профиль",
    "Новости",
    "Турнирная таблица",
    "Прошедшие матчи"
]

const WINDOW_NEWS = 1;
const navItem = [] = document.querySelectorAll('.navItem');
const windowPage = [] = document.querySelectorAll('.window');
const headerText = document.querySelector('#main-header-text');
const newsItem = [] = document.querySelectorAll('.news-item');

let activeNavItem = navItem[WINDOW_NEWS];
activeNavItem.style.opacity = '1';

let activeWindowPage = windowPage[WINDOW_NEWS];
activeWindowPage.style.display = 'block';

const headerButtonImg = document.querySelector('#headerButton');
const headerButton = document.querySelector('.header-button-main');
headerButton.addEventListener('click', function(){
    const headerReload = document.querySelector('.reload-button');
    console.log('ok')
    if(headerReload){
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
            headerButtonImg.src = 'src/svg/edit_83ygegrqz3rl.svg';
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

            authPage.style.display = 'none';
            mainPage.style.display = 'block';
            hideLoader();
        } else {
            showLoader("Ошибка на сервере", true, true, "brown");
        }
    };
}