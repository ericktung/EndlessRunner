let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Play,GameOver ]
  
}

let game = new Phaser.Game(config);
let keyENTER,keyLEFT,keyRIGHT,keyUP,keyDOWN;