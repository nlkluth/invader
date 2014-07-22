/* global Phaser: false */
var player, cursor, walls, coin, scoreLabel, score,
  game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

var mainState = {
  preload: function() {
    game.load.image('player', 'assets/player.png');
    game.load.image('wallV', 'assets/wallVertical.png');
    game.load.image('wallH', 'assets/wallHorizontal.png');
    game.load.image('coin', 'assets/coin.png');
  },

  create: function() {
    game.stage.backgroundColor = '#3498db';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;

    cursor = game.input.keyboard.createCursorKeys();
    coin = game.add.sprite(60, 140, 'coin');
    game.physics.arcade.enable(coin);
    coin.anchor.setTo(0.5, 0.5);

    scoreLabel = game.add.text(30, 30, 'score: 0', {
      font: '18px Arial',
      fill: '#ffffff'
    });

    score = 0;

    this.createWorld();
  },

  update: function() {
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.overlap(player, coin, this.takeCoin, null, this);
    this.movePlayer();

    if (!player.inWorld) {
      this.playerDie();
    }
  },

  movePlayer: function() {
    if (cursor.left.isDown) {
      player.body.velocity.x = -200;
    } else if (cursor.right.isDown) {
      player.body.velocity.x = 200;
    } else {
      player.body.velocity.x = 0;
    }

    if (cursor.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -320;
    }
  },

  createWorld: function() {
    walls = game.add.group();
    walls.enableBody = true;
    game.add.sprite(0, 0, 'wallV', 0, walls); // Left
    game.add.sprite(480, 0, 'wallV', 0, walls); // Right
    game.add.sprite(0, 0, 'wallH', 0, walls); // Top left
    game.add.sprite(300, 0, 'wallH', 0, walls); // Top right
    game.add.sprite(0, 320, 'wallH', 0, walls); // Bottom left
    game.add.sprite(300, 320, 'wallH', 0, walls); // Bottom right
    game.add.sprite(-100, 160, 'wallH', 0, walls); // Middle left
    game.add.sprite(400, 160, 'wallH', 0, walls); // Middle right

    var middleTop = game.add.sprite(100, 80, 'wallH', 0, walls);
    middleTop.scale.setTo(1.5, 1);
    var middleBottom = game.add.sprite(100, 240, 'wallH', 0, walls);
    middleBottom.scale.setTo(1.5, 1);

    walls.setAll('body.immovable', true);
  },

  playerDie: function() {
    game.state.start('main');
  },

  takeCoin: function(player, coin) {
    coin.kill();
    score += 5;
    scoreLabel.text = 'score: ' + score;
  }
};

game.state.add('main', mainState);
game.state.start('main');
