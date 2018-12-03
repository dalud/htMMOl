let playerHP;
let maxHP = 12000;
let k; //userInput key
let command; //command passed to engine (user intent)
let alive = true;
let stamina;
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
        stamina = 10;
        maxStamina = stamina;
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
            if(stamina < maxStamina) stamina += .2;
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

        else if(stamina < cost) statusW.innerHTML = "You are exhausted";

        //Attack
        else if(calculateDistance(this.x, this.y, x, y) <= this.range) {
            damageRoll = roll(damage);
            if(objects[anchor.y+activeTile.y][anchor.x+activeTile.x].terrain) statusW.innerHTML = "You attack " + objects[y][x].terrain + " for " +damageRoll +" points of damage";
            else statusW.innerHTML = "You attack " + world[anchor.y+activeTile.y][anchor.x+activeTile.x].terrain;

            monsters.forEach(monster => {
                if (x === monster.x && y === monster.y) monster.hp -= damageRoll;
            });
            stamina -= cost;
        }else statusW.innerHTML = "You can't reach that";
    }
}