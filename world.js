let world = []; //terrain layer
let objects = []; //object layer
const sizeX = 1600, sizeY = 900;
let counter = 0;

// y-axis points down
// x right

for(let j=0; j<sizeY; j++){
    let x = [];
    let oX = [];

    for(let i=0; i<sizeX; i++) {
        if(roll(20) === 1) {
            x[i] = {
                occupied: true,
                terrain: "a tree",
                symbol: "|",//counter,
                style: "color:Chocolate",
                id: counter
            }
        }else{
            x[i] = {
                occupied: false,
                terrain: "a patch of grass",
                symbol: "#",//counter,
                style: "color:DarkGreen",
                id: counter
            }
        }

        oX[i] = {
            occupied: false,
            terrain: null,
            symbol: null,//counter,
            style: null
        }
        counter++;
    }
    world[j] = x;
    objects[j] = oX;
}
//console.log(objects[23].length);