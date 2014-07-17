/* global Phaser: false */
var player, game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');

var mainState = {
  preload: function() {
    game.load.image('player', 'assets/player.png');
  },
  create: function() {
    game.stage.backgroundColor = '#3498db';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
  },
  update: function() {
  }
};

game.state.add('main', mainState);
game.state.start('main');
