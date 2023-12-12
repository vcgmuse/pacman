let world = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2],
  [2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2],
  [2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

function displayWorld() {
  let output = '';
  for (let i = 0; i < world.length; i++) {
    output += "<div class='row'>";
    for (let j = 0; j < world[i].length; j++) {
      if (world[i][j] === 2) {
        output += "<div class='brick'></div>";
      } else if (world[i][j] === 1) {
        output += "<div class='coin'></div>";
      } else if (world[i][j] === 0) {
        output += "<div class='empty'></div>";
      }
    }
    output += '</div>';
  }
  //   console.log(output);
  document.getElementById('world').innerHTML = output;
}
let score = 0;
let lives = 3;
let cherries = {
  x: 5,
  y: 1
}
let pacmanObject = {
  x: 1,
  y: 1,
};
let ghostObj = {
  x: 1,
  y: 1,
};

function displayGhost(){
  let ghost = document.getElementById('ghost');
  ghost.style.display = 'inline-block'
  ghost.style.left = `${ghostObj.x * 50}px`;
  ghost.style.top = `${ghostObj.y * 50}px`;
}
function displayPacman() {
  let pacman = document.getElementById('pacman');
  pacman.style.left = `${pacmanObject.x * 50}px`;
  pacman.style.top = `${pacmanObject.y * 50}px`;
}
function displayCherry(){
  let cherry = document.getElementById('cherry');
  cherry.style.left = `${cherry.x * 50}px`;
  cherry.style.top = `${cherry.y * 50}px`;
}
let cherry =  document.getElementById('cherry');

cherry.style.left = `${cherries.x*50}px`;
cherry.style.top = `${cherries.y*50}px`;
let objectArray = [];
objectArray.push(cherry)
function displayLives(){
  document.getElementById('lives').textContent = lives;

}
function displayScore() {
  document.getElementById('score').textContent = score;
 
    if(score > 350 && objectArray.includes(cherry)){
      cherry.style.display = 'inline-block'
      objectArray.pop();
      displayGhost();
    }
}

displayWorld();
displayPacman();
setInterval(moveGhost,200);
function moveGhost(){
  let tempX = ghostObj.x;
  let tempY = ghostObj.y;
  let upAndDown = world[ghostObj.y+1][ghostObj.x]!== 2 || world[ghostObj.y-1][ghostObj.x]!==2;
  let lefAndRight = world[ghostObj.y][ghostObj.x+1]!== 2 || world[ghostObj.y][ghostObj.x-1]!==2;
  if(upAndDown || lefAndRight){
    ghostObj.x += Math.floor(Math.random() * 3) - 1;
    ghostObj.y += Math.floor(Math.random() * 3) - 1;
  }
  console.log(ghostObj.x, ghostObj.y)
  if (world[ghostObj.y][ghostObj.x] === 2) {
    ghostObj.x = tempX;
    ghostObj.y = tempY;
    displayGhost();  
    console.log('world', world[ghostObj.y][ghostObj.x]);
    console.log('collision', pacmanObject.x, pacmanObject.y);
  }
  displayGhost();
  
}
document.addEventListener('keydown', (e) => {
  let tempX = pacmanObject.x;
  let tempY = pacmanObject.y;
  if (e.key === 'ArrowLeft') {
    pacman.style.transform = 'rotate(180deg)';
    pacmanObject.x--;
  } else if (e.key === 'ArrowRight') {
    pacman.style.transform = 'rotate(0deg)';
    pacmanObject.x++;
  } else if (e.key === 'ArrowUp') {
    pacman.style.transform = 'rotate(270deg)';
    pacmanObject.y--;
  } else if (e.key === 'ArrowDown') {
    pacman.style.transform = 'rotate(90deg)';
    pacmanObject.y++;
  }
  if (world[pacmanObject.y][pacmanObject.x] === 2) {
    pacmanObject.x = tempX;
    pacmanObject.y = tempY;
    displayPacman();  
    console.log('world', world[pacmanObject.y][pacmanObject.x]);
    console.log('collision', pacmanObject.x, pacmanObject.y);
  }
  if(pacmanObject.y === cherries.y && pacmanObject.x === cherries.x){
    let element = document.getElementById('cherry');
    element.remove();
    score += 50;
    console.log('Over Each Other')
  }
  if(pacmanObject.y === ghostObj.y && pacmanObject.x === ghostObj.x){
    let element = document.getElementById('pacman');
    element.remove();
    lives--;
    displayLives();
    console.log('Lost a Life')
  }
  console.log(world[pacmanObject.y][pacmanObject.x]);
  if (world[pacmanObject.y][pacmanObject.x] === 1) {
    world[pacmanObject.y][pacmanObject.x] = 0;
    score += 10;
    displayWorld();
    displayScore();
  }
  displayPacman();
});
