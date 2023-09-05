//collecting info
let gameBoard = document.getElementById("gameboard");
let infoDisplay = document.getElementById("info");
let startCells = ["", "", "", "", "", "", "", "", ""];
let key = 0;
let go = "circle";

infoDisplay.textContent = "Cross Goes First";

function createBoard() {
  startCells.forEach((cell, index) => {
    let cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = `square${index}`;
    cellElement.addEventListener("click", addGo);
    gameBoard.appendChild(cellElement);
  });
}

createBoard();

function addGo(e) {
  let goDisplay = document.createElement("div");
  e.target.append(goDisplay);
  if (key === 0) {
    go = "cross";
    key = 1;
    infoDisplay.textContent = `Now It Is Circle's' turn`;
  } else if (key === 1) {
    go = "circle";
    key = 0;
    infoDisplay.textContent = `Now It Is Cross' turn`;
  }
  goDisplay.classList.add(go);
  //to be only added once
  e.target.removeEventListener("click", addGo);
  checkScore();
  //another way :
  // go = go === 'circle' ? "cross" : 'circle'
}

function checkScore() {
  let allSquares = document.querySelectorAll(".square");
  let winningCombos = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vrtical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagno
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    //every(el,ind,arr) returns boolean of a test passed by a function
    let circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.innerHTML = '<span style="color: blue;">Circle Wins!</span>';
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    let crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.innerHTML = '<span style="color: red;">Cross Wins!</span>';
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}

document.getElementById("btn").onclick = function () {
  window.location.reload();
};
