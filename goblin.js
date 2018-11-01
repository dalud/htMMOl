const goblinMaxStamina = 10;
let distX, distY;

class Goblin{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.stamina = 5;
        this.hp = 7;
        this.range = 1;
        this.lootValue = 3;
        this.xpWorth = 1;
        this.damage = 2;
    }

    idle(){
        const dir = roll(15);
        switch (dir){
            case 1:
                this.move(1);
                break;
            case 2:
                this.move(2);
                break;
            case 3:
                this.move(3);
                break;
            case 4:
                this.move(4);
                break;
        }
    }

    aggro() {
        //for path finding. will be deprecated. A*?
        distX = Math.pow((player.x - this.x), 2);
        distY = Math.pow((player.y - this.y), 2);

        if(calculateDistance(this.x, this.y, player.x, player.y) <= this.range) this.attack();

        //for path finding. will be deprecated. A*?
        else if(distY >= distX){
            if(player.y < this.y) {
                if(!isOccupied(this.x, this.y-1)) this.move(1);
                else if(player.x < this.x) this.move(2);
                else this.move(4);
            }
            else {
                if(!isOccupied(this.x, this.y+1)) this.move(3);
                else if(player.x < this.x) this.move(2);
                else this.move(4);
            }
        }else if(distY < distX){
            if(player.x < this.x) {
                if(!isOccupied(this.x-1, this.y)) this.move(2);
                else if(this.y > player.y) this.move(1);
                else this.move(3);
            }
            else {
                if(!isOccupied(this.x+1, this.y)) this.move(4);
                else if(this.y > player.y) this.move(1);
                else this.move(3);
            }
        }
    }

    move(direction){
        switch(direction){
            case 1:
                if(!isOccupied(this.x, this.y-1)) this.y--; //W
                //else this.idle();
                break;
            case 2:
                if(!isOccupied(this.x-1, this.y)) this.x--; //A
                //else this.move(3);
                break;
            case 3:
                if(!isOccupied(this.x, this.y+1)) this.y++; //S
                //else this.move(4);
                break;
            case 4:
                if(!isOccupied(this.x+1, this.y)) this.x++; //D
                //else this.move(1);
                break;
        }
    }

    attack(){
        damageRoll = roll(this.damage);
        if(playerHP > 0 && this.stamina === goblinMaxStamina) {
            statusW.innerHTML = "The goblin hits you for " +damageRoll +" points of damage";
            playerHP -= damageRoll;
            this.stamina = 0;
        }
    }
}