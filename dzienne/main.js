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
    x: 50,
    y: 450,
}
function drawVJoy(ctx){
    joyX = 50;
    joyY = 450;
    ctx.strokeStyle="#aaaa00"; 
    ctx.beginPath();
    ctx.ellipse(joyX,joyY,50,50,1,0,2*Math.PI)
    ctx.stroke();
    ctx.fillStyle="#00fafa"; 
    ctx.beginPath();
    ctx.ellipse(vjoy.x,vjoy.y,5,5,1,0,2*Math.PI)
    ctx.fill();
    ctx.fillStyle="#000000"; 
    ctx.beginPath();
    ctx.ellipse(joyX,joyY,5,5,1,0,2*Math.PI)
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

canvas.addEventListener('click', klik);

function klik(ev){
    console.log('klik');
    console.log(ev.pageX);
    vjoy.x = ev.pageX;
    vjoy.y = ev.pageY;
}