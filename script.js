'use strict';

//Selecting Element Id
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.querySelector('#score--1');
const current0Ele = document.querySelector('#current--0');
const current1Ele = document.querySelector('#current--1');

//Selecting classes
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');

//Starting conditionns
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;

  diceEle.classList.add('hidden');
  player0Ele.classList.add('player--active');
  player1Ele.classList.remove('player--active');
  player0Ele.classList.remove('player--winner');
  player1Ele.classList.remove('player--winner');
};
init();

// Switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Ele.classList.toggle('player--active');
  player1Ele.classList.toggle('player--active');
};

//Rolling dice functionally
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2, Display dice
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${dice}.png`;
    // 3. Check if dice 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//Holding button functionally
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check >=100
    if (scores[activePlayer] <= 20) {
      // Swtich player
      switchPlayer();
    } else {
      // Active player win
      playing = false;
      diceEle.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }
});

btnNew.addEventListener('click', init);
