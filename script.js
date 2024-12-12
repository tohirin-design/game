const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: getRandomTile(), y: getRandomTile() };
let velocity = { x: 0, y: 0 };
let score = 0;

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    resetGame();
    return;
  }
  drawGame();
}

function moveSnake() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    food = { x: getRandomTile(), y: getRandomTile() };
  } else {
    snake.pop();
  }
}

function drawGame() {
  ctx.fillStyle = "#162447";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "#e94560";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Draw snake
  ctx.fillStyle = "#1f4068";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize,
      gridSize
    );
  });
}

function checkCollision() {
  const head = snake[0];

  // Check wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }

  // Check self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}

function changeDirection(event) {
  const key = event.key;

  if (key === "ArrowUp" && velocity.y === 0) {
    velocity = { x: 0, y: -1 };
  } else if (key === "ArrowDown" && velocity.y === 0) {
    velocity = { x: 0, y: 1 };
  } else if (key === "ArrowLeft" && velocity.x === 0) {
    velocity = { x: -1, y: 0 };
  } else if (key === "ArrowRight" && velocity.x === 0) {
    velocity = { x: 1, y: 0 };
  }
}

function resetGame() {
  alert("Game Over! Your score: ${score}");
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  food = { x: getRandomTile(), y: getRandomTile() };
}

function getRandomTile() {
  return Math.floor(Math.random() * tileCount);
}

document.addEventListener("keydown", changeDirection);
setInterval(gameLoop, 100); // Adjust speed by changing interval (milliseconds)
