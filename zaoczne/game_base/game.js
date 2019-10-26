var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bg1 = new BackgroundObject(
    "obrazki/scrolling_background_sky.png",
    0,0, 40,
    canvas.width, canvas.height);

var bg2 = new BackgroundObject(
        "obrazki/scrolling_background_middle.png",
        0,0, 60,
        canvas.width, canvas.height);   

var bg3 = new BackgroundObject(
        "obrazki/scrolling_background_foreground.png",
        0,0, 20,
        canvas.width, canvas.height);

var eagle = new SpriteObject(
        "obrazki/bird.png",
        100,100,4,45,80,80);

var game_objects = [ bg1, bg2, bg3, eagle];

ramka = 0;

function animation(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d");
    for (i=0; i< game_objects.length; i++){
        game_objects[i].draw(offctx);
    }
    let imData = offctx.getImageData(0,0,canvas.width,canvas.height);
    //console.log(imData);
    for(pixel = 0; pixel<imData.data.length;pixel+=4){
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
    ramka = (ramka+1)%1000;
    console.log(ramka);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.putImageData(imData,0,0);
    
    requestAnimationFrame(animation);
}

window.onload = function(){
    animation();
    for (i=0; i< game_objects.length; i++){
        game_objects[i].update();
    }
}