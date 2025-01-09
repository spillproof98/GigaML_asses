// Elements
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const player1ScoreElem = document.getElementById("player1-score");
const player2ScoreElem = document.getElementById("player2-score");

canvas.width = 800;
canvas.height = 600;

// Game Variables
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 2;
let player1Score = 0;
let player2Score = 0;
let isGameRunning = false;

// Game Functions
function movePaddles(e) {
    if (e.key === "w") player1Y -= 20;
    if (e.key === "s") player1Y += 20;
    if (e.key === "ArrowUp") player2Y -= 20;
    if (e.key === "ArrowDown") player2Y += 20;
}

function updateGame() {
    if (!isGameRunning) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height - ballSize) ballSpeedY *= -1;

    if (ballX <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight) ballSpeedX *= -1;
    if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= player2Y && ballY <= player2Y + paddleHeight) ballSpeedX *= -1;

    if (ballX <= 0) {
        player2Score++;
        resetBall();
    }

    if (ballX >= canvas.width) {
        player1Score++;
        resetBall();
    }

    if (player1Score === 10 || player2Score === 10) {
        isGameRunning = false;
        alert(player1Score === 10 ? "Player 1 Wins!" : "Player 2 Wins!");
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    player1ScoreElem.textContent = `Player 1: ${player1Score}`;
    player2ScoreElem.textContent = `Player 2: ${player2Score}`;
}

function gameLoop() {
    updateGame();
    draw();
    requestAnimationFrame(gameLoop);
}

// Screen Navigation
function startGame(mode) {
    menuScreen.classList.remove("active");
    gameScreen.classList.add("active");
    isGameRunning = true;

    if (mode === "ai") {
        // AI logic here
        setInterval(() => {
            if (ballY > player2Y + paddleHeight / 2) player2Y += 5;
            if (ballY < player2Y + paddleHeight / 2) player2Y -= 5;
        }, 30);
    }

    gameLoop();
}

function goBack() {
    gameScreen.classList.remove("active");
    menuScreen.classList.add("active");
    isGameRunning = false;
}

// Initialize
document.addEventListener("keydown", movePaddles);
menuScreen.classList.add("active");
