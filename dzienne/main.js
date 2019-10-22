
kulka = {
    x:50,
    y:50,
    r:15,
    vx:1,
    vy:1,
}

function drawVJoy(ctx){
    joyX = 50;
    joyY = 450;
    ctx.strokeStyle="#aaaa00"; 
    ctx.beginPath();
    ctx.ellipse(joyX,joyY,50,50,1,0,2*Math.PI)
    ctx.stroke();
    ctx.fillStyle="#000000"; 
    ctx.beginPath();
    ctx.ellipse(joyX,joyY,5,5,1,0,2*Math.PI)
    ctx.fill();
}

// https://github.com/kpodlaski/
//Repo: ProgGierUrzMob2019
//Podkatalog dzienne
function animation(){
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.ellipse(kulka.x, kulka.y, 2*kulka.r, 2*kulka.r, 
        Math.PI * .25, 0, 2*Math.PI);
    ctx.fill();
    drawVJoy(ctx);
    kulka.x+=kulka.vx;
    kulka.y+=kulka.vy;
    if (kulka.x<=0) {kulka.x=0; kulka.vx=-kula.vx }
    if (kulka.x>=canvas.width) {
        kulka.x=canvas.width; 
        kulka.vx=-kulka.vx
    }
    if (kulka.y<=0) {kulka.y=0; kulka.vy=-kulka.vy; }
    if (kulka.y>=canvas.height) {
        kulka.y=canvas.height; 
        kulka.vy=-kulka.vy 
    }
    console.log(kulka.x, kulka.y, kulka.r);
    setTimeout(animation,40);
}

animation();