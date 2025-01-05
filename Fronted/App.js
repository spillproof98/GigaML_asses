const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const socket = io("http://localhost:5000");

let gameState = {};
let difficultyMode = "normal";

socket.on("game_state", (state) => {
    gameState = state;
    drawGame();
});

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { ball, paddles, obstacles, scores } = gameState;

    if (ball) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    if (paddles) {
        ctx.fillStyle = "blue";
        ctx.fillRect(20, paddles.player1, 10, 100);
        ctx.fillRect(470, paddles.player2, 10, 100);
    }

    if (obstacles) {
        ctx.fillStyle = "green";
        obstacles.forEach((obs) => {
            ctx.fillRect(obs.x, obs.y, 20, 20);
        });
    }

    if (scores) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Player 1: ${scores.player1}`, 50, 20);
        ctx.fillText(`Player 2: ${scores.player2}`, 350, 20);
    }

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`Mode: ${difficultyMode}`, 200, 20);
}

document.addEventListener("keydown", (e) => {
    const player = "player1";
    let position = gameState.paddles[player];
    let speed = 10;

    if (difficultyMode === "man" && player === "player1") {
        speed = 5;
    } else if (difficultyMode === "kid" && player === "player1") {
        speed = 15;
    }

    if (e.key === "ArrowUp") position -= speed;
    if (e.key === "ArrowDown") position += speed;

    socket.emit("update_paddle", { player, position });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "K" || e.key === "k") {
        difficultyMode = "kid";
    } else if (e.key === "M" || e.key === "m") {
        difficultyMode = "man";
    } else if (e.key === "N" || e.key === "n") {
        difficultyMode = "normal";
    }
});

setInterval(() => {
    socket.emit("update_ball");
}, 16);
