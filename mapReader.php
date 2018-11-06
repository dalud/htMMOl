<?php
/**
 * int imagecolorat ( resource $image , int $x , int $y )
 */

$img = imagecreatefrompng('map.png');

$imageSize = getimagesize('map.png');
$width = $imageSize[0];
$height = $imageSize[1];

for($y = 0; $y < $height; $y++){
    for($x = 0; $x < $width; $x++){
        echo imagecolorat($img, $x, $y);
    }
}