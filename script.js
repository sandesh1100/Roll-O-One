'use strict';

//Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.show-modal');
//btnOpenModal.textContent = 'Instructions!';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnEditNames = document.querySelector('.btn--editNames');
const btnMusic = document.querySelector('.btn--music');

let scores, currentScore, activePlayer, playing;

//Initialization
const init = function () {
  //Starting conditions
  scores = [0, 0];
  currentScore = 0; //need to be "let" cuz we have to update it.
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Reappearing of button editNames
  var x = document.querySelector('.btn--editNames');
  x.style.display = 'block';

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //Reassigning active player
  player0El.classList.toggle('player--active'); //Switching active player visually
  player1El.classList.toggle('player--active'); //Switching active player visually
};

// const disEdit = function () {
//   //Trying to remove editNames button
//   var x = document.querySelector('.btn--editNames');
//   x.style.display = 'none';
// };

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Remove editNames button
    var x = document.querySelector('.btn--editNames');
    x.style.display = 'none';
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1: if true, switch to next player
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //current0El.textContent = currentScore; //Change later cuz need to display current code at current player not always at Player 1
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

//Rules Modal Window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e.key); //Using this we can get any key clicked by user on keyboard

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Function to set the player name
btnEditNames.addEventListener('click', function editNames() {
  var player1 = prompt('Set PLAYER-1 name to ');
  var player2 = prompt('Set PLAYER-2 name to ');

  //Validations
  if (player1 === '' || player1 === ' ' || player1 === null) {
    alert('Please Enter Name for Player-1.');
    player1 = prompt('Set PLAYER-1 name to ');
  } else if (player2 === '' || player2 === ' ' || player1 === null) {
    alert('Please Enter Name for Player-2.');
    player2 = prompt('Set PLAYER-2 name to ');
  }

  document.getElementById('name--0').textContent = player1;
  document.getElementById('name--1').textContent = player2;

  var x = document.querySelector('.btn--editNames');
  x.style.display = 'none';
});

/*** Cookies ***/
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 10000);
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function checkCookie() {
  var user = getCookie('username');
  if (user != '') {
    alert('Welcome again ' + user + '! 🎉');
  } else {
    user = prompt('Welcome😄, Please enter your name:', '');
    if (user != '' && user != null) {
      setCookie('username', user, 30);
    }
  }
}

/*** Music ***/
var myAudio = document.getElementById('myAudio');
const togglePlay = function () {
  if (myAudio.paused) {
    myAudio.play();
    btnMusic.textContent = '🔊';
  } else {
    myAudio.pause();
    btnMusic.textContent = '🔈';
  }
};

window.onload = function () {
  myAudio.play();
};

var prev_handler = window.onload;
window.onload = function () {
  if (prev_handler) {
    prev_handler();
  }
  checkCookie();
};

btnMusic.addEventListener('click', togglePlay);
