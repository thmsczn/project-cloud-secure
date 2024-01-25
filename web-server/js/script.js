const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const forgotLink = document.querySelector('.forgot-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const wrapperProfil = document.querySelector('.wrapper-profil');
const btnProfil = document.querySelector('.btn-profil');

forgotLink.addEventListener('click', ()=> {
    logregBox.classList.add('active');
})

loginLink.addEventListener('click', ()=> {
    logregBox.classList.remove('active');
})

btnPopup.addEventListener('click', ()=> {
    logregBox.classList.add('active-popup');
})

forgotLink.addEventListener('click', ()=> {
    wrapperProfil.classList.add('active');
})

loginLink.addEventListener('click', ()=> {
    wrapperProfil.classList.remove('active');
})

btnPopup.addEventListener('click', ()=> {
    wrapperProfil.classList.add('active-popup');
})

iconClose.addEventListener('click', ()=> {
    wrapperProfil.classList.remove('active-popup');
})

function verifMail(){
    var myRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    if(!myRegex.test(this.value)){
      $('li#li-mail').css("background-color","rgb(245,62,84)");
      return false;
    }
    else{
      $('li#li-mail').css("background-color","green");
      return true;
    }
  }
