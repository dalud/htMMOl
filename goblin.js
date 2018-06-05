class Goblin{
    constructor(x, y){
        this.x = x;
        this.y = y;
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
        //restrict to visible area (will be deprecated)
        if(this.x === viewPortWidth) this.x = viewPortWidth - 1;
        if(this.x < 0) goblin.x = 0;
        if(this.y === viewPortHeight) this.y = viewPortHeight - 1;
        if(this.y < 0) this.y = 0;
    }

    aggro() {
        const distX = Math.pow((player.x - this.x), 2);
        const distY = Math.pow((player.y - this.y), 2);

        if(distY >= distX){
            if(player.y < this.y) this.move(1);
            else this.move(3);
        }else if(distY < distX){
            if(player.x < this.x) this.move(2);
            else this.move(4);
        }
    }

    move(direction){
        switch(direction){
            case 1:
                if(!isOccupied(this.x, this.y-1)) this.y--;
                break;
            case 2:
                if(!isOccupied(this.x-1, this.y)) this.x--;
                break;
            case 3:
                if(!isOccupied(this.x, this.y+1)) this.y++;
                break;
            case 4:
                if(!isOccupied(this.x+1, this.y)) this.x++;
                break;
        }
    }
}