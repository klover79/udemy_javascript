'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//smooth scrolling
btnScrollTo.addEventListener('click' , function(e){
  section1.scrollIntoView({behavior:'smooth'});
})


////////////////////////////////////
//          Navigation
////////////////////////////////////
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//     console.log(id);
    
//   })
// })

//1. Add eventListener to common parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault()
  // Matching Strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  };

});

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
  

// const h1 = document.querySelector('h1')

// const alertH1 = function(e){
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // rgb(255,255,255)
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   // e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
 
// })

///////////////////////////////////////////
//Tabbed component
///////////////////////////////////////////
const tabContainer = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t=>t.addEventListener('click', () => console.log('TAB')));
tabContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  //Guard Clause
  if(!clicked) return;
  // Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active')
  //Activate Content Area
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})
