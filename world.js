// y-axis points down
// x right

let world = []; //terrain layer
let objects = []; //object layer
const sizeX = 160, sizeY = 90;
//let counter = 0;


for(let j=0; j<sizeY; j++){
    let x = [];
    let oX = [];

    for(let i=0; i<sizeX; i++) {
        if(roll(20) === 1) {
            x[i] = {
                occupied: true,
                terrain: "a tree",
                symbol: "|",
                style: "color:Chocolate"
                //id: counter
            }
        }else{
            x[i] = {
                occupied: false,
                terrain: "a patch of grass",
                symbol: "#",
                style: "color:DarkGreen"
                //id: counter
            }
        }

        oX[i] = {
            occupied: false,
            terrain: null,
            symbol: null,//counter,
            style: null
        }
        //counter++;
    }
    world[j] = x;
    objects[j] = oX;
}