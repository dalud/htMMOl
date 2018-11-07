<?php

$img = imagecreatefrompng('map.png');

$imageSize = getimagesize('map.png');
$width = $imageSize[0];
$height = $imageSize[1];

$map = array();

for($y = 0; $y < $height; $y++){
    $row = array();

    for($x = 0; $x < $width; $x++){
        $row[$x] = imagecolorat($img, $x, $y);
    }
    $map[$y] = $row;
}
$js_array = json_encode($map);
echo 'let mapData = '. $js_array .'
let world = []; //terrain layer
let objects = []; //object layer
const sizeX = mapData[0].length, sizeY = mapData.length;

for(let j=0; j<sizeY; j++){
    let x = [];
    let oX = [];

    for(let i=0; i<sizeX; i++) {
        if(mapData[j][i] === 25600) {
            x[i] = {
                occupied: false,
                terrain: "a patch of grass",
                symbol: "#",
                style: "color:DarkGreen"               
            }
        }else if(mapData[j][i] === 13789470){
            x[i] = {
                occupied: true,
                terrain: "a tree",
                symbol: "|",
                style: "color:Chocolate"
            }
        }

        oX[i] = {
            occupied: false,
            terrain: null,
            symbol: null,
            style: null
        }
    }
    world[j] = x;
    objects[j] = oX;
}
';