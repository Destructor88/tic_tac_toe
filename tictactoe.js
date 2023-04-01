const gameboard = [0,1,2,3,4,5,6,7,8];
document.getElementById("createPlayer").onclick = e => {
    e.preventDefault()

    let player1name = document.querySelector("#player1Name").value;
    let player1symbol = document.querySelector("#player1Name").closest(".r").querySelector("select").value;
    player1 = players(player1name,player1symbol);

    let player2name = document.querySelector("#player2Name").value;
    let player2symbol = document.querySelector("#player2Name").closest(".r").querySelector("select").value;
    player2 = players(player2name,player2symbol);

    document.querySelector("#startuppopup").style.display = "none";
}
var player1,player2;
let number = 0;
function players(name,symbol){
    var name = name;
    var symbol = symbol;
    let num = ++number;
    return {name,symbol,number:num};
}
const displayController = (() => {
    let tiles = document.getElementsByClassName("tile");
    var player = 1;
    for(let tile in gameboard){
        tiles[tile].addEventListener("click",() => {
            if(tiles[tile].classList.contains(`${player1.symbol}`) || tiles[tile].classList.contains(`${player1.symbol}`)){
                return alert("invalid placement");
            }

            if(player == 1){
                tiles[tile].innerHTML = `<p>${player1.symbol}</p>`;
                player = 2;
                tiles[tile].classList.add(`${player1.symbol}`);
            }else{
                tiles[tile].innerHTML = `<p>${player2.symbol}</p>`;
                player = 1;
                tiles[tile].classList.add(`${player2.symbol}`);
            }

            if(checkForWin(player1.symbol)){
                setTimeout(() => alert(`${player1.name} wins!`), 0);
            }else if(checkForWin(player2.symbol)){
                setTimeout(() => alert(`${player2.name} wins!`), 0);
            }else if(checkForDraw(player1.symbol,player2.symbol)){
                setTimeout(() => alert(`Draw`, 0));
            }

        })
    }
})();
function checkForWin(symbol){
    let tiles = document.getElementsByClassName("tile");
    for(let i = 0;i<9;i+=3){
        if(tiles[i].classList.contains(symbol) && tiles[i+1].classList.contains(symbol) && tiles[i+2].classList.contains(symbol)){
            return true;
        }
    }
    for(let i = 0;i<3;i++){
        if(tiles[i].classList.contains(symbol) && tiles[i+3].classList.contains(symbol) && tiles[i+6].classList.contains(symbol)){
            return true;
        }
    }

    if(tiles[0].classList.contains(symbol) && tiles[4].classList.contains(symbol) && tiles[8].classList.contains(symbol)){
        return true;
    }
    if(tiles[2].classList.contains(symbol) && tiles[4].classList.contains(symbol) && tiles[6].classList.contains(symbol)){
        return true;
    }
}
function checkForDraw(symbol1,symbol2){
    let tiles = document.getElementsByClassName("tile");
    let filledTiles = 0;
    for(let tile in gameboard){
        if(tiles[tile].classList.contains(symbol1) || tiles[tile].classList.contains(symbol2)){
            filledTiles++;
        }
    }
    if(filledTiles == 9){
        return true;
    }
}
