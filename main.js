/* global Phaser: false */
var player, cursor,
  game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');

var mainState = {
  preload: function() {
    game.load.image('player', 'assets/player.png');
  },
  create: function() {
    game.stage.backgroundColor = '#3498db';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;

    cursor = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    this.movePlayer();
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
  }
};

game.state.add('main', mainState);
game.state.start('main');
