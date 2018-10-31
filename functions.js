function roll(d){
    return Math.ceil(Math.random()*d);
}

function isOccupied(x, y){
    return world[y][x].occupied;
}