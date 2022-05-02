/*
Heart Breakout!
Created by: Andy Eng, Ashley Lu, Erick Tung, Siwen Tao
Completed: 5/1/2022

Creative Tilt:
Does the game do something technically interesting? 
We believe the logic for generating platforms and obstacles justifies the points in this category.
Obstacle logic: Play.js line 395
Two-hit death logic: Play.js line 413

Does the game have a great visual style?
The artwork in the game is high quality.
*/

let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 16;
let highScore = 0;
let playerScore = 0;
let playerDeath = false;
let playerMuted = false;

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
    scene: [ Load , Menu , Controls , Play , GameOver ]
  
}

let game = new Phaser.Game(config);
let keyENTER, keyUP, keySPACE;