let world = [];

for(let i=0; i<16*3; i++){
    let y = [];
    for(let j=0; j<8*3; j++) {
        y[j] = {
            occupied: false,
            terrain: "a patch of grass",
            symbol: "#",
            style: "color:DarkGreen"
        }
    }world[i] = y;
}
//console.log(world);