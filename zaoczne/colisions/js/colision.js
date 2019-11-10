var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var sceleton = new Image();
sceleton.src ="images/skeleton.png"; //576x256  klatka h=64 w =64 
var x=20;
var y=15;
var x2=300;
var y2 = 205;
console.log(sceleton);

function animation(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d");
    
    //Szkielet 1
    offctx.drawImage(sceleton,
        0,0,
        64,64,
        x, y,
        64, 64);
    //Szkielet 2
    offctx.drawImage(sceleton,0,0,
        64,64,
        x2, y2,
        64, 64);

    let imData = offctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.putImageData(imData,0,0);
    
    requestAnimationFrame(animation);
}

window.onload = function(){
    animation();
    //    console.log("Start");
}