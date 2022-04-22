let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play,GameOver ]
}

let game = new Phaser.Game(config);
let keyENTER,keyLEFT,keyRIGHT,keyUP,keyDOWN;