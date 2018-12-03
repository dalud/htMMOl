function roll(d){
    return Math.ceil(Math.random()*d);
}

function isOccupied(x, y){
    if(world[y][x].occupied) return world[y][x].occupied;
    else return objects[y][x].occupied;
}

function calculateDistance(x, y, x2, y2){
    return Math.round(Math.sqrt(Math.pow((x-x2), 2) + Math.pow((y-y2), 2)));
}

function getInfo(tile) {
    activeTile.x = tile.cellIndex;
    activeTile.y = tile.parentNode.rowIndex;
    if(alive){
        if(objects[anchor.y+activeTile.y][anchor.x+activeTile.x].terrain) statusW.innerHTML = objects[anchor.y+activeTile.y][anchor.x+activeTile.x].terrain;
        else statusW.innerHTML = world[anchor.y+activeTile.y][anchor.x+activeTile.x].terrain;
    }
    debug.innerHTML = isOccupied(anchor.x+activeTile.x, anchor.y + activeTile.y);
    //"x: " +(anchor.x+activeTile.x) +", y: " +(anchor.y+activeTile.y) +", dist: " +calculateDistance(player.x, player.y, activeTile.x+anchor.x, activeTile.y+anchor.y);
}