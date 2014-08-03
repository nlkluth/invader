var bootState = {
  preload: function() {
    game.load('progressBar', 'assets/progressBar.png');
  },

  create: function() {
    game.state.backgroundColor = '#3498db';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start('load');
  }
};
