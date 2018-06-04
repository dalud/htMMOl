let map = document.getElementById('mapTable');
let statusW = document.getElementById('statusDiv');
let HPDisplay = document.getElementById('HP');
const viewPortWidth = 16 * 3;
const viewPortHeight = 8 * 3; //8 because of / 2

let terrainY = new Array(viewPortHeight);
let activeTile = {x: playerXY.x, y: playerXY.y};
let player = new Player();
var goblin = new Goblin(45, 22);

function roll(d){
    return Math.ceil(Math.random()*d);
}

statusW.innerHTML = "Welcome to Nair";

HPDisplay.addEventListener('mouseover', () => {
    statusW.innerHTML = "Your Hit Points mark your physical condition";
});

map.addEventListener('mouseleave', () => {
    statusW.innerHTML = "You're standing in the R&D clearing of Discordia";
});
map.addEventListener('click', () => {
    command = "interact";
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

function render() {
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

function getInfo(tile) {
    activeTile.x = tile.cellIndex;
    activeTile.y = tile.parentNode.rowIndex;
    const terrain = terrainY[tile.parentNode.rowIndex][tile.cellIndex];
    statusW.innerHTML = "That is a " + terrain;
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

//Main loop
setInterval(() => {
    ai();
    player.playerIntent();
    render();
}, 200);