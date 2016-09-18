var Chest = function(x, y) {
    this.sprite = 'images/chest.png';
    //Set the image for chest which is for the end of the game
    this.x = x;
    this.y = y;
    //Set chest positions
};
Chest.prototype.update = function(dt) {};
//Update chest position
Chest.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Render chest to the canvas
chest = new Chest(-1000, -1000);
//Create new chest object and place it outside of canvas
var Key = function(x, y) {
    this.sprite = 'images/Key.png';
    //Set the image for the key
    this.x = x;
    this.y = y;
    //Set key positions
};
Key.prototype.update = function(dt) {
    if (player.y < 50) {
        key.y = -300;
        allEnemies.forEach(function(enemy) {
            enemy.x = -300;
            enemy.y = -300;
            enemy.speed = 0;
        });
        chest.x = 0;
        chest.y = 0;
    }
};
//Update key position when player reaches to the key and place chest image to the center of canvas
Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Render key to the canvas
key = new Key(200, -10);
//Create new key
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
//Set the image for the player and set positions
Player.prototype.update = function(dt) {
};
//Update player's position
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Render player on the canvas
Player.prototype.handleInput = function(pressedKey) {
    if (chest.x == 0) {
        if (pressedKey == 'space') {
            location.reload();
        }
    }
    //Space key is active and can reload the game when the player reaches to the key and chest image is placed in the middle of the canvas
    else {
        if (pressedKey == 'left' && this.x > 50) {
            this.x = this.x - 100;
        } else if ((pressedKey == 'up' && this.y > 0 && this.x == 200) || (pressedKey == 'up' && this.y > 100)) {
            this.y = this.y - 80;
        } else if (pressedKey == 'right' && this.x < 400) {
            this.x = this.x + 100;
        } else if (pressedKey == 'down' && this.y < 380) {
            this.y = this.y + 80;
        }
    }
    //As long as chest image is not placed in the canvas, regular control keys are available
};
player = new Player(200, 380);
//Create new player
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    //Set the images for the enemy
    this.x = x;
    this.y = y;
    //Set the enemy's position
    this.speed = Math.floor((Math.random() + 1) * 50);
    //Set the enemy's moving speed
};
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > ctx.canvas.width) {
        this.x = -80;
    }
    //Update enemy position: when enemy hits the end of the canvas it starts over from other side of the canvas
    if (this.x + 70 >= player.x && this.x <= player.x + 70 && this.y >= player.y && this.y <= player.y + 70) {
        player.x = 200;
        player.y = 380;
    }
    //Setting enemy and player collision
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Render enemy on the canvas
allEnemies = [new Enemy(50, 60), new Enemy(-50, 140), new Enemy(-300, 140), new Enemy(-100, 220)];
//Set enemy's starting position in array
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});