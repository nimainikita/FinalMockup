import './styles/main.scss';
import './slider';
import './modal';
const links = document.querySelectorAll('.scroll-menu__item');

links[0].classList.add('selected');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(link => link.classList.remove('selected'));

    link.classList.add('selected');
  })
})
//Меню
const navLinks = document.querySelectorAll('.list__item');

navLinks[0].classList.add('selected-menu');
navLinks.forEach(navLink => {
  navLink.addEventListener('click', () => {
    navLinks.forEach(navLink => navLink.classList.remove('selected-menu'));

    navLink.classList.add('selected-menu');
  })
})

//Открытие бургер меню
const body = document.querySelector('body')
const openBurgerMenuBtn = document.querySelector('.burger');
const closeBurgerMenuBtn = document.querySelector('.close');
const burgerMenu = document.querySelector('.menu');
const layerBlur = document.querySelector('.layout');


let isBurgerOpen = false;
function closeOpenBurger(event){
  event.preventDefault();
  if(!isBurgerOpen){
    burgerMenu.style.left = '0';
    isBurgerOpen = !isBurgerOpen;
    layerBlur.style.display = 'block';
    body.style.overflow = 'hidden'
  }else if(isBurgerOpen){
    burgerMenu.style.left = '-100%';
    isBurgerOpen = !isBurgerOpen;
    layerBlur.style.display = 'none';
    body.style.overflow = 'auto'
  }


}
layerBlur.addEventListener('click', () => {
  if(window.innerWidth < 1440){
    burgerMenu.style.left = '-100%';
    isBurgerOpen = !isBurgerOpen;
    layerBlur.style.display = 'none';
    body.style.overflow = 'auto'
  }

});
openBurgerMenuBtn.addEventListener('click', closeOpenBurger);
closeBurgerMenuBtn.addEventListener('click', closeOpenBurger);