let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 16;

let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: "endless-runner",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
       
    },
    scene: [ Menu, Play, GameOver ]
  
}

let game = new Phaser.Game(config);
let keyENTER,keyLEFT,keyRIGHT,keyUP,keyDOWN;