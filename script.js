const bird = document.getElementById('bird');
const gameArea = document.getElementById('game');
let birdY = 250; // Initial vertical position
let gravity = 2; // Gravity effect
let jumpStrength = 50; // Jump strength
let gameRunning = false;
let score = 0;

function applyGravity() {
    if (gameRunning) {
        birdY += gravity;
        bird.style.top = `${birdY}px`; // Update bird's vertical position
        checkCollision();
    }
}

function jump() {
    if (gameRunning) {
        birdY -= jumpStrength; // Move the bird up on jump
        bird.style.top = `${birdY}px`;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === "Space") {
        jump();
    }
});

// Start the game
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        setInterval(applyGravity, 24); // Apply gravity to the bird every 24 milliseconds
        setInterval(createPipe, 2000); // Create new pipes every 2 seconds
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === "Space") {
        startGame();
    }
});

// Pipe Generation and Movement
let pipeSpeed = 2; // Speed at which the pipes move to the left
let pipeInterval = 2000; // Interval in milliseconds to release new pipes

function createPipe() {
    const pipePair = document.createElement('div');
    const upperPipe = document.createElement('div');
    const lowerPipe = document.createElement('div');

    pipePair.className = 'pipe-pair';
    upperPipe.className = 'pipe upper';
    lowerPipe.className = 'pipe lower';

    const pipeGap = 150;
    const upperPipeHeight = Math.floor(Math.random() * (gameArea.clientHeight - pipeGap));
    const lowerPipeHeight = gameArea.clientHeight - upperPipeHeight - pipeGap;

    upperPipe.style.height = `${upperPipeHeight}px`;
    lowerPipe.style.height = `${lowerPipeHeight}px`;

    pipePair.appendChild(upperPipe);
    pipePair.appendChild(lowerPipe);
    pipePair.style.left = '100%';

    gameArea.appendChild(pipePair);

    function movePipe() {
        const pipeCurrentPosition = parseInt(pipePair.style.left, 10);
        pipePair.style.left = `${pipeCurrentPosition - pipeSpeed}px`;

        if (pipeCurrentPosition + pipePair.offsetWidth < 0) {
            pipePair.remove();
            score++;
            updateScoreDisplay();
        }
    }

    const moveInterval = setInterval(movePipe, 20); // Move the pipe every 20ms
}

// Collision Detection
function checkCollision() {
    const birdRect = bird.getBoundingClientRect();
    const gameRect = gameArea.getBoundingClientRect();
    const pipes = document.getElementsByClassName('pipe');

    for (let pipe of pipes) {
        const pipeRect = pipe.getBoundingClientRect();
        if (birdRect.left < pipeRect.right &&
            birdRect.right > pipeRect.left &&
            birdRect.top < pipeRect.bottom &&
            birdRect.bottom > pipeRect.top) {
            gameOver();
        }
    }

    if (birdRect.bottom >= gameRect.bottom) {
        gameOver();
    }
}

// Game Over Logic
function gameOver() {
    gameRunning = false;
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over-screen').classList.remove('hidden');
}

// Update Score Display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score}`;
}

