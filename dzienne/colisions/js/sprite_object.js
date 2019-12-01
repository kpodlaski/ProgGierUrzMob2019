function getImageData(img, width,height){
    var temp_canvas = document.createElement('canvas');
    var temp_ctx = temp_canvas.getContext('2d');
    temp_canvas.width = width;
    temp_canvas.height = height;
    temp_ctx.drawImage(img, 0, 0 );
    return temp_ctx.getImageData(0, 0, width, height); 
}

function new_velocities(a,b){
    //xdirection
    let Ax = (a.vx*(a.m-b.m)+2*b.m*b.vx)/(a.m+b.m);
    let Bx = (b.vx*(b.m-a.m)+2*a.m*a.vx)/(a.m+b.m);
    a.vx=Ax;
    b.vx=Bx;
    //y direction
    let Ay = (a.vy*(a.m-b.m)+2*b.m*b.vy)/(a.m+b.m);
    let By = (b.vy*(b.m-a.m)+2*a.m*a.vy)/(a.m+b.m)
    a.vy=Ay;
    b.vy=By;
}

class SpriteObject extends GameObject{
    constructor(img, x, y, mass, timeout, frame_w, frame_h, no_of_frames_in_row){
        super(img,x,y,timeout);
        this.no_of_frames = no_of_frames_in_row;
        this.frame=0;
        this.w = frame_w;
        this.h = frame_h;
        this.m=mass;
        this.imData = getImageData(this.img,this.w, this.h);
        console.log(this);
    }


    

    update(spriteObjects){
        //For the moment one frame only
        //this.frame = (this.frame+1)%this.no_of_frames; 
        this.x+=this.vx;
        this.y+=this.vy;
        if (this.x>180 || this.x<-180) this.vx=-this.vx;
        //console.log(spriteObjects);
        for (let i=0; i<spriteObjects.length; i++){
            if (spriteObjects[i]==this) continue; 
            if (this.checkColisionWith(spriteObjects[i])){
                //new_velocities(this,spriteObjects[i]);
                this.vx = spriteObjects[i].vx+this.vx;
                spriteObjects[i].vx=this.vx-spriteObjects[i].vx;
                this.vx=this.vx-spriteObjects[i].vx;
            }
        }
        setTimeout(this.update.bind(this,spriteObjects),this.timeout);
    }

    draw(ctx){
        ctx.save();
        ctx.translate(300,100);
        ctx.scale(-1,1);
        ctx.drawImage(this.img,
            this.frame*this.img.width/this.no_of_frames,0,
            this.w,this.h,
            this.x, this.y,
            this.w, this.h);
        ctx.restore();
        //console.log(this.x, this.y, this.vx, this.vy);
    }

    checkColisionWith(spriteObject){
        if (Math.abs(spriteObject.x - this.x) <(this.w+spriteObject.w)/2 
            && 
            Math.abs(spriteObject.y-this.y)<(this.h+spriteObject.h)/2) {
            //console.log("BBox colide");
            if (this.detailedColision(spriteObject)){
                return true;
            }
        }
        return false;
    }

    pixelAtPoint(_x,_y){
        if (_x<this.x || _x>this.x+this.w) return -1;
        if (_y<this.y || _y>this.y+this.h) return -1;
        let p = (_y-this.y)*this.w + _x-this.x;
        return p; 
    }
    
    colorAtPoint(_x,_y){
        if (_x<this.x || _x>this.x+this.w) return 0;
        if (_y<this.y || _y>this.y+this.h) return 0;
        let p = (_y-this.y)*this.w + _x-this.x;
        if (p<0 || p>=this.w*this.h) return 0;
        return this.imData.data[4*p+3]
    }

    detailedColision(spriteObject){
        //Sprawdzamy wszystkie pixle z obszaru przecięcie bounding boxów
        let _xMin = Math.max(this.x, spriteObject.x);
        let _yMin = Math.max(this.y,spriteObject.y);
        let _xMax = Math.min(this.x, spriteObject.x)+this.w;
        let _yMax = Math.min(this.y, spriteObject.y)+this.h;
        for (let tx = _xMin; tx<=_xMax; tx++){
            for (let ty=_yMin;ty<=_yMax; ty++){
                if (
                    this.colorAtPoint(tx,ty) != 0
                    &&
                    spriteObject.colorAtPoint(tx,ty) !=0
                ){
                    return true;
                }
            }
        }
        return false;
    }
    
}