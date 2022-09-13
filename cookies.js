let modalContent = "<div class='contents'><h4>This Site Uses Cookies</h4><p>This site uses cookies. Some of them are essentials while other help us track everything you do and sell it to a third party.</p><button class='btn btn-link btn-sm'>Decline</button><button class='btn btn-primary btn-sm'>Accept</button></div>"
let content = document.querySelector('#dynamicContent');
let sides = ['right', 'left', 'top', 'bottom']
let heights = {
  left : 0,
  right: 0,
  top: 0,
  bottom: 0
}
let zCounter = 1;
let interval = 900;
let continueCreating = true;
let currentTimeout = 0;

function createCookieDisclaimer(side = sample(sides)){
  let newDiv = document.createElement('div');
  newDiv.innerHTML = modalContent;
  newDiv.classList.add('custom-modal', side);
  
  newDiv.style["z-index"] = zCounter;
  newDiv.style[side] = heights[side] + 'px';
  zCounter+=1;
  heights[side] += randomIntRange(25, 75);
  content.appendChild(newDiv);
}

createCookieDisclaimer('bottom');


function timer(){
  createCookieDisclaimer();
  if(continueCreating) currentTimeout = window.setTimeout(timer, interval)
}

function endTheMadness(){
  let modals = document.getElementsByClassName('custom-modal');
  for(let i=0;i<modals.length;i++){
    modals[i].classList.add('stop');
  }
  continueCreating = false;
  window.clearTimeout(currentTimeout);
}

document.querySelector('#stop').addEventListener('click', function(){
  interval = 200;
  window.setTimeout(endTheMadness, 3800);
  createCookieDisclaimer('bottom');
  createCookieDisclaimer('top');
  createCookieDisclaimer('left');
  createCookieDisclaimer('right');
});

window.setTimeout(timer, interval)

document.addEventListener('click', function(event){
  if(event.target.nodeName == 'BUTTON') event.target.closest('.custom-modal').remove();
})

/* Utility Methods */

function sample(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomIntRange(min, max) {
  return Math.floor(Math.random() * Math.floor(max-min)) + min;
}