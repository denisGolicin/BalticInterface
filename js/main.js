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
        navItem[i].style.opacity = 1;
        activeNavItem.style.opacity = '.4';
        activeNavItem = navItem[i];

        windowPage[i].style.display = 'block';
        activeWindowPage.style.display = 'none';
        activeWindowPage = windowPage[i];

        headerText.innerHTML = pageName[i];

    });
}