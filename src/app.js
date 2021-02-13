const forest = document.getElementById("gameArea");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const context = forest.getContext('2d');

const shield = {
    x : forest.width/2 ,
    y : 4*(forest.height/5)-50, 
    width : 50,
    height : 10,
    score : 0,
    lives : 5,
    color : "BLACK"
}

const ball = {
    x : forest.width/2,
    y : 22,
    radius : 20,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "BLACK"
}

function drawText(text,x,y){
    context.fillStyle = "BLUE";
    context.font = "25px fantasy";
    context.fillText(text, x, y);
}

function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,true);
    context.closePath();
    context.fill();
}

function resetBall(){
    ball.x = forest.width/2;
    ball.y = 22;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}
    

forest.addEventListener("mousemove", getMousePos);

function getMousePos(event){

    let rect = forest.getBoundingClientRect();
    shield.x=event.clientX - rect.left - shield.width/2;
}

function collision(ball,player){

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;
    
    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}

function update(){

    if(shield.lives<=0){
        window.location.replace("playnow.html");
    }
    
    shield.score +=1
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    if(ball.y - ball.radius < 0 ){
        ball.velocityY = -ball.velocityY;
    }

    if(ball.x + ball.radius>forest.width || ball.x-ball.radius<0){
        ball.velocityX=-ball.velocityX
    }

    if(collision(ball,shield)){
        
        let collidePoint = (ball.x - (shield.x + shield.width/2));
        collidePoint = collidePoint / (shield.width/2);
        let angleRad = (Math.PI/4) * collidePoint;
        
        let direction = (ball.x + ball.radius < shield.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
    }  
        
    if(ball.y+ball.radius > shield.y+shield.height+20){
        shield.lives-=1 
        resetBall();
     }  
}

function game(){
    update()
    drawRect(0,0,forest.width,forest.height,"WHITE")
    drawRect(shield.x,shield.y,shield.width,shield.height,shield.color)
    drawText("Score:"+shield.score,3*(forest.width/4),forest.height/5);
    drawText("Lives:"+shield.lives,forest.width/5,forest.height/5);
    drawCircle(ball.x,ball.y,ball.radius,ball.color)

}

setInterval(game,20)




