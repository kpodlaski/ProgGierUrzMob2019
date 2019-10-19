//Animacja z czyszczeniem jedynie orła

console.log("Start OK");
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");


rButton = document.getElementById("rightButton");
rButton.addEventListener('click',moveRight);

//Obrazki
img = new Image();
img.src = "eagle.jpg";

eagle = {
    x:100,
    y:220,
    w:100,
    h:100,

    move: function(dx,dy){
        ctx.clearRect(this.x,this.y,this.w, this.h);
        this.x+=dx;
        this.y+=dy;  
        ctx.drawImage(img, eagle.x, eagle.y, eagle.w,eagle.h);
    }
}

function draw_scene(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // Narysowanie kształtu
    ctx.fillStyle = '#12e3e5';
    ctx.fillRect(12,35,60,45);

    //Napisanie tekstu na Kanwie
    ctx.font = "60px Times Roman";
    ctx.fillText("Tekst na Kanwie", 15, 145);
    ctx.lineWidth = 4;
    ctx.strokeStyle= '#fa1590';
    ctx.strokeText("Something else",15, 200);
    ctx.drawImage(img, eagle.x, eagle.y, eagle.w,eagle.h);
}


window.onload = function(){
    draw_scene();
    console.log("Image drawn");
    console.log(img);
};

function moveRight(){
    console.log('move right');
    eagle.move(20,0);
}
