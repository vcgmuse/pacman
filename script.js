let world = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 0, 0, 2, 1, 1, 1, 2],
  [2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2],
  [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

let cherryObject = {
  id: 'fruit',
  x: 5,
  y: 1,
  direction: 'right',
  speed: 1,
};

let pacmanObject = {
  id: 'pacman',
  x: 1,
  y: 1,
};

let ghostObj = {
  id: 'ghost',
  x: 4,
  y: 1,
  direction: 'right',
  speed: 1,
};
let cherry = document.getElementById('cherry');
let objectArray = [];
let score = 0;
let lives = 3;

cherry.style.left = `${cherryObject.x * 50}px`;
cherry.style.top = `${cherryObject.y * 50}px`;
objectArray.push(cherry);

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
  document.getElementById('world').innerHTML = output;
}

function displayGhost() {
  let ghost = document.getElementById('ghost');
  ghost.style.display = 'inline-block';
  ghost.style.left = `${ghostObj.x * 50}px`;
  ghost.style.top = `${ghostObj.y * 50}px`;
}
function displayPacman() {
  let pacman = document.getElementById('pacman');
  pacman.style.left = `${pacmanObject.x * 50}px`;
  pacman.style.top = `${pacmanObject.y * 50}px`;
}
function displayCherry() {
  let cherry = document.getElementById('cherry');
  cherry.style.left = `${cherryObject.x * 50}px`;
  cherry.style.top = `${cherryObject.y * 50}px`;
}

function displayLives() {
  document.getElementById('lives').textContent = lives;
}
function displayScore() {
  document.getElementById('score').textContent = score;
  if (score > 10 && objectArray.includes(cherry)) {
    cherry.style.display = 'inline-block';
    objectArray.pop();
    displayGhost();
  }
}
function pacmanCollision(elementX, elementY) {
  let pacman = document.getElementById('pacman');
  collisionWithWall(pacmanObject, pacman.id, elementX, elementY);
  collisionWithFruit(pacmanObject, pacman.id);
  collisionWithCoin(pacmanObject, pacman.id);
  collisionWithGhost(pacmanObject, pacman.id, elementX, elementY);
}

function ghostCollision(elementX, elementY) {
  let ghost = document.getElementById('ghost');
  return collisionWithWall(ghostObj, ghost.id, elementX, elementY);
}

function collisionWithWall(element, id, elementX, elementY) {
  let tempX = elementX;
  let tempY = elementY;
  if (world[element.y][element.x] === 2) {
    element.x = tempX;
    element.y = tempY;
    console.log(id, 'Ran into Wall');
    return true;
  } else {
    return false;
  }
}
function collisionWithCoin(element, id) {
  if (world[element.y][element.x] === 1) {
    world[element.y][element.x] = 0;
    score += 10;
    displayWorld();
    displayScore();
    console.log(id, 'Ate a Coin');
  }
}
function collisionWithFruit(element, id) {
  if (element.y === cherryObject.y && element.x === cherryObject.x) {
    cherryObject.y = undefined;
    cherryObject.x = undefined;
    let object = document.getElementById(`cherry`);
    object.remove();
    object.style.display = 'none';
    score += 50;
    console.log(id, 'Ate a Cherry');
  }
}
function collisionWithGhost(
  elementOne,
  elementOneId,
  elementTwo,
  elementTwoId
) {
  if (elementOne.y === elementTwo.y && element.x === elementTwo.x) {
    let element = document.getElementById(`${elementOneId}`);
    element.remove();
    lives--;
    displayLives();
    console.log('Lost a Life');
  }
}
let movingObject = [];
movingObject.push(ghostObj);
// movingObject.push(cherryObject);
setInterval(() => moveObject(movingObject), 300);

function moveObject(object) {
 
  for (objectInstance of object) {
    let directions = [];
    let cornerCount = 0;
    switch (objectInstance.id) {
      case 'ghost':
        displayGhost();
        break;
      case 'pacman':
        displayPacman();
        break;
      case 'fruit':
        displayCherry();
        break;
    }
      let corners = [
        [world[objectInstance.y + 1][objectInstance.x] !== 2, 'down'],
        [world[objectInstance.y - 1][objectInstance.x] !== 2, 'up'],
        [world[objectInstance.y][objectInstance.x + 1] !== 2, 'right'],
        [world[objectInstance.y][objectInstance.x - 1] !== 2, 'left'],
      ];

      for (let direction of corners) {
        if (direction[0] === true) {
          directions.push(direction[1]);
          cornerCount++;
        }
      }
      console.log(directions)
      if (!directions.includes(objectInstance.direction)) {
        let randomDirection = Math.floor(Math.random() * directions.length);
        console.log(directions.length)
        objectInstance.direction = directions[randomDirection];
      }
      switch (objectInstance.direction) {
        case 'right':
          objectInstance.x += objectInstance.speed;
          break;
        case 'left':
          objectInstance.x -= objectInstance.speed;
          break;
        case 'up':
          objectInstance.y -= objectInstance.speed;
          break;
        case 'down':
          objectInstance.y += objectInstance.speed;
          break;
      }
      cornerCount = 0;
    }
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
    pacmanCollision(tempX, tempY);
    console.log(world[pacmanObject.y][pacmanObject.x]);
    displayPacman();
  });

displayWorld();
displayPacman();
