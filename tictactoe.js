var gameboard = ["", "", "", "", "", "", "", "", ""];
var botMode = 0;
document.getElementById("createPlayer").onclick = e => {
    e.preventDefault()

    let player1name = document.querySelector("#player1Name").value;
    let player1symbol = document.querySelector("#player1Name").closest(".r").querySelector("select").value;
    player1 = players(player1name, player1symbol);
    document.querySelector("#player1NameDisplay").textContent = `${player1name}`;

    let player2name = document.querySelector("#player2Name").value;
    let player2symbol = document.querySelector("#player2Name").closest(".r").querySelector("select").value;
    player2 = players(player2name, player2symbol);
    document.querySelector("#player2NameDisplay").textContent = `${player2name}`;

    scores = { [player1.symbol]: -1, [player2.symbol]: 1, tie: 0 }

    document.querySelector("#startuppopup").style.display = "none";
}
document.getElementById("resetButton").onclick = e => {
    e.preventDefault();
    reset();
}
function reset(){
    let tiles = document.getElementsByClassName("tile");
    for (let tile of tiles) {
        tile.classList.remove(`${player1.symbol}`)
        tile.classList.remove(`${player2.symbol}`)
        tile.innerHTML = "";
        playerTurn = 1;
    }
    gameboard = ["", "", "", "", "", "", "", "", ""];
}


var player1, player2;
let number = 0;
function players(name, symbol) {
    var name = name;
    var symbol = symbol;
    let num = ++number;
    return { name, symbol, number: num };
}
var playerTurn = 1;
const displayController = (() => {
    let tiles = document.getElementsByClassName("tile");
    for (let tile in gameboard) {
        tiles[tile].addEventListener("click", () => {
            if (tiles[tile].classList.contains(`${player1.symbol}`) || tiles[tile].classList.contains(`${player2.symbol}`)) {
                return alert("invalid placement");
            }
            if (botMode == 0) {
                if (playerTurn == 1) {
                    tiles[tile].innerHTML = `<p>${player1.symbol}</p>`;
                    playerTurn = 2;
                    tiles[tile].classList.add(`${player1.symbol}`);
                    gameboard[tile] = player1.symbol;
                } else {
                    tiles[tile].innerHTML = `<p>${player2.symbol}</p>`;
                    playerTurn = 1;
                    tiles[tile].classList.add(`${player2.symbol}`);
                    gameboard[tile] = player2.symbol;
                }

                let result = checkForWinner();
                if(result != null && result != "tie"){
                    alert(`${result} won!`);
                    reset();
                }else if(result == "tie"){
                    alert("draw");
                    reset();
                }
            } else {
                tiles[tile].innerHTML = `<p>${player1.symbol}</p>`;
                tiles[tile].classList.add(`${player1.symbol}`);
                gameboard[tile] = player1.symbol;

                botMove();
            }
        })
    }
})();
function botMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] == "") {
            gameboard[i] = player2.symbol;
            let score = minimax(gameboard, 0, false);
            gameboard[i] = "";

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    gameboard[bestMove] = player2.symbol;
    let tiles = document.getElementsByClassName("tile");
    tiles[bestMove].innerHTML = `<p>${player2.symbol}</p>`;
    tiles[bestMove].classList.add(`${player2.symbol}`);
}
let scores = {}
function minimax(board, depth, isMaximizing) {
    let result = checkForWinner();
    if (result != null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "") {
                board[i] = player2.symbol;
                let score = minimax(board, depth + 1, false);
                board[i] = "";

                if (score > bestScore) {
                    bestScore = score;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "") {
                board[i] = player1.symbol;
                let score = minimax(board, depth + 1, true);
                board[i] = "";

                if (score < bestScore) {
                    bestScore = score;
                }
            }
        }
        return bestScore;
    }
}

function equals3(a, b, c) {
    if (a == b && b == c && a != '') {
        return true;
    }
    return false;
}

function checkForWinner() {
    let winner = null;

    for (let i = 0; i < 9; i += 3) {
        if (equals3(gameboard[i], gameboard[i + 1], gameboard[i + 2])) {
            winner = gameboard[i];
        }
    }
    for (let i = 0; i < 3; i++) {
        if (equals3(gameboard[i], gameboard[i + 3], gameboard[i + 6])) {
            winner = gameboard[i];
        }
    }

    if (equals3(gameboard[0], gameboard[4], gameboard[8])) {
        winner = gameboard[0];
    }
    if (equals3(gameboard[2], gameboard[4], gameboard[6])) {
        winner = gameboard[2];
    }

    let filledTiles = 0;
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] != "") {
            filledTiles++;
        }
    }

    if (winner == null && filledTiles == 9) {
        return "tie";
    } else {
        return winner;
    }
}



document.getElementById("botMode").onclick = e => {
    e.preventDefault();

    botMode = 1;
    alert("Bot Mode Activated");
}