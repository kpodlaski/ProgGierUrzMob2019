var bg_x = 200;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

bg_img = new Image();
bg_img.src = "obrazki/scrolling_background.png";

function animation(){
    ctx.clearRect(0,0,canvas.width, canvas.hight);
    //drawing bground image
    ctx.drawImage(bg_img, bg_x, 0, 2*canvas.width, canvas.height);
    requestAnimationFrame(animation);
}

function move_background(){
    if (bg_x<-canvas.width){
        bg_x = 0;
        console.log("Renew position");
    }
    bg_x -=1;
    setTimeout(move_background,20);
    console.log(bg_x);
}

window.onload = function(){
    animation();
    move_background();
}