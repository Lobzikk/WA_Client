/** @type {HTMLCanvasElement} */
const canvas=document.querySelector('canvas');
[canvas.height,canvas.width]=[window.innerHeight,window.innerWidth];
const ctx=canvas.getContext("2d");
const [windowWidth,windowHeight]=[window.innerWidth,window.innerHeight];
ctx.strokeStyle='#fff';
ctx.lineWidth=5;
const randomColor = function () {
    return `hsla(${Math.random()*255},100%,50%,${Math.random()*0.5+0.5})`
}
class Circle {
    constructor(x, y, dx, dy, fillColor, _radius, _beginAngle, _endAngle, _clockwise, elasticity) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.fillColor = fillColor;
        this.elasticity = elasticity;
        this.radius = 50;
        this.beginAngle = 0;
        this.endAngle = Math.PI * 2;
        this.clockwise = true;
        this.draw = function () {
            ctx.beginPath(); //without this there would be a line to the circle
            ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, this.beginAngle, this.endAngle, this.clockwise); //x,y,radius,start angle in radians,end angle in radians, drawn clockwise or not
            ctx.fillStyle=fillColor;
            ctx.fill();
            ctx.stroke();
        };
    }
}
const g=0.1;
let circles=[];
let speed = 1;
const speedCoefficient=1.1;
let spacePressed=false;
function newRandomVelocityCircle() {
    circles.push(new Circle(Math.random()*windowWidth*0.8+100,Math.random()*windowHeight*0.65+100,(Math.random()-0.5)*8,0,randomColor(),0));
}
newRandomVelocityCircle();
window.addEventListener('keydown',(eventInfo)=>{
    if (eventInfo.key==' ') {
        spacePressed=true;
    }
},false);
canvas.addEventListener('click',(event)=>{
    if (event.offsetX>windowWidth/2) { //clicking on the right speeds up the ball
        speed*=speedCoefficient;
    }
    else {
        speed/=speedCoefficient; //clicking on the left slows down the ball
    }
});
ctx.font='20px system-ui';
setInterval(() => {
    ctx.clearRect(0,0,windowWidth,windowHeight);
    circles.forEach(circle=>{
        circle.dy+=g*speed;
        if (circle.y>=windowHeight-circle.radius) {
            circle.dy*=-0.95;
        }
        if (circle.x<circle.radius){
            circle.dx*=-0.95;
        }
        if (circle.x>windowWidth-circle.radius) {
            circle.dx*=-0.95;
        }
        if (spacePressed) {
            spacePressed=false;
            circle.dy-=7;
        }
        circle.x+=circle.dx*speed;
        circle.y+=circle.dy*speed;
        circle.draw();
        ctx.fillStyle="#000";
        ctx.fillText('Loading WA stealthy client...',0,20);
        // ctx.fillText(`DY: ${circle.dy}`,0,40);
        // ctx.fillText(`DX: ${circle.dx}`,0,60);
    });
}, 1000/100);