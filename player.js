let playerHP = 12;
let k; //userInput key
let command; //command passed to engine (user intent)
let alive;

class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        alive = true;
    }

    static userInput(event) {
        k = event.which || event.keyCode;

        //W, A, S, D
        if (k === 119 || k === 97 || k === 115 || k === 100) {
            //statusW.innerHTML = alive;
            command = "move";
        }
        //else alert(k);
    }

    playerIntent() {
        if(alive){
            switch (command) {
                case "move":
                    this.move(k);
                    //this.clearCommand();
                    break;
                case "interact":
                    this.action(activeTile.x, activeTile.y);
                    //this.clearCommand();
                    break;
            }
        }
        command = "";
    }

    move(k) {
        if (k === 119 && !isOccupied(this.x, this.y-1)) --this.y;
        else if (k === 97 && !isOccupied(this.x-1, this.y)) --this.x;
        else if (k === 115 && !isOccupied(this.x, this.y+1)) ++this.y;
        else if (k === 100 && !isOccupied(this.x+1, this.y)) ++this.x;


        //restrict to visible area
        if (this.x === viewPortWidth) this.x = viewPortWidth - 1;
        if (this.x < 0) this.x = 0;
        if (this.y === viewPortHeight) this.y = viewPortHeight - 1;
        if (this.y < 0) this.y = 0;

    }

    action(x, y) {
        if (x === this.x && y === this.y) statusW.innerHTML = "You tickle yourself";
        else {
            statusW.innerHTML = "You attack the " + worldCoordY[y][x].terrain +" for 1 points of damage";
            if(x === goblin.x && y === goblin.y) goblin.hp--;
        }
    }
}