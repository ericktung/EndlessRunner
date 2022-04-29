class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity){
        super(scene, x, y, texture, velocity).setOrigin(0.2, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setTexture(texture);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.enableBody();
        this.setVelocityX(velocity);

        this.setScale(3);        // Randomizes size of obstacle (subject to tweaking)
        this.setDepth(9);

        this.playerPass = true;
    }

    update() {
        
        if (this.getTopRight.x < -10){
            this.destroy();
        }
        if (this.getTopRight.x < game.config.width / 3 && this.playerPass) {
            this.playerPass = false;
            this.scene.addObstacle();
        }
}
}