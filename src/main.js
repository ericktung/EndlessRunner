let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 16;

let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 576,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
       
    },
    scene: [ Menu, Play, GameOver ]
  
}

let game = new Phaser.Game(config);
let keyENTER,keyLEFT,keyRIGHT,keyUP,keyDOWN;