'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.getElementById('#.btn--scroll-to')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Event listener for modal window
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const sections = document.querySelectorAll('.section');
console.log(sections);

const header = document.querySelector('.header');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// Creating Element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We used cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got It!</button> ';
header.prepend(message);
header.append(message);
header.before(message);

// Delete Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

  // styles 
  message.style.backgroundColor = '#37383d'
  message.style.width = '120%'
  console.log(getComputedStyle(message).color);
  console.log(getComputedStyle(message).height);
  
//smooth scrolling
btnScrollTo.addEventListener('click' , function(e){
  alert('BtnScroll');
})

const h1 = document.querySelector('h1')

const alertH1 = function(e){
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);