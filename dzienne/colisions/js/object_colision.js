var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var skeleton = new Image();
skeleton.src ="images/skeleton.png"; //576x256  klatka h=64 w =64 


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bg1 = new BackgroundObject(
    "images/scrolling_background_sky.png",
    0,0, 40,
    canvas.width, canvas.height);

var bg2 = new BackgroundObject(
        "images/scrolling_background_middle.png",
        0,0, 60,
        canvas.width, canvas.height);   

var bg3 = new BackgroundObject(
        "images/scrolling_background_foreground.png",
        0,0, 20,
        canvas.width, canvas.height);

var game_objects = [ bg1, bg2, bg3];

skeletons = [
    
      
    {x:120, y:50, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},
    {x:120, y:150, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:2, vy:0},
    {x:120, y:230, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},
    
    {x:10, y:40, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:1, vy:0},
    {x:10, y:140, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-1, vy:0},
    {x:10, y:220, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:1, vy:0},

    {x:70, y:30, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},
    {x:70, y:130, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},
    {x:70, y:210, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},

    {x:-120, y:50, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:2, vy:0},
    {x:-120, y:150, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:2, vy:0},
    {x:-120, y:230, mass: 10, timeout: 50, width: 64, height:64, frames_in_row:9, vx:2, vy:0},
    
    {x:-70, y:130, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},
    {x:-70, y:210, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},
    {x:-70, y:30, timeout: 50, width: 64, height:64, frames_in_row:9, vx:-2, vy:0},
    

   {x:170, y:40, mass: 10000, timeout: 50, width: 64, height:64, frames_in_row:9, vx:0, vy:0},
   {x:170, y:140, mass: 10000, timeout: 50, width: 64, height:64, frames_in_row:9, vx:0, vy:0},
   {x:170, y:220, mass: 10000, timeout: 50, width: 64, height:64, frames_in_row:9, vx:0, vy:0},
   
   {x:-170, y:40, mass: 10000, timeout: 50, width: 64, height:64, frames_in_row:9, vx:0, vy:0},
   {x:-170, y:140, mass: 10000, timeout: 50, width: 64, height:64, frames_in_row:9, vx:0, vy:0},
   {x:-170, y:220, mass: 10000, timeout: 50, width: 64, height:64, frames_in_row:9, vx:0, vy:0},
]

var coliding_object = []

for (let i=0; i<skeletons.length; i++){
    let _sk = skeletons[i];
    let sk = new SpriteObject("images/skeleton.png", _sk.x, _sk.y, _sk.mass, _sk.timeout,_sk.width,_sk.height,_sk.frames_in_row);
    sk.vx=_sk.vx;
    sk.vy=_sk.vy;
    coliding_object.push(sk);
}


ramka = 0;

function animation(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d");
    for (i=0; i< game_objects.length; i++){
        game_objects[i].draw(offctx);
    }
    for (i=0; i< coliding_object.length; i++){
        coliding_object[i].draw(offctx);
    }
    let imData = offctx.getImageData(0,0,canvas.width,canvas.height);
    //Dawn approaching
    /*for(pixel = 0; pixel<imData.data.length;pixel+=4){
        c = imData.data[pixel] + imData.data[pixel+1] 
            + imData.data[pixel+2];
        c = c/3;
        imData.data[pixel] = imData.data[pixel] + 
                        (c-imData.data[pixel])/1000*ramka;
        imData.data[pixel+1] = imData.data[pixel+1] + 
                        (c-imData.data[pixel+1])/1000*ramka;
        imData.data[pixel+2] = imData.data[pixel+2] + 
                        (c-imData.data[pixel+2])/1000*ramka;
    }
    */
    ramka = (ramka+1)%1000;
    //console.log(ramka);
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.putImageData(imData,0,0);
    requestAnimationFrame(animation);
}

window.onload = function(){
    animation();
    for (let i=0; i< game_objects.length; i++){
        game_objects[i].update();
    }
    for (let i=0; i< coliding_object.length; i++){
        console.log("Update",i, coliding_object.length);
        console.log(coliding_object.slice(i+1));
        coliding_object[i].update(coliding_object.slice(i+1));
    }
}