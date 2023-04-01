const gameboard = [0,1,2,3,4,5,6,7,8];
function players(){

}
const displayController = (() => {
    let tiles = document.getElementsByClassName("tile");
    for(let tile in gameboard){
        tiles[tile].innerHTML = "x";
    }
})();