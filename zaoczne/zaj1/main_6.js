//Animacja obrazka

console.log("Start OK");
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");


rButton = document.getElementById("rightButton");
rButton.addEventListener('click',moveRight);

rotateButton = document.getElementById("rotateButton");
rotateButton.addEventListener('click',rotateRight);

startButton = document.getElementById("startAnimation");
startButton.addEventListener('click',startAnimation);

stopButton = document.getElementById("startAnimation");
stopButton.addEventListener('click',startAnimation);

//Obrazki
img = new Image();
img.src = "eagle.jpg";

eagle = {
    x:100,
    y:220,
    w:100,
    h:100,
}

angle = 0;

function draw_scene(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // Narysowanie kształtu
    ctx.fillStyle = '#12e3e5';
    ctx.fillRect(12,35,60,45);
    //Napisanie tekstu na Kanwie
    ctx.font = "60px Times Roman";
    ctx.fillText("Tekst na Kanwie", 15, 145);
    ctx.lineWidth = 4;
    rot_x = eagle.x+eagle.w/2;
    rot_y = eagle.y+eagle.h/2;
    ctx.strokeStyle= '#fa1590';
    ctx.strokeText("Something else",15, 200);
    ctx.save();
    console.log(rot_x+ " "+rot_y) 
    ctx.translate(rot_x, rot_y);
    ctx.rotate(angle/180*3.14);
    ctx.translate(-rot_x, -rot_y);
    ctx.drawImage(img, eagle.x, eagle.y, eagle.w,eagle.h);
    ctx.restore();
}

function rotateRight(){
    angle+=1;
    draw_scene();
}

var interval = "";

function startAnimation(){
    interval = window.setInterval(rotateRight,1);
}

function stopAnimation(){
    window.clearInterval(interval);
}

window.onload = function(){
    draw_scene();
    console.log("Image drawn");
    console.log(img);
};

function moveRight(){
    console.log('move right');
    eagle.x+=20;
    draw_scene();
}
