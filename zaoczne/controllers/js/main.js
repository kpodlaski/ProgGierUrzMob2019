//Animacja z czyszczeniem całego canvas

console.log("Start OK");
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");


canvas.addEventListener('click',vjoy_touch);

eagle = {
    x:100,
    y:220,
    vx:1,
    vy:-1,
    w:40,
    h:40
}

//Obrazki
img = new Image();
img.src = "img/eagle.jpg";

bimg = new Image();
bimg.src = "img/bird.jpg";

var ramkaStart = 0;
function draw_scene(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d"); 
    offctx.drawImage(img, eagle.x, eagle.y, eagle.w,eagle.h);
    offctx.restore();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(offscreen,0,0,canvas.width,canvas.height);
    window.requestAnimationFrame(draw_scene);
}


var interval = "";

function startAnimation(){
    interval2 = window.setInterval(
        function (){
            eagle.x += eagle.vx;
            eagle.y += eagle.vy;
            if (eagle.x<0) {
                eagle.x=0; eagle.vx = -eagle.vx;
            }
            if (eagle.x+eagle.w>canvas.width) {
                eagle.x=canvas.width-eagle.w; 
                eagle.vx = -eagle.vx;
            }
            if (eagle.y<0) {
                eagle.y=0; eagle.vy = -eagle.vy;
            }
            if (eagle.y+eagle.h>canvas.height) {
                eagle.y=canvas.height-eagle.h; eagle.vy = -eagle.vy;
            }
            

        },
        50
    );
}


window.onload = function(){
    draw_scene();
    startAnimation();
    console.log("Image drawn");
    console.log(img);
};

function vjoy_touch(){

}