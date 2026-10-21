// Log a message to the console to ensure the script is linked correctly
// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
let player; //Serves as the entity controlled by player
let playerX; //Global variable to handle player position

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  //Create player entity
  player = document.createElement("div");
  player.className = "player";

  //Set player starting position
  const gameWidth = document.getElementById("game-container").offsetWidth;
  playerX = gameWidth/2 - 30;
  player.style.left = playerX + "px";
  
  //Add player to game
  document.getElementById("game-container").appendChild(player);

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);

  // Create player loop for handling collisions & movement
  requestAnimationFrame(playerHandler);
}
//Handle keypresses
const keys = {
  ArrowRight: false,
  ArrowLeft: false
};
document.addEventListener("keydown", (event) => {
  if (event.key in keys) {
    event.preventDefault();
    keys[event.key] = true;
  }
})
document.addEventListener("keyup", (event) => {
  if (event.key in keys) {
    event.preventDefault();
    keys[event.key] = false;
  }
})

function playerHandler() {
  requestAnimationFrame(playerHandler);
  //Handle left & right movement
  const playerSpeed = 15;
  if (keys["ArrowLeft"]) {
    playerX -= playerSpeed;
  } else if (keys["ArrowRight"]) {
    playerX += playerSpeed;
  } else {
    return;
  }
  player.style.left = `${playerX}px`;
  //Handle score increase whenever player hits a drop of water

  //Handle game end whenever player hits an obstacle
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}
