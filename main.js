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
  }
};

game.state.add('main', mainState);
game.state.start('main');
