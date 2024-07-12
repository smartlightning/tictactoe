const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let oTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.textContent = ''; // Clear text content
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? 'o' : 'x';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
      setTimeout(() => endGame(false), 100);
  } else if (isDraw()) {
      setTimeout(() => endGame(true), 100);
  } else {
      swapTurns();
      setBoardHoverClass();
  }
}

function endGame(draw) {
    if (draw) {
        alert('Draw!');
    } else {
        alert(`${oTurn ? "O's" : "X's"} Wins!`);
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass.toUpperCase();
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('o');
    if (oTurn) {
        board.classList.add('o');
    } else {
        board.classList.add('x');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}