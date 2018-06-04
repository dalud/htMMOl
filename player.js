let playerXY = {x: 23, y: 11};
let playerHP = 12;
let k; //userInput key
let command; //command passed to engine (user intent)

class Player{
    constructor(){}

    userInput(event) {
        k = event.which || event.keyCode;

        //W, A, S, D
        if (k == 119 || k == 97 || k == 115 || k == 100) {
            command = "move";
        }
        else alert(k);
    }

    playerIntent() {
        switch (command) {
            case "move":
                this.move(k);
                this.clearCommand();
                break;
            case "interact":
                this.action(activeTile.x, activeTile.y);
                this.clearCommand();
                break;
        }
    }

    clearCommand() {
        command = "";
    }

    move(k) {
        if (k == 119) --playerXY.y;
        else if (k == 97) --playerXY.x;
        else if (k == 115) ++playerXY.y;
        else if (k == 100) ++playerXY.x;

        /*
        //restrict to visible area
        if (playerXY.x == viewPortWidth) playerXY.x = viewPortWidth - 1;
        if (playerXY.x < 0) playerXY.x = 0;
        if (playerXY.y == viewPortHeight) playerXY.y = viewPortHeight - 1;
        if (playerXY.y < 0) playerXY.y = 0;
        */
    }

    action(x, y) {
        if (x == playerXY.x && y == playerXY.y) statusW.innerHTML = "You tickle yourself";
        else statusW.innerHTML = "You attack the " + terrainY[y][x];
    }
}