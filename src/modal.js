const feedbackBtn = document.querySelectorAll(".feedback-btn");
const callBtn = document.querySelectorAll(".call-btn");
const closeBtnWindow = document.querySelector(".btn-window");

const body = document.querySelector('body')

const modalWindow = document.querySelector(".modal-window");
const windowsTitle = document.querySelector(".window__title");
const callForm = document.querySelectorAll(".call-form");
const feedbackForms = document.querySelectorAll(".feedback-form");

const layerBlur = document.querySelector('.layout');

function openModal(){
  body.style.overflowY = 'hidden';
  layerBlur.style.display = 'block';
  modalWindow.style.right = '0';
}
function closeModal(){
  modalWindow.style.right = "-100%";
  body.style.overflow = "auto";
  layerBlur.style.display = 'none';
}


feedbackBtn.forEach((btn) => {
  btn.addEventListener('click', function(event){
    event.preventDefault();
    openModal();
    windowsTitle.innerHTML = "Обратная связь";

    callForm.forEach(elem => {
      elem.style.display = 'none'
    })
    feedbackForms.forEach(elem => {
      elem.style.display = 'block'
    })
  })
})

callBtn.forEach((btn) => {
  btn.addEventListener('click', function(event){
    event.preventDefault();

    openModal();
    windowsTitle.innerHTML = "Заказать звонок";

    callForm.forEach(elem => {
      elem.style.display = 'block'
    })
    feedbackForms.forEach(elem => {
      elem.style.display = 'none'
    })
  })
})

closeBtnWindow.addEventListener("click", closeModal);
layerBlur.addEventListener('click', closeModal);