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
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d"); 
    offctx.clearRect(0,0,canvas.width, canvas.height);
    // Narysowanie kształtu
    offctx.fillStyle = '#12e3e5';
    offctx.fillRect(12,35,60,45);
    //Napisanie tekstu na Kanwie
    offctx.font = "60px Times Roman";
    offctx.fillText("Tekst na Kanwie", 15, 145);
    offctx.lineWidth = 4;
    rot_x = eagle.x+eagle.w/2;
    rot_y = eagle.y+eagle.h/2;
    offctx.strokeStyle= '#fa1590';
    offctx.strokeText("Something else",15, 200);
    offctx.save();
    console.log(rot_x+ " "+rot_y) 
    offctx.translate(rot_x, rot_y);
    offctx.rotate(angle/180*3.14);
    offctx.translate(-rot_x, -rot_y);
    offctx.drawImage(img, eagle.x, eagle.y, eagle.w,eagle.h);
    offctx.restore();
    ctx.drawImage(offscreen,0,0,canvas.width,canvas.height);
}

function rotateRight(){
    angle+=1;
    draw_scene();
}

var interval = "";

function startAnimation(){
    interval = window.setInterval(rotateRight,20);
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
