class Platforms extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity) {

        super(scene, x, y, texture, velocity).setOrigin(0.1, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setTexture(texture);
        this.setVelocityX(velocity);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setFriction(0, [0])

        this.setScale(Math.floor(Math.random() * 64), [Math.floor(Math.random() * 24)]);

        this.length = length;
        this.playerEnd = true;

    }

    update() {

        if (this.getTopRight.x < 0) {
            this.destroy();
        }
        if (this.playerEnd && this.getTopRight().x <= game.config.width) {
            this.playerEnd = false;
            this.scene.addPlatform();
        }
    }
    
}