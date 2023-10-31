import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Слайдер
function initSlider(){
  if(window.innerWidth < 768){
    console.log("ехехе")
    let swiper = new Swiper('.swiper', {
      slidesPerView: "auto",
      direction: "horizontal",
      loop:true,
      spaceBetween: 15,
      pagination:{
        el:".swiper-pagination"
      },
      breakpoints:{
        768:{
          enabled: true,
        }
      },
      modules: [Navigation, Pagination],
    })
  }
}


function swiperStyles(){
  const slider = document.querySelectorAll('.swiper-container');
  const swiperWrapper = document.querySelectorAll('.swiper-container-wrapper')
  if(window.innerWidth >= 768){
    
    slider.forEach(item => {
      if(item.classList.contains('swiper')){
        item.classList.remove('swiper');
      }
    });
    swiperWrapper.forEach(item => {
      if(item.classList.contains('swiper-wrapper')){
        item.classList.remove('swiper-wrapper')
      }  
    });
  }else if(window.innerWidth < 768){
    slider.forEach(item => {
      if(!item.classList.contains('swiper')){
        item.classList.add('swiper')
      }
    });
    swiperWrapper.forEach(item => {
      if(!item.classList.contains('swiper-wrapper')){
        item.classList.add('swiper-wrapper')
      }
    });
  }

}

//Отображаем нужное кол-во слайдов
const showMoreBrands = document.querySelector('.content__expand_brands');
const brands = document.querySelectorAll('.brand__item');
let isMoreBrandsVisible = false;
let numBrands = window.innerWidth < 1440 ? 6 : 8;

const showMoreText = document.querySelector('.content__expand_text');
const paras = document.querySelectorAll('.content-text__para');
let isMoreTextVisible = false;
let numParas = window.innerWidth < 768 ? 1 : window.innerWidth < 1440 ? 2 : 3;

const showMoreRepairs = document.querySelector('.content__expand_repairs');
const repairs = document.querySelectorAll('.repairs__item');
let isMoreRepairsVisible = false;
let numRepairs = window.innerWidth < 1440 ? 3 : 4;

function showItems(items, numItems){
  let toShowItems = numItems;

  items.forEach((item, idx) => {
    if(idx < toShowItems){
      item.style.display = 'flex';
    }else{
      item.style.display = 'none';
    }
  })
}

function toggleShowItems(items, numItems, showMoreBtn, isMoreVisible){
  isMoreVisible = !isMoreVisible;

  items.forEach((item, idx) => {
    if(idx >= numItems){
      item.style.display = isMoreVisible ? 'flex' : 'none';
    }
  })

  showMoreBtn.innerHTML = isMoreVisible ? "<img src='./assets/icons/icon-less.svg' alt=''> Скрыть" : "<img src='./assets/icons/icon-expand.svg' alt=''> Показать все";
}

function initItems(){
  //Текст
  showItems(paras, numParas)

  //Бренды
  showItems(brands, numBrands)

  //Ремонт
  showItems(repairs, numRepairs)

}


window.addEventListener('DOMContentLoaded', initSlider);
window.addEventListener('resize', swiperStyles);
window.addEventListener('DOMContentLoaded', initItems);
showMoreText.addEventListener('click', () => {
  toggleShowItems(paras, numParas, showMoreText, isMoreTextVisible);
  isMoreTextVisible = !isMoreTextVisible; 
})
showMoreBrands.addEventListener('click', () => {
  toggleShowItems(brands, numBrands, showMoreBrands, isMoreBrandsVisible)
  isMoreBrandsVisible = !isMoreBrandsVisible;
});
showMoreRepairs.addEventListener('click', () => {
  toggleShowItems(repairs, numRepairs, showMoreRepairs, isMoreRepairsVisible)
  isMoreRepairsVisible = !isMoreRepairsVisible;
});