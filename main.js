var mainState = {
  preload: function() {
    game.stage.backgroundColor = '#3498db';
  },
  create: function() {
  },
  update: function() {
  }
};

var game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');
