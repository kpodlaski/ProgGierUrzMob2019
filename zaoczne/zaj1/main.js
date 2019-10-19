console.log("Start OK");


canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
// Narysowanie kształtu
ctx.fillStyle = '#12e3e5';
ctx.fillRect(12,35,60,45);

//Napisanie tekstu na Kanwie
ctx.font = "60px Times Roman";
ctx.fillText("Tekst na Kanwie", 15, 145);
ctx.lineWidth = 4;
ctx.strokeStyle= '#fa1590';
ctx.strokeText("Something else",15, 200);

//Obrazki
img = new Image();
img.src = "eagle.jpg";

eagle = {
    x:100,
    y:220,
    w:100,
    h:100,
}

window.onload = function(){
    ctx.drawImage(img, eagle.x, eagle.y, eagle.w,eagle.h);
    console.log("Image drawn");
    console.log(img);
};

function moveRight(){
    console.log('move right');
    eagle.x+=20;
    ctx.drawImage(img, eagle.x, eagle.y, eagle.w,eagle.h);
}

rButton = document.getElementById("rightButton");
rButton.addEventListener('click',moveRight);
