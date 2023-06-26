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

let activeNavItem = navItem[WINDOW_NEWS];
activeNavItem.style.opacity = '1';

let activeWindowPage = windowPage[WINDOW_NEWS];
activeWindowPage.style.display = 'block';

for(let i = 0; i < navItem.length; i++){
    navItem[i].addEventListener('click', function(){

        if(activeNavItem == navItem[i]) return;

        navItem[i].style.opacity = 1;
        activeNavItem.style.opacity = '.4';
        activeNavItem = navItem[i];

        windowPage[i].style.display = 'block';
        activeWindowPage.style.display = 'none';
        activeWindowPage = windowPage[i];

        headerText.innerHTML = pageName[i];

    });
}

function createNews(json){

    const newsTitle = [] = document.querySelectorAll('.news-title');
    const newsImg = [] = document.querySelectorAll('.news-img');
    const imgLoader = [] = document.querySelectorAll('.img-loader');
    const newsRead = [] = document.querySelectorAll('.news-read');

    for(let i = 0; i < newsTitle.length; i++){
        newsTitle[i].innerHTML = json[i].title;
        newsImg[i].src = json[i].image;
        newsImg[i].addEventListener('load', function() {
            imgLoader[i].style.display = 'none';
            newsRead[i].style.transform = 'translate(0, -100%)';
        });
    }

    hideLoader();
}