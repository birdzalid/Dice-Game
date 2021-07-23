const rollbn = document.querySelector('.btn--roll');
const holdbn = document.querySelector('.btn--hold');
const newgame = document.querySelector('.btn--new');
let dicedisplay = document.querySelector('.dice');
let playerone = document.querySelector('#score--0');
let playertwo = document.querySelector('#score--1');
let dicen = 0;

let activep = 0;
let scores = [0, 0];
let currentscore = 0;
let gamestate = true;
playerone.textContent = 0;
playertwo.textContent = 0;
let holdsound = new Audio('hold.wav');
let rollsound = new Audio('droll.mp3');
let winningsound = new Audio('winning.mp3');
let bgsound = new Audio('bg.mp3');

resete = () => {
  bgsound.currentTime = 0;
  bgsound.play();
  gamestate = true;
  dicedisplay.classList.add('hidden');
  activep = 0;
  scores = [0, 0];
  scores.forEach(function (val, i) {
    document.querySelector(`#score--${i}`).textContent = 0;
  });

  currentscore = 0;
  scores.forEach(function (val, i) {
    document.querySelector(`#current--${i}`).textContent = 0;
  });
  document
    .querySelector('.player--1')
    .classList.remove('player--active', 'player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
};

switchplayer = () => {
  document
    .querySelector(`.player--${activep}`)
    .classList.remove('player--active');
  activep = activep ? 0 : 1;
  document.querySelector(`.player--${activep}`).classList.add('player--active');
};

rolld = () => {
  if (gamestate) {
    console.log(`Gamestate is on.`);

    dicen = Math.trunc(Math.random() * 6) + 1;
    rollsound.play();
    dicedisplay.src = `dice-${dicen}.png`;
    dicedisplay.classList.remove('hidden');

    if (dicen != 1) {
      //   perform addition
      currentscore += dicen;
      document.getElementById(`current--${activep}`).innerHTML = currentscore;
    } else {
      //   switch player
      currentscore = 0;
      document.querySelector(`#current--${activep}`).textContent = 0;
      switchplayer();
    }
  }
};

holdit = () => {
  scores[activep] += currentscore;
  document.querySelector(`#score--${activep}`).textContent = scores[activep];
  holdsound.play();
  currentscore = 0;
  document.querySelector(`#current--${activep}`).textContent = 0;
  if (scores[activep] >= 20) {
    document
      .querySelector(`.player--${activep}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activep}`)
      .classList.add('player--winner', 'name');
    gamestate = false;
    winningsound.play();
  } else {
    // switch player
    switchplayer();
  }
};

rollbn.addEventListener('click', rolld);

holdbn.addEventListener('click', holdit);

newgame.addEventListener('click', resete);
