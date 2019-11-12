var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var skeleton = new Image();
skeleton.src ="images/skeleton.png"; //576x256  klatka h=64 w =64 
var skeletonImData  = {};
var x=110;
var y=40;
var x2=70;
var y2 = 165;
var vx=-1;
var vy=1;
console.log(skeleton);

function prepare(){
    var temp_canvas = document.createElement('canvas');
    var temp_ctx = temp_canvas.getContext('2d');
    temp_canvas.width = 64;
    temp_canvas.height = 64;
    temp_ctx.drawImage(skeleton, 0, 0 );
    skeletonImData = temp_ctx.getImageData(0, 0, 64, 64); 
}

function animation(){
    offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offctx = offscreen.getContext("2d");
    
    //Szkielet 2
    offctx.drawImage(skeleton,0,0,
        64,64,
        x2, y2,
        64, 64);

    //Szkielet 1
    offctx.drawImage(skeleton,
        0,0,
        64,64,
        x, y,
        64, 64);
    

    let imData = offctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.putImageData(imData,0,0);
    
    requestAnimationFrame(animation);
}


function detailedColision(){
    return false;
}

function checkCollision(){
    //start = performance.now();
    if (Math.abs(x2 - x) <64 && Math.abs(y2-y)<64) {
        if (detailedColision_v3()){
            //end = performance.now();
            //console.log("Time:",end-start);
            return true;
        };
    }
    //end = performance.now();
    //console.log("Time:",end-start);
    return false;
}


function update(){
    x+=vx;
    y+=vy;
    if (checkCollision()){
        x-=vx;
        y-=vy;
        vx=-vx;
        vy=-vy;
    }
    if (x<0 || x>180) {x-=vx; vx=-vx};
    if (y<0 || y>180) {y-=vy; vy=-vy};
    setTimeout(update,50);
}

window.onload = function(){
    prepare();
    console.log(this.skeletonImData);
    animation();
    update();
}