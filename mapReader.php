<?php
/**
 * Created by PhpStorm.
 * User: 100029006
 * Date: 2.11.2018
 * Time: 12.43
 *
 * int imagecolorat ( resource $image , int $x , int $y )
 */

$imageSize = getimagesize('map.png');
echo $imageSize[0];