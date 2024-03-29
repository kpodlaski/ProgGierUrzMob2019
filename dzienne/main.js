var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

kulka = {
    x:50,
    y:50,
    r:15,
    vx:5,
    vy:4,
}

vjoy = {
    x:  101,
    y:  499,
    R:  100,
    X:  101,
    Y:  499,

}



function drawVJoy(ctx){
    ctx.strokeStyle="#aaaa00"; 
    ctx.beginPath();
    ctx.ellipse(vjoy.X,vjoy.Y,vjoy.R,vjoy.R,1,0,2*Math.PI)
    ctx.stroke();
    ctx.fillStyle="#00fafa"; 
    ctx.beginPath();
    ctx.ellipse(vjoy.x,vjoy.y,5,5,1,0,2*Math.PI)
    ctx.fill();
    ctx.fillStyle="#000000"; 
    ctx.beginPath();
    ctx.ellipse(vjoy.X,vjoy.Y,5,5,1,0,2*Math.PI)
    ctx.fill();
    
}

// https://github.com/kpodlaski/
//Repo: ProgGierUrzMob2019
//Podkatalog dzienne
function animation(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.ellipse(kulka.x, kulka.y, 2*kulka.r, 2*kulka.r, 
        Math.PI * .25, 0, 2*Math.PI);
    ctx.fill();
    drawVJoy(ctx);
    kulka.x+=kulka.vx;
    kulka.y+=kulka.vy;
    if (kulka.x-kulka.r<=0) {kulka.x=kulka.r; kulka.vx=-kulka.vx }
    if (kulka.x+kulka.r>=canvas.width) {
        kulka.x=canvas.width-kulka.r; 
        kulka.vx=-kulka.vx
    }
    if (kulka.y-kulka.r<=0) {kulka.y=kulka.r; kulka.vy=-kulka.vy; }
    if (kulka.y+kulka.r>=canvas.height) {
        kulka.y=canvas.height-kulka.r; 
        kulka.vy=-kulka.vy 
    }
    //console.log(kulka.x, kulka.y, kulka.r);
    setTimeout(animation,40);
}

animation();

canvas.addEventListener('click', click);
//For mobile Devices touch events are more important
canvas.addEventListener('touchstart', function(){
    console.log("touch Start");
});
canvas.addEventListener('touchend', function(){
    console.log("touch end");
});

function click(ev){
    console.log('klik');
    console.log(ev.pageY);
    dx = ev.pageX - vjoy.X;
    dy = ev.pageY - vjoy.Y;
    console.log(dx,dy)
    console.log(dx*dx+dy*dy)
    console.log(vjoy.R*vjoy.R)
    if (dx*dx+dy*dy<vjoy.R*vjoy.R){
        vjoy.x = ev.pageX;
        vjoy.y = ev.pageY;
        console.log("Proper klick");
        kulka.vx=10*dx/vjoy.R;
        kulka.vy=10*dy/vjoy.R;
    }

}