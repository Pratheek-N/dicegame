'use strict';
//? Selecting Element
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Ele = document.querySelector('#current--0');
const current1Ele = document.querySelector('#current--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.querySelector('#score--1');
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');

let scores, scoreP1, activePlayer, playing;

//? Starting Conditions

const init = () => {
  scores = [0, 0];
  scoreP1 = 0;
  activePlayer = 0;
  playing = true;

  current0Ele.textContent = 0;
  current1Ele.textContent = 0;
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;

  diceImg.classList.add('hidden');
  player0Ele.classList.remove('player--winner');
  player1Ele.classList.remove('player--winner');
  player0Ele.classList.add('player--active');
  player1Ele.classList.remove('player--active');
  document.querySelector(`#name--0`).textContent = `Player 1`;
  document.querySelector(`#name--1`).textContent = `Player 2`;
};

init();

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  scoreP1 = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0Ele.classList.toggle('player--active');

  player1Ele.classList.toggle('player--active');
};

//? Roll Button
btnRoll.addEventListener('click', function () {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    diceImg.src = `dice-${randomNumber}.png`;
    diceImg.classList.remove('hidden');

    if (randomNumber !== 1) {
      scoreP1 += randomNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = scoreP1;
    } else {
      switchPlayer();
    }
  }
});

//? Hold Button
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += scoreP1;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = `You Won!`;
    } else {
      switchPlayer();
    }
  }
});

//? New Button
btnNew.addEventListener('click', init);
