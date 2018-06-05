let playerHP = 12;
let k; //userInput key
let command; //command passed to engine (user intent)

class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    static userInput(event) {
        k = event.which || event.keyCode;

        //W, A, S, D
        if (k === 119 || k === 97 || k === 115 || k === 100) {
            command = "move";
        }
        //else alert(k);
    }

    playerIntent() {
        switch (command) {
            case "move":
                this.move(k);
                Player.clearCommand();
                break;
            case "interact":
                Player.action(activeTile.x, activeTile.y);
                Player.clearCommand();
                break;
        }
    }

    static clearCommand() {
        command = "";
    }

    move(k) {
        if (k === 119 && !isOccupied(this.x, this.y-1)) --player.y;
        else if (k === 97 && !isOccupied(this.x-1, this.y)) --player.x;
        else if (k === 115 && !isOccupied(this.x, this.y+1)) ++player.y;
        else if (k === 100 && !isOccupied(this.x+1, this.y)) ++player.x;


        //restrict to visible area
        if (player.x === viewPortWidth) player.x = viewPortWidth - 1;
        if (player.x < 0) player.x = 0;
        if (player.y === viewPortHeight) player.y = viewPortHeight - 1;
        if (player.y < 0) player.y = 0;

    }

    static action(x, y) {
        if (x === player.x && y === player.y) statusW.innerHTML = "You tickle yourself";
        else statusW.innerHTML = "You attack the " + worldCoordY[y][x].terrain;
    }
}