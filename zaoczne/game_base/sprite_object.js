class SpriteObject extends GameObject{

    constructor(img, x, y, no_of_frames, timeout, w, h){
        super(img,x,y,timeout);
        this.no_of_frames = no_of_frames;
        this.frame=0;
        this.w = w;
        this.h = h;
    }

    update(){
        this.frame = (this.frame+1)%this.no_of_frames; 
        this.x+=this.vx;
        this.y+=this.vy;
        console.log("update sprite");
        setTimeout(this.update.bind(this),this.timeout);
    }

    draw(ctx){
        ctx.save();
        ctx.translate(300,100);
        ctx.scale(-1,1);
        ctx.drawImage(this.img,
            this.frame*this.img.width/this.no_of_frames,0,
            this.img.width/this.no_of_frames,this.img.height,
            this.x, this.y,
            this.w, this.h);
        ctx.restore();
    }
    
}