const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, sankeY = 10;
let snakeBody = [];
let velecityX = 0, velecityY = 0;
let setIntervalId;
let score = 0;

let hightScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${hightScore}`;

const cnhangeFoodPostion = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && velecityY != 1) {
        velecityX = 0;
        velecityY = -1;
    } else if (e.key === 'ArrowDown' && velecityY != -1) {
        velecityX = 0;
        velecityY = 1;
    } else if (e.key === 'ArrowLeft' && velecityX != 1) {
        velecityX = -1;
        velecityY = 0;
    } else if (e.key === 'ArrowRight' && velecityX != -1) {
        velecityX = 1;
        velecityY = 0;
    }

    initGame();
}

const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && sankeY === foodY) {
        cnhangeFoodPostion();
        snakeBody.push([foodX, foodY]);
        score++;

        hightScore = score >= hightScore ? score : hightScore;
        localStorage.setItem("high-score", hightScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${hightScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i-- ) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, sankeY];
    snakeX += velecityX;
    sankeY += velecityY;

    if (snakeX <= 0 || snakeX > 30 || sankeY <= 0 || sankeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
}

cnhangeFoodPostion();
setIntervalId = setInterval(initGame, 125)
document.addEventListener('keydown', changeDirection);