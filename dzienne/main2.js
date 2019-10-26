var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

kulka = {
    x:50,
    y:50,
    r:15,
    vx:5,
    vy:4,
}

vjoy = new VJoy(100,500,100);
    
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
    vjoy.draw(ctx);
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

canvas.addEventListener('click', vjoy.onclick.bind(vjoy));
//For mobile Devices touch events are more important
canvas.addEventListener('touchstart', function(){
    console.log("touch Start");
});
canvas.addEventListener('touchend', function(){
    console.log("touch end");
});

