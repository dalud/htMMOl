let map = document.getElementById('mapTable');
let statusW = document.getElementById('statusDiv');
let statsDisplay = document.getElementById('stats');
let debug = document.getElementById('debug');
const viewPortWidth = 16 * 3;
const viewPortHeight = 8 * 3; //8 because of / 2
let tileInfo = [];
let activeTile = {x: 0, y: 0};
let player = new Player(23, 11);
let monsters = [];
monsters.push(new Goblin(45, 22));
monsters.push(new Goblin(1, 1));

function roll(d){
    return Math.ceil(Math.random()*d);
}

statusW.innerHTML = "Welcome to Nair";

map.addEventListener('mouseleave', () => {
    statusW.innerHTML = "You're standing in the R&D clearing of Discordia";
});

map.addEventListener('click', () => {
    command = "interact";
});

//Build Arrays to hold tile info
for (let j = 0; j < viewPortHeight; j++) {
    let x = [];
    for (let i = 0; i < viewPortWidth; i++) {
        x[i] = {terrain: "", occupied: false};
    }
    tileInfo[j] = x;
}

function updatePlayerStatus() {
    statsDisplay.innerHTML = "<pre style='color: red; font-size: 150%; font-weight: bolder; margin: 0; text-align: center;'>HP: " +Math.floor(playerHP) +"<span style='color: green'>\tStamina: " +Math.floor(stamina) +"</span>" +"<span style='text-align: right; color: blueviolet'>\t\tExp: " +xp +"</span>" +"</pre>" ;

    if(playerHP < 1) {
        alive = false;
        statusW.innerHTML = "You are dead. (Press [F5] to respawn)";
    }
}

//Build Viewport
for (let j = 0; j < viewPortHeight; j++) {
    map.insertRow(j);
    for (let i = 0; i < viewPortWidth; i++) {
        map.rows[j].insertCell(i);
        map.rows[j].cells[i].addEventListener('mouseover', function () {
            getInfo(this);
        });
    }
}

function render() {
    for (let j = 0; j < viewPortHeight; j++) {
        for (let i = 0; i < viewPortWidth; i++) {
            if(!alive) map.rows[j].cells[i].style = "color:grey";

            //render terrain
            if(alive) map.rows[j].cells[i].style = world[i][j].style;
            map.rows[j].cells[i].innerHTML = world[i][j].symbol;
            tileInfo[j][i].terrain = world[i][j].terrain;
            tileInfo[j][i].occupied = world[i][j].occupied;

            //render player
            if (player.x === i && player.y === j) {
                if (alive) map.rows[j].cells[i].style = "color:BurlyWood; font-weight: bold";
                map.rows[j].cells[i].innerHTML = "Q";
                tileInfo[j][i].terrain = "That's you!";
                tileInfo[j][i].occupied = true;
            }

            //render monsters
            monsters.forEach(monster => {
                if (monster.x === i && monster.y === j) {
                    if (alive) map.rows[j].cells[i].style = "color:Chartreuse; font-weight: bold";
                    map.rows[j].cells[i].innerHTML = "g";
                    tileInfo[j][i].terrain = "a goblin";
                    tileInfo[j][i].occupied = true;
                }
            });

        }
    }
}

function isOccupied(x, y){
    return tileInfo[y][x].occupied;
}

function getInfo(tile) {
    activeTile.x = tile.cellIndex;
    activeTile.y = tile.parentNode.rowIndex;
    statusW.innerHTML = tileInfo[tile.parentNode.rowIndex][tile.cellIndex].terrain;
}

function ai(){
    monsters.forEach(monster => {
        if(monster.hp < 1) {
            monsters.splice(monsters.indexOf(monster));
            xp++;
        }

        if (calculateDistance(monster.x, monster.y, player.x, player.y) < 18) {
            monster.aggro();
        }
        else monster.idle();

        if (monster.stamina < goblinMaxStamina) monster.stamina++;
    });
}

function calculateDistance(x, y, x2, y2){
    return Math.sqrt(Math.pow((x-x2), 2) + Math.pow((y-y2), 2));
}

//Main loop
setInterval(() => {
    ai();
    player.playerIntent();
    updatePlayerStatus();
    render();
}, 200);