let world = [];

for(let i=0; i<viewPortWidth; i++){
    let y = [];
    for(let j=0; j<viewPortHeight; j++) {
        y[j] = {
            occupied: false,
            terrain: "a patch of grass",
            symbol: "#",
            style: "color:DarkGreen"
        }
    }world[i] = y;
}
//console.log(world);