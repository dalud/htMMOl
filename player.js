let playerHP;
let maxHP = 10;
let k; //userInput key
let command; //command passed to engine (user intent)
let alive = true;
let playerStamina;
let maxStamina;
let cost; //stamina cost of swinging a weapon
let xp = 0;
const damage = 2;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        alive = true;
        playerHP = maxHP;
        this.range = 1;
        playerStamina = 10;
        maxStamina = playerStamina;
        cost = 2;
        this.gold = 0;
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
        if (alive) {
            switch (command) {
                case "move":
                    this.move(k);
                    break;

                case "interact":
                    this.action(activeTile.x+anchor.x, activeTile.y+anchor.y);
                    break;
            }
            if(playerStamina < maxStamina) playerStamina += .2;
            else if(playerHP < maxHP) playerHP += .03;
        }
        command = null;
    }

    move(k) {
        if (k === 119 && !isOccupied(this.x, this.y - 1)){  //W
            --this.y;
            --anchor.y;
        }
        else if (k === 97 && !isOccupied(this.x - 1, this.y)){  //A
            --this.x;
            --anchor.x;
        }
        else if (k === 115 && !isOccupied(this.x, this.y + 1)){ //S
            ++this.y;
            ++anchor.y;
        }
        else if (k === 100 && !isOccupied(this.x + 1, this.y)){ //D
            ++this.x;
            ++anchor.x;
        }
    }

    action(x, y) {
        //Self
        if (x === this.x && y === this.y) statusW.innerHTML = "You scratch yourself";

        else if(playerStamina < cost) statusW.innerHTML = "You are exhausted";

        //Attack
        else if(calculateDistance(this.x, this.y, x, y) <= this.range) {
            damageRoll = roll(damage);
            if(objects[anchor.y+activeTile.y][anchor.x+activeTile.x].terrain) statusW.innerHTML = "You attack " + objects[y][x].terrain + " for " +damageRoll +" points of damage";
            else statusW.innerHTML = "You attack " + world[anchor.y+activeTile.y][anchor.x+activeTile.x].terrain;

            monsters.forEach(monster => {
                if (x === monster.x && y === monster.y) monster.hp -= damageRoll;
            });
            playerStamina -= cost;
        }else statusW.innerHTML = "You can't reach that";
    }

    depleteStamina(amount) {
        if(playerStamina < 1) playerStamina = 0;
        else playerStamina -= amount;
    }

    depleteHealth(amount) {
        if(playerHP < 1) playerHP = 0;
        else playerHP -= amount;
    }
}