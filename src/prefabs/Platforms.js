class Platforms extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, length, texture, velocity) {
        super(scene, x, y, 'platformTile');
        scene.add.existing(this);   // add to existing scene
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.playerEnd = true;
        
    }

    update() {
        if (this.x < -this.width) {
            this.destroy();
        }
        if (this.playerEnd && this.x < game.config.width / 3) {
            this.playerEnd = false;
            this.scene.addPlatform(this.parent, this.x, this.y, this.length, this.velocity);
        }
    }
    createPlatform() {
        for (let i = this.x; i <= this.x + this.length; i += tileSize) {
            for (let u = this.y; u <= game.config.height; u += tileSize){
                   let tileFloor = this.physics.add.sprite(i, u, 'platformTile').setScale(1).setOrigin(0);
                   tileFloor.body.setImmovable(true);
                   tileFloor.body.setAllowGravity(false);
            }
        }
        console.log('hi from createPlatform');
    }
}