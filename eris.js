let map = document.getElementById('mapTable');
let statusW = document.getElementById('statusDiv');
let statsDisplay = document.getElementById('stats');
let debug = document.getElementById('debug');
const viewPortWidth = 16 * 3;
const viewPortHeight = 8 * 3; //8 because of / 2
let activeTile = {x: 0, y: 0};
let player = new Player(sizeX/2, sizeY/2);
let anchor = {x: player.x - viewPortWidth/2, y: player.y - viewPortHeight/2}; //viewport TOP LEFT anchor
let monsters = [];
let loot = [];
let damageRoll;

monsters.push(new Goblin(50, 34));
monsters.push(new Goblin(90, 54));

statusW.innerHTML = "Welcome to Nair";

map.addEventListener('mouseleave', () => {
    statusW.innerHTML = "You're standing in the R&D clearing of Discordia";
});

map.addEventListener('click', () => {
    command = "interact";
});

function updatePlayerStatus() {
    statsDisplay.innerHTML = "<pre style='color: red; font-size: 150%; font-weight: bolder; margin: 0; text-align: center;'>HP: " +Math.floor(playerHP) +"<span style='color: green'>\tStamina: " +Math.floor(stamina) +"</span>" +"<span style='text-align: right; color: blueviolet'>\t\tExp: " +xp +"</span>" +"<span style='text-align: right; color: #ffbd00'>\tGold: " +player.gold +"</span>" +"</pre>" ;

    if(playerHP < 1) {
        alive = false;
        player.gold = 0;
        statusW.innerHTML = "You are dead. (Press [F5] to respawn)";
    }

    loot.forEach(drop => {
        if(player.x === drop.x && player.y === drop.y){
            let gold = roll(drop.value);
            statusW.innerHTML = "You pick up " +gold +" pieces of gold";
            player.gold += gold;
            loot.splice(loot.indexOf(drop), 1);
        }
    })
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
        let y = anchor.y + j; //raytrace viewport to world

        for (let i = 0; i < viewPortWidth; i++) {
            let x = anchor.x + i; //raytrace viewport to world

            if(!alive) map.rows[j].cells[i].style = "color:grey";

            //render terrain
            if(alive) map.rows[j].cells[i].style = world[y][x].style; //
            map.rows[j].cells[i].innerHTML = world[y][x].symbol;
            objects[y][x].terrain = null;

            //render loot
            loot.forEach(drop => {
                if(drop.x === x && drop.y === y){
                    if(alive) map.rows[j].cells[i].style = "color:FFBD00";
                    map.rows[j].cells[i].innerHTML = "*";
                    objects[y][x].terrain = "some loot";
                }
            });

            //render player
            if (i === viewPortWidth/2 && j === viewPortHeight/2) {
                if (alive) map.rows[j].cells[i].style = "color:BurlyWood";
                map.rows[j].cells[i].innerHTML = "Q";
                objects[y][x].terrain = "That's you!";
                objects[y][x].occupied = true;
            }

            //render monsters
            monsters.forEach(monster => {
                if (monster.x === x && monster.y === y) {
                    if (alive) map.rows[j].cells[i].style = "color:Chartreuse";
                    map.rows[j].cells[i].innerHTML = "g";
                    objects[y][x].terrain = "a goblin";
                    objects[y][x].occupied = true;
                }
            });
        }
    }
}

function ai(){
    monsters.forEach(monster => {
        if(monster.hp < 1) {
            loot.push({x: monster.x, y: monster.y, value: monster.lootValue});
            xp += monster.xpWorth;
            monsters.splice(monsters.indexOf(monster), 1);
        }

        if (calculateDistance(monster.x, monster.y, player.x, player.y) < 18) {
            monster.aggro();
        }
        else monster.idle();

        if (monster.stamina < goblinMaxStamina) monster.stamina++;
    });
}

//Main loop
setInterval(() => {
    ai();
    player.playerIntent();
    updatePlayerStatus();
    render();
}, 200);