let world = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

class GhostObj {
  constructor() {
    this._class = 'ghost';
    this._x = 4;
    this._y = 1;
    this._direction = 'right';
    this._speed = 1;
    this._collision = false;
    this._id = GhostObj.idCounter++;
  }
  get id() {
    return this._id;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get direction() {
    return this._direction;
  }
  get speed() {
    return this._speed;
  }
  set x(xPosition) {
    this._x = xPosition;
  }
  set y(yPosition) {
    this._y = yPosition;
  }
  set direction(newDirection) {
    this._direction = newDirection;
  }
  set speed(newSpeed) {
    this._speed = newSpeed;
  }
}
GhostObj.idCounter = 1;

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

function displayGhost(elementId) {
  let ghost = document.createElement('div');
  ghost.classList.add('ghost');
  ghost.id.add(elementId);
  ghost.style.display = 'inline-block';
  ghost.style.left = `${ghostObj.x * 50}px`;
  ghost.style.top = `${ghostObj.y * 50}px`;
}
let movingObject = [];
let ghost1 = new GhostObj(5, 1, 'right', 1);
let ghost2 = new GhostObj(7, 1, 'left', 1);

movingObject.push(ghost1);
movingObject.push(ghost2);
setInterval(() => moveObject(movingObject), 3000);

function moveObject(object) {
  for (objectInstance of object) {
    let directions = [];
    let cornerCount = 0;
    switch (objectInstance.class) {
      case 'ghost':
        displayGhost(objectInstance.id);
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
    console.log(directions);
    if (!directions.includes(objectInstance.direction)) {
      let randomDirection = Math.floor(Math.random() * directions.length);
      console.log(directions.length);
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

displayWorld();
