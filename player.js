let playerHP;
let maxHP = 12;
let k; //userInput key
let command; //command passed to engine (user intent)
let alive = true;
let stamina;
let maxStamina;
let cost = 3; //stamina cost of swinging a weapon
let xp = 0;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        alive = true;
        playerHP = maxHP;
        this.range = 2;
        stamina = 10;
        maxStamina = stamina;
        cost = 3;
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
        if (alive) {
            switch (command) {
                case "move":
                    this.move(k);
                    break;

                case "interact":
                    this.action(activeTile.x, activeTile.y);
                    break;
            }
            if(stamina < maxStamina) stamina += .2;
            else if(playerHP < maxHP) playerHP += .03;
        }
        command = "";
    }

    move(k) {
        if (k === 119 && !isOccupied(this.x, this.y - 1)) --this.y;
        else if (k === 97 && !isOccupied(this.x - 1, this.y)) --this.x;
        else if (k === 115 && !isOccupied(this.x, this.y + 1)) ++this.y;
        else if (k === 100 && !isOccupied(this.x + 1, this.y)) ++this.x;

        //restrict to visible area
        if (this.x === viewPortWidth) this.x = viewPortWidth - 1;
        if (this.x < 0) this.x = 0;
        if (this.y === viewPortHeight) this.y = viewPortHeight - 1;
        if (this.y < 0) this.y = 0;
    }

    action(x, y) {
        //Self
        if (x === this.x && y === this.y) statusW.innerHTML = "You scratch yourself";

        else if(stamina < cost) statusW.innerHTML = "You are exhausted";

        //Attack
        else if(calculateDistance(this.x, this.y, x, y) < this.range) {
            statusW.innerHTML = "You attack " + worldCoordY[y][x].terrain + " for 1 points of damage";
            monsters.forEach(monster => {
                if (x === monster.x && y === monster.y) monster.hp--;
            });
            stamina -= cost;
        }else statusW.innerHTML = "You can't reach that";
    }
}