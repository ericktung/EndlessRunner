class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity) {

        // Creates rectangle with randomized X and Y
        // Spawns rectangle slightly off screen to the right, note the setOrigin(0.1, 0)
        super(scene, x, y, texture, velocity).setOrigin(0.1, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setTexture(texture);       // sets physics variables
        this.setVelocityX(velocity);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setFriction(0);
        this.enableBody();

        this.scaleX = Math.ceil(Math.random() * (32 - 8) + 8);
        this.scaleY = Math.ceil(Math.random() * 24);

        this.setScale(this.scaleX, this.scaleY);        // Randomizes size of rectangle (subject to tweaking)
        this.setDepth(8);

        this.length = length;
        this.playerEnd = true;      // old variables

        this.colorList = [
            0xF73D6E,           // sherbet
            0xF7693D,           // orange
            0xF73DCB,           // hot pink
            0xFFC700,           // yellow
            0xFF0038            // red
        ];

        this.tint = this.colorList[0]             //this.colorList[Math.floor(Math.random() * 5)];


    }
    update() {

        if (this.getTopRight.x < 0) {       // destroys rectangle once the last pixel of it reaches the left of the screen
            this.destroy();
        }
        if (this.playerEnd && this.getTopRight().x <= game.config.width * 2) {      // only calls when last pixel touches right side of screen
            this.playerEnd = false;         // recursively calls function to permanentaly spawn platforms
            this.scene.addPlatform();
        }
    }
    
    
}
