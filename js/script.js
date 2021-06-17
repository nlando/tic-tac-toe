let colors = {
    null: '',
    player1: 'blue',
    player2: 'yellow',
};

const winCombos = [
    //rows
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //columns
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diags
    [0,4,8],
    [2,4,6]
];

let gameState;
let currentTurn;
let winner;

const $gameboard = $("#gameboard"); //jQuery element for div surrounding board
console.log($gameboard);

const $squares = $(".game-sq"); //jQuery array of all the squares
console.log($squares);

const $winnerMessage = $("#winner-message");
console.log($winnerMessage);

const resetButton = $(".reset-btn");
console.log(resetButton);

const $playerTurnMessage = $('#player-turn');
console.log($playerTurnMessage);


function initGame (){
    //null = empty square
    //1 === 'X'
    //2 === 'O'
    gameState = [null, null, 1, null, null, null, null, -1, null];
    currentTurn = 1;
    winner = null;
    $winnerMessage.txt('');
    $playerTurnMessage.text(`It's Player ${currentTurn === 1 ? "X" : "O"}'s turn`);
    renderBoard();
};


function renderBoard(){
    gameState.forEach((squareMarker, gameStateIndex) => {
        console.log("====GAMESTATE FOR EACH LOOP BEGIN====");
        console.log(squareMarker)
        console.log(gameStateIndex)
        let square = $squares.eq(gameStateIndex);
        console.log("Square being checked: ", square);
        gameMarker(square, squareMarker);
    });
};

// initGame();
// renderBoard();

function gameMarker(squareElement, numValue){
    console.log(squareElement, numValue);
    if (numValue === 1){
        squareElement.text('X');
        squareElement.css("background-color", "green");
    } else if (numValue === -1){
        squareElement.text('O');
        squareElement.css("background-color", "blue");
    } else {
        squareElement.text("");
    };
};

function handleClick(event){
    if(!winner){
    let id = event.target.id;
    let squareIndex = parseInt(id.substring(3));
    if (gameState[squareIndex]){
        return;
    } else {
    gameState[squareIndex] = currentTurn;
    renderBoard();
    checkWinner();
    //flip the turn
    currentTurn *= -1;
    $playerTurnMessage.text(`It's Player ${currentTurn === 1 ? "X" : "O"}'s turn`)
    }
    };
}

function checkWinner(){
    winCombos.forEach((winCond) => {
        console.log(winCond);
        let points = 0;
        console.log(winCond);
        winCond.forEach((gameStateIndexToCheck) => {
            points += gameState[gameStateIndexToCheck]
            console.log(points);
        });
        if (points === 3){
            winner = 1;
            $winnerMessage.text("Congrats Player X");
        } else if (points === -3) {
            winner = -1;
            $winnerMessage.text("Congrats Player O");
        } else {
            winner = "T";
            $winnerMessage.text("Congrats Player O");
        }
        console.log(winner);
    });
}

initGame();

resetButton.on("click", initGame);

// $gameboard.on("click", ".square", handleClick());