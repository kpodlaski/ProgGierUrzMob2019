class GameObject{

    constructor(img, x, y, timeout){
        this.img = img;
        this.x = x;
        this.y=y;
        this.vx=0;
        this.vy=0;
        this.timeout =timeout;
    }

    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        setTimeout(this.update,this.timeout);
    }

    draw(ctx, width, height){
        ctx.drawImage(this.img,0,0,width,height);
    }
    
}