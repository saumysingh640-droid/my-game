const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const obstacle2 = document.getElementById("obstacle2");
const coin = document.getElementById("coin");
const scoreDisplay = document.getElementById("score");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");


const highScoreDisplay = document.getElementById("highScore");
let highScore = localStorage.getItem("highScore")|| 0;

highScoreDisplay.innerText ="High Score: "+ highScore;

let gameStarted = false;
startBtn.addEventListener("click", function(){

    menu.style.display = "none";

    gameArea.style.display = "flex";

    gameStarted = true;

});

let score = 0;
let currentLane = 1;
let isJumping = false;
let gameOver = false;
let obstaclespeed = 5;
let obstacle2speed = 6;
let level = 1;
let health = 3;

const healthDisplay = document.getElementById("health");
healthDisplay.innerText = "Health: "+health + "❤️"

const lanePositions = [40, 175, 310];

// Obstacle 1
let obstacleTop = 0;
let obstacleLane = Math.floor(Math.random() * 3);

// Obstacle 2
let obstacle2Top = -300;
let obstacle2Lane = Math.floor(Math.random() * 3);

// Coin
let coinTop = 0;
let coinLane = Math.floor(Math.random() * 3);

obstacle.style.left = lanePositions[obstacleLane] + "px";
obstacle2.style.left = lanePositions[obstacle2Lane] + "px";
coin.style.left = lanePositions[coinLane] + "px";

function jump() {

    if (isJumping) return;

    isJumping = true;

    player.style.bottom = "150px";

    setTimeout(function () {
        player.style.bottom = "20px";
        isJumping = false;
    }, 500);
}

document.addEventListener("keydown", function(event){

    if(gameOver) return;

    if(event.key === "a" || event.key === "A"){
        if(currentLane > 0){
            currentLane--;
        }
    }

    if(event.key === "d" || event.key === "D"){
        if(currentLane < 2){
            currentLane++;
        }
    }

    if(event.code === "Space"){
        jump();
    }

    player.style.left = lanePositions[currentLane] + "px";
});

let bgPos = 0;

const gameloop = setInterval(function(){
    if(!gameStarted) {
        return;
    }

    if(gameOver) return;

    // Background movement
    bgPos += 4;
    gameArea.style.backgroundPositionY = bgPos + "px";

    

    // Rest of your code...


    if(gameOver) return;

    score++;
    scoreDisplay.innerText = "Score: " + score;
    if(score>=level*500) {
        obstaclespeed++;
        obstacle2speed++;
        level++;
        console.log(`Level Up!!`);
    }

    // Obstacle 1
    obstacleTop += obstaclespeed;

    if(obstacleTop > 600){
        obstacleTop = 0;
        obstacleLane = Math.floor(Math.random() * 3);
        obstacle.style.left = lanePositions[obstacleLane] + "px";
    }

    obstacle.style.top = obstacleTop + "px";

    // Obstacle 2
    obstacle2Top +=obstacle2speed;

    if(obstacle2Top > 600){
        obstacle2Top = 0;
        obstacle2Lane = Math.floor(Math.random() * 3);
        obstacle2.style.left = lanePositions[obstacle2Lane] + "px";
    }

    obstacle2.style.top = obstacle2Top + "px";

    // Coin
    coinTop += 4;

    if(coinTop > 600){
        coinTop = 0;
        coinLane = Math.floor(Math.random() * 3);
        coin.style.left = lanePositions[coinLane] + "px";
    }

    coin.style.top = coinTop + "px";

    // Coin Collection
    if(
        coinTop > 500 &&
        coinTop < 580 &&
        coinLane === currentLane
    ){
        score += 100;

        coinTop = 0;
        coinLane = Math.floor(Math.random() * 3);
        coin.style.left = lanePositions[coinLane] + "px";
    }

    // Collision Obstacle 1
    if(
        obstacleTop > 500 &&
        obstacleTop < 580 &&
        obstacleLane === currentLane &&
        !isJumping
    ){
       health--;
        healthDisplay.innerText = "Health: " + health + "❤️";
        obstacleTop = 0;
        obstacleLane = Math.floor(Math.random()*3);
       obstacle.style.left = lanePositions[obstacleLane] +"px";
        
    }

    // Collision Obstacle 2
    if(
        obstacle2Top > 500 &&
        obstacle2Top < 580 &&
        obstacle2Lane === currentLane &&
        !isJumping
    ){
        health--;
        healthDisplay.innerText = "Health: " + health + "❤️";
        obstacle2Top = 0;
        obstacle2Lane = Math.floor(Math.random()*3);
        obstacle2.style.left =lanePositions[obstacle2Lane] +"px";
    }
    if(score > highScore){
        highScore = score;

    localStorage.setItem(
        "highScore",
        highScore
    );
    highScoreDisplay.innerText = "High Score: "+highScore;
}
   if(health <= 0){
    gameOver = true;
    clearInterval(gameloop);

    document.getElementById("finalScore").innerText =
        "Final Score: " + score;

    document.getElementById("gameOverScreen").style.display = "block";
}

   

}, 50);
function restartGame(){
    location.reload();
}