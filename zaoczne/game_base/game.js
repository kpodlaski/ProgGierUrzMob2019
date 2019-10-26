var bg_x = 0;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

bg_img = new Image();
bg_img.src = "obrazki/scrolling_background.png";

bird_img = new Image();
bird_img.src = "bird.png";


function animation(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d");
    offctx.save();
    offctx.drawImage(bg_img, bg_x, 
        0, canvas.width, canvas.height);
    offctx.drawImage(bg_img, bg_x+canvas.width, 
        0, canvas.width, canvas.height);
    offctx.translate(300, 100);
    offctx.scale(-1,1); //odbicie w osi x
    offctx.drawImage(bird_img,
        frame*bird_img.width/4,
        0,
        bird_img.width/4, bird_img.height, 
        50,100,
        100,100);
    offctx.restore();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(offscreen,0,0,canvas.width,canvas.height);
    requestAnimationFrame(animation);

}

function move_background(){
    if (bg_x<-canvas.width){
        bg_x = 0;
        console.log("Renew position");
    }
    bg_x -=1;
    setTimeout(move_background,10);
    //console.log(bg_x);
}

frame = 0;
function move_bird(){
    frame=(frame + 1)%4;
    setTimeout(move_bird,60);
}

window.onload = function(){
    animation();
    move_background();
    move_bird();
}