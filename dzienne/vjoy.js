class VJoy{
    
    constructor(X,Y,R){
        this.x=X;
        this.x=Y,
        this.R=R;
        this.X=X;
        this.Y=Y
    }

    draw(ctx){
        ctx.strokeStyle="#aaaa00"; 
        ctx.beginPath();
        ctx.ellipse(this.X,this.Y,this.R,this.R,1,0,2*Math.PI)
        ctx.stroke();
        ctx.fillStyle="#00fafa"; 
        ctx.beginPath();
        ctx.ellipse(this.x,this.y,5,5,1,0,2*Math.PI)
        ctx.fill();
        ctx.fillStyle="#000000"; 
        ctx.beginPath();
        ctx.ellipse(this.X,this.Y,5,5,1,0,2*Math.PI)
        ctx.fill();
    }

    onclick(ev){
        console.log('klik');
        console.log(ev.pageY);
        let dx = ev.pageX - this.X;
        let dy = ev.pageY - this.Y;
        console.log(dx,dy)
        console.log(dx*dx+dy*dy)
        console.log(vjoy.R*vjoy.R)
        if (dx*dx+dy*dy<this.R*this.R){
            this.x = ev.pageX;
            this.y = ev.pageY;
            console.log("Proper klick");
            kulka.vx=10*dx/this.R;
            kulka.vy=10*dy/this.R;
        }
    
    }
}
