var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bg1 = new BackgroundObject(
    "obrazki/scrolling_background_sky_.png",
    0,0, 40,
    canvas.width, canvas.height);

var bg2 = new BackgroundObject(
        "obrazki/scrolling_background_middle_.png",
        0,0, 60,
        canvas.width, canvas.height);   

var bg3 = new BackgroundObject(
        "obrazki/scrolling_background_foreground_.png",
        0,0, 20,
        canvas.width, canvas.height);

var eagle = new SpriteObject(
        "obrazki/bird.png",
        100,100,4,45,80,80);

var game_objects = [ bg1, bg2, bg3, eagle];

function animation(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d");
    for (i=0; i< game_objects.length; i++){
        game_objects[i].draw(offctx);
    }
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(offscreen,0,0,canvas.width,canvas.height);
    requestAnimationFrame(animation);
}

window.onload = function(){
    animation();
    for (i=0; i< game_objects.length; i++){
        game_objects[i].update();
    }
}