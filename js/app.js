// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.multiplier = Math.floor((Math.random() * 4) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 101 * dt * this.multiplier;

    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
        player.lives--;
        if (player.lives === 0) {
        	// TODO: Add logic here for doing a 'game over'
        }
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + player.lives;
        player.reset();
    }

    // If the bug goes off of the board, reset its position and randomize the multiplier
    if (this.x > 750) {
    	this.multiplier = Math.floor((Math.random() * 4) + 1);
    	this.reset();
    }
};

// Reset the enemy to the left of the board
Enemy.prototype.reset = function() {
	this.x = -200;
	var yVals = [220, 140, 60];
	this.y = yVals[Math.floor((Math.random() * 3))];
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lives = 5;
    this.hold = false; // player is not holding a kitty
    this.color = undefined; // will reflect color of currently held kitty
};

Player.prototype.handleInput = function(dir) {

    if (dir == 'up') {
        this.y = this.y - 80;

    } else if (dir == 'down') {
        this.y = this.y + 80;

    } else if (dir == 'left') {
        this.x = this.x - 101;

    } else if (dir == 'right') {
        this.x = this.x + 101;

    }

    if (this.x < 0 || this.x > 606) {
        this.reset();
    } else if (this.y > 404) {
        this.reset();
    } else if (this.y <= -20 && this.x > 0 && this.x < 606) {
    	// Player has made it to the top colored blocks
    	// Check to see if the block is the right color for the kitty
    	if (this.hold === true) {
    		if (this.color === 'red' && this.x === 101) {
    			this.sprite = 'images/char-cat-girl.png';
    			allKitties[0].x = 101;
    			allKitties[0].y = 20;
    		} else if (this.color === 'orange' && this.x === 202) {
    			this.sprite = 'images/char-cat-girl.png';
    			allKitties[1].x = 202;
    			allKitties[1].y = 20;
    		} else if (this.color === 'green' && this.x === 303) {
    			this.sprite = 'images/char-cat-girl.png';
    			allKitties[2].x = 303;
    			allKitties[2].y = 20;
    		} else if (this.color === 'blue' && this.x === 404) {
    			this.sprite = 'images/char-cat-girl.png';
    			allKitties[3].x = 404;
    			allKitties[3].y = 20;
    		} else if (this.color === 'purple' && this.x === 505) {
    			this.sprite = 'images/char-cat-girl.png';
    			allKitties[4].x = 505;
    			allKitties[4].y = 20;
    		}
    	}
        this.score++;
        document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + this.score;
        this.reset();
    } else if (this.y <= -20 && (this.x === 0 || this.x === 606)) {
    	this.lives--;
    	document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + this.lives;
    	this.reset();
    }

};

Player.prototype.reset = function() {
    this.x = 303;
    this.y = 380;
    this.sprite = 'images/char-cat-girl.png';
    this.hold = false;
    this.color = undefined;
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create the Kitty object
var Kitty = function(color, x, y) {
	this.color = color;
	this.sprite = 'images/cat-' + color + '.png';
	this.x = x;
	this.y = y;
};

Kitty.prototype.update = function () {
    if (this.y === player.y + 50 && this.x === player.x && player.hold === false) {
    	// Change the player's sprite to be the girl 'holding' the correct color kitty
    	player.sprite = 'images/char-cat-girl-' + this.color + '-cat.png';
    	player.hold = true; // player is now holding a kitty
    	player.color = this.color; // player's color matches the kitty's color

    	// Move the kitty sprite to off of the grid so it isn't visible
    	this.x = -100;
    	this.y = -100;
	}
};

Kitty.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var yVals = [220, 140, 60];
for (var i = 0; i < 6; i++) {
    var x = Math.floor((Math.random() * -1000) + 1);
    var y = yVals[Math.floor(Math.random() * 3)];
    enemy = new Enemy(x, y);
    allEnemies.push(enemy);
}

// Instantiate the player
player = new Player(303, 380);

// Instantiate the kitties
var colors = ['red', 'orange', 'green', 'blue', 'purple'];
var xVals = [0, 101, 202, 303, 404, 505, 606];
var yValsKitty = [270, 190, 110];
var allKitties = [];
for (var j = 0; j < 5; j++) {
	var x = xVals[Math.floor(Math.random() * 7)];
	var y = yValsKitty[Math.floor(Math.random() * 3)];
	kitty = new Kitty(colors[j], x, y);
	allKitties.push(kitty);
}


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
