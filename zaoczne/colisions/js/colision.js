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


function detailedColision_v1(){
    //Sprawdzamy wszystkie pixle z obu obrazków
    console.log("Sprawdzam");
    for (pixel =0; pixel<64*64; pixel+=1 ){
        let sk1 = skeletonImData.data[4*pixel+3];
        let _x = x+pixel%64;
        let _y = y+Math.floor(pixel/64);
        //console.log(x,y,pixel,_x,_y,_x-x, _y-y);
        //         237 170 4078 283 233 46 63        
            for (pixel2 =0; pixel2<64*64; pixel2+=1 ){
                let sk2 = skeletonImData.data[4*pixel2+3];
                let _x2 = x2+pixel2%64;
                let _y2 = y2+Math.floor(pixel2/64); 
                if (_x==_x2 && _y==_y2 && sk1!=0 && sk2!=0){
                    console.log('X',_x, _x2);
                    console.log('Y',_y, _y2);
                    console.log('pixle',4*pixel-1, 4*pixel2-1);
                    console.log('kolory',sk1, sk2);
                    console.log("Kolizja");                
                    return true;
                }
            }
    }
    return false;
}

function pixel1AtPoint(_x,_y){
    if (_x<x || _x>x+64) return -1;
    if (_y<y || _y>y+64) return -1;
    p = (_y-y)*64 + _x-x;
    return p; 
}

function pixel2AtPoint(_x,_y){
    if (_x<x2 || _x>x2+64) return -1;
    if (_y<y2 || _y>y2+64) return -1;
    p = (_y-y2)*64 + _x-x2;
    return p;
}

function color1AtPoint(_x,_y){
    if (_x<x || _x>x+64) return 0;
    if (_y<y || _y>y+64) return 0;
    p = (_y-y)*64 + _x-x;
    if (p<0 || p>=64*64) return 0;
    return skeletonImData.data[4*p+3]
}

function color2AtPoint(_x,_y){
    if (_x<x2 || _x>x2+64) return 0;
    if (_y<y2 || _y>y2+64) return 0;
    p = (_y-y2)*64 + _x-x2;
    if (p<0 || p>=64*64) return 0;
    return skeletonImData.data[4*p+3]
}


function detailedColision_v2(){
    //Sprawdzamy wszystkie pixle z pierwszego  obrazka
    for (pixel =0; pixel<64*64; pixel+=1 ){
        let sk1 = skeletonImData.data[4*pixel+3];
        if (sk1==0) continue;
        let _x = x+pixel%64;
        let _y = y+Math.floor(pixel/64);
        let col = _x - x2;
        let row = _y - y2; 
        if (col<0 || row <0 ) continue;
        let sk2 = color2AtPoint(_x,_y);
        if (sk2!=0){
            console.log('X',x, x2, _x, col+x2, col);
            console.log('Y',y, y2, _y, row+y2, row);
            console.log('kolory',sk1, sk2);
            console.log('pixel1',pixel1AtPoint(_x,_y), pixel);
            console.log('pixel2',pixel2AtPoint(_x,_y));
            console.log("Kolizja");                
            return true;
        }
    }
    return false;
}

function detailedColision_v3(){
    //Sprawdzamy wszystkie pixle z obszaru przecięcie bounding boxów
    _xMin = Math.max(x, x2);
    _yMin = Math.max(y,y2);
    _xMax = Math.min(x, x2)+64;
    _yMax = Math.min(y, y2)+64;
    for (tx = _xMin; tx<=_xMax; tx++){
        for (ty=_yMin;ty<=_yMax; ty++){
            if (
                color2AtPoint(tx,ty) != 0
                &&
                color1AtPoint(tx,ty) !=0
            )
            return true;
        }
    }
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