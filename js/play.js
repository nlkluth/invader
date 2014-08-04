var player, walls, enemies, scoreLabel, coin, cursor;

var playState = {
  create: function() {
    cursor = game.input.keyboard.createCursorKeys();

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.createMultiple(10, 'enemy');

    coin = game.add.sprite(60, 140, 'coin');
    game.physics.arcade.enable(coin);
    coin.anchor.setTo(0.5, 0.5);

    scoreLabel = game.add.text(30, 30, 'score: 0', {
      font: '18px Arial',
      fill: '#ffffff'
    });

    game.global.score = 0;
    this.createWorld();
    game.time.events.loop(2200, this.addEnemy, this);
  },

  update: function() {
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(enemies, walls);
    game.physics.arcade.overlap(player, coin, this.takeCoin, null, this);
    game.physics.arcade.overlap(player, enemies, this.playerDie, null, this);
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

  addEnemy: function() {
    var enemy = enemies.getFirstDead();

    if (!enemy) {
      return;
    }

    enemy.anchor.setTo(0.5, 1);
    enemy.reset(game.world.centerX, 0);
    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
    enemy.body.bounce.x = 1;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
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

  takeCoin: function() {
    game.global.score += 5;
    scoreLabel.text = 'score: ' + game.global.score;

    this.updateCoinPosition();
  },

  playerDie: function() {
    game.state.start('menu');
  },

  updateCoinPosition: function() {
    var coinPosition = [
      {x: 140, y: 60}, {x: 360, y: 60},
      {x: 60, y: 140}, {x: 440, y: 140},
      {x: 130, y: 300}, {x: 370, y: 300}
    ];

    for (var i = 0; i < coinPosition.length; i++) {
      if (coinPosition[i].x === coin.x) {
        coinPosition.splice(i, 1);
      }
    }

    var newPosition = coinPosition[game.rnd.integerInRange(0, coinPosition.length-1)];
    coin.reset(newPosition.x, newPosition.y);
  }
};
