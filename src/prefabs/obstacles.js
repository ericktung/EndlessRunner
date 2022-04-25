class Obstacles extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        
        this.setTexture(texture);
        this.setPosition(x, y);
    }

    update() {
        if (this.player)
    }
}