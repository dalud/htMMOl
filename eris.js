//proxy test 88

let map = document.getElementById('mapTable');
let statusW = document.getElementById('statusDiv');
let HPDisplay = document.getElementById('HP');
const viewPortWidth = 16 * 3;
const viewPortHeight = 8 * 3;
let playerXY = {x: viewPortWidth / 2 - 1, y: viewPortHeight / 2 - 1};
let terrainY = new Array(viewPortHeight);
let activeTile = {x: playerXY.x, y: playerXY.y};
let playerHP = 12;

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

        if (distX > distY) this.moveX();
        else this.moveY();
    }

    moveX(){
        if(playerXY.x < this.x) this.x--;
        else this.x++;
    }

    moveY(){
        if(playerXY.y < this.y) this.y--;
        else if(playerXY.y > this.y) this.y++;
    }
}

var goblin = new Goblin(45, 22);

function roll(d){
    return Math.ceil(Math.random()*d);
}

statusW.innerHTML = "Welcome to Nair";

HPDisplay.addEventListener('mouseover', function () {
    statusW.innerHTML = "Your Hit Points mark your physical condition";
});

map.addEventListener('mouseleave', function () {
    statusW.innerHTML = "You're standing in the R&D clearing of Discordia";
});
map.addEventListener('click', function () {
    action(activeTile.x, activeTile.y);
});

//Build Arrays to hold terrain info
for (j = 0; j < terrainY.length; j++) {
    let terrainX = new Array(viewPortWidth);
    for (i = 0; i < viewPortWidth; i++) {
        terrainX[i] = "";
    }
    terrainY[j] = terrainX;
}

//Build PlayerStats
function updatePlayerStats() {
    HPDisplay.innerHTML = "HP: " + playerHP;
}
updatePlayerStats();

//Build Viewport
for (j = 0; j < viewPortHeight; j++) {
    map.insertRow(j);
    for (i = 0; i < viewPortWidth; i++) {
        map.rows[j].insertCell(i);
        map.rows[j].cells[i].addEventListener('mouseover', function () {
            getInfo(this);
        });
    }
}

function userInput(event) {
    const k = event.which || event.keyCode;

    if (k == 119 || k == 97 || k == 115 || k == 100) move(k); //W, A, S, D
    //else alert(k);
}

function move(k) {
    if (k == 119) --playerXY.y;
    else if (k == 97) --playerXY.x;
    else if (k == 115) ++playerXY.y;
    else if (k == 100) ++playerXY.x;

    //restrict to visible area
    if (playerXY.x == viewPortWidth) playerXY.x = viewPortWidth - 1;
    if (playerXY.x < 0) playerXY.x = 0;
    if (playerXY.y == viewPortHeight) playerXY.y = viewPortHeight - 1;
    if (playerXY.y < 0) playerXY.y = 0;

    draw();
}

function draw() {
    for (j = 0; j < viewPortHeight; j++) {
        for (i = 0; i < viewPortWidth; i++) {
            if (playerXY.x == i && playerXY.y == j) {
                map.rows[j].cells[i].style = "color:BurlyWood; font-weight: bold";
                map.rows[j].cells[i].innerHTML = "Q";
                terrainY[j][i] = "You!";
            }
            else if(goblin.x == i && goblin.y == j){
                map.rows[j].cells[i].style = "color:Chartreuse; font-weight: bold";
                map.rows[j].cells[i].innerHTML = "g";
                terrainY[j][i] = "goblin";
            }
            else {
                map.rows[j].cells[i].style = "color:DarkGreen;";
                map.rows[j].cells[i].innerHTML = "#";
                terrainY[j][i] = "patch of grass";
            }
        }
    }
}
draw();

function getInfo(tile) {
    activeTile.x = tile.cellIndex;
    activeTile.y = tile.parentNode.rowIndex;
    const terrain = terrainY[tile.parentNode.rowIndex][tile.cellIndex];
    statusW.innerHTML = "That is a " + terrain;
}

function action(x, y) {
    if (x == playerXY.x && y == playerXY.y) statusW.innerHTML = "You tickle yourself";
    else statusW.innerHTML = "You attack the " + terrainY[y][x];

    updatePlayerStats();
}

function ai(){
    //Player <-> Enemy distance
    const x = playerXY.x - goblin.x;
    const y = playerXY.y - goblin.y;
    const dist = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));

    if(dist < 20){
        goblin.aggro();
    }
    else goblin.idle();

    document.getElementById('debug').innerHTML = dist;
}
ai();

setInterval(function tick(){
    ai();
    draw();
}, 333);