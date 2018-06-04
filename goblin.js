class Goblin{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    idle(){
        const dir = roll(15);
        switch (dir){
            case 1:
                this.x++;
                break;
            case 2:
                this.x--;
                break;
            case 3:
                this.y++;
                break;
            case 4:
                this.y--;
                break;
        }
        //restrict to visible area
        if (goblin.x == viewPortWidth) goblin.x = viewPortWidth - 1;
        if (goblin.x < 0) goblin.x = 0;
        if (goblin.y == viewPortHeight) goblin.y = viewPortHeight - 1;
        if (goblin.y < 0) goblin.y = 0;
    }

    aggro() {
        const distX = Math.pow((playerXY.x - this.x), 2);
        const distY = Math.pow((playerXY.y - this.y), 2);

        if (distX > distY) this.moveX(distX);
        else this.moveY(distY);
    }

    moveX(dist){
        if(playerXY.x < this.x && dist > 1) this.x--;
        else this.x++;
    }

    moveY(dist){
        if(playerXY.y < this.y && dist > 1) this.y--;
        else if(playerXY.y > this.y) this.y++;
    }
}