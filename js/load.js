'use strict';

var loadState = {
  preload: function() {
    var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', {
      font: '30px Arial',
      fill: '#ffffff'
    });

    loadingLabel.anchor.setTo(0.5, 0.5);

    var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);

    game.load.image('player', 'assets/player.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('wallV', 'assets/wallVertical.png');
    game.load.image('wallH', 'assets/wallHorizontal.png');
    game.load.image('background', 'assets/background.png');

    game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mpg3']);
    game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mpg3']);
    game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mpg3']);
  },

  create: function() {
    game.state.start('menu');
  }
};
