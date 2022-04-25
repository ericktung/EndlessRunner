class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity) {

        super(scene, x, y, texture, velocity);
        scene.add.existing(this);
        scene.physics.add.existing(this);       // creates the player with physics
        this.setTexture(texture);
        this.body.setAllowGravity(true);
        //this.setFriction(0);                  // doesn't work

        this.moveSpeed = 2;
        
    }
   create(){
        // QOL: possibly add controls here, we already have controls in Play.js
        
   }
    
    
    // position reset
    reset() {
        this.x = game.config.width;
    }
}