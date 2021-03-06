// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Base speed is 100 while max speed seems to be 500
    var speed = Math.floor(Math.random() * 500) + 100;

    this.x += speed * dt;
    // console.log(this.x + ", " + this.y);
    // This resets the enemy position once the enemy is off the map
    if (this.x > 510) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    // These are the possible position properties for each enemy
    var startingX = [-100, -75, -50, -25];
    var startingY = [60, 140, 220];

    this.x = startingX[Math.floor(Math.random() * startingX.length)];
    this.y = startingY[Math.floor(Math.random() * startingY.length)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
    // Win condition
    if (this.y === -20) {
        scoreWin();
        this.reset();
    } else {
        // Check whether enemy hits player
        for (var i = 0; i < allEnemies.length; i++ ) {
            var enemy = allEnemies[i];
            if (enemy.y === this.y) {
                if (enemy.x >= this.x - 70 && enemy.x <= this.x + 50) {
                    scoreLoss();
                    this.reset();
                }
            }
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // Tiles are spaced 100 by 80
    
    // Baseline position (top left) is 0, -20
    
    // Max x range is 400
    var xRange = [0, 400];

    // Max y range is 380
    var yRange = [-20, 380];

    // Calculate movement amount based on borders
    var upMove = (this.y - 80 >= yRange[0]) ? 80 : 0;
    var rightMove = (this.x + 100 <= xRange[1]) ? 100 : 0;
    var downMove = (this.y + 80 <= yRange[1]) ? 80 : 0;
    var leftMove = (this.x - 100 >= xRange[0]) ? 100 : 0;

    if (key === 'up') {
        this.y -= upMove;
    } else if (key === 'right') {
        this.x += rightMove;
    } else if (key === 'left') {
        this.x -= leftMove;
    } else if (key === 'down') {
        this.y += downMove;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();

var allEnemies = [bug1, bug2, bug3];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var winCount = 0;
var loseCount = 0;

var scoreWin = function() {
    winCount++;
    document.getElementById("win").innerHTML = winCount.toString();
};

var scoreLoss = function() {
    loseCount++;
    document.getElementById("loss").innerHTML = loseCount.toString();
};
