let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 16;
let highScore = 0;
let playerScore = 0;
let playerDeath = false;

let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: "endless-runner",
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
       
    },
    scene: [ Load , Menu , Controls , Play, GameOver ]
  
}

let game = new Phaser.Game(config);
let keyENTER, keyUP, keySPACE;