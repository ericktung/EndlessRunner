class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity){
        super(scene, x, y, texture).setOrigin(0.2, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setTexture(texture);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.enableBody();
        this.setVelocityX(velocity);
        this.setDepth(9);
        
        if (texture == 'Bouquet') {
            this.setScale(0.75);
        }
        if (texture == 'heartSpikes') {
            this.setScale(1, 0.5);
        }
        if (texture == 'Obstacle') {
            this.setScale(3);
        }
        
        this.playerPass = true;
    }

    update() {
        
        if (this.getTopRight.x < -10){
            this.destroy();
        }
        if (playerDeath == true) {
            this.body.moves = false;
        }
        
}
}