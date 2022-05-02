class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, velocity) {

        // Creates rectangle with randomized X and Y
        // Spawns rectangle slightly off screen to the right, note the setOrigin(0.1, 0)
        super(scene, x, y, 'groundBlock').setOrigin(0.1, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocityX(velocity);        // sets physics variables
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setFriction(0);
        this.enableBody();

        this.scaleX = Math.ceil(Math.random() * (32 - 8) + 8);
        this.scaleY = Math.ceil(Math.random() * 24);

        this.setScale(this.scaleX, this.scaleY);        // Randomizes size of rectangle (subject to tweaking)


        this.playerEnd = true;      // old variables

        this.colorList1 = [
            0xF73D6E,           // pink gradient
            0xF50A49,           
            0xC4083A,           
            0xAB0733,           
            0x93062C,
            0x7A0524,
            0x62041D,
            0x490316,
            0x31020F            
        ];

  
        if (y == 288) {
            this.tint = this.colorList1[0];
            this.setDepth(5);
        }
        if (y == 320) {
            this.tint = this.colorList1[1];
            this.setDepth(6);
        }
        if (y == 352) {
            this.tint = this.colorList1[2];
            this.setDepth(7);
        }
        if (y == 384) {
            this.tint = this.colorList1[3];
            this.setDepth(8);
        }
        if (y == 416) {
            this.tint = this.colorList1[4];
            this.setDepth(9);
        }
        if (y == 448) {
            this.tint = this.colorList1[5];
            this.setDepth(10);
        }
        if (y == 480) {
            this.tint = this.colorList1[6];
            this.setDepth(11);
        }
        if (y == 512) {
            this.tint = this.colorList1[7];
            this.setDepth(12);
        }
        if (y == 544) {
            this.tint = this.colorList1[8];
            this.setDepth(13);
        }
        
}
    update() {

        if (this.getTopRight.x < 0) {       // destroys rectangle once the last pixel of it reaches the left of the screen
            this.destroy();
        }
        if (this.playerEnd && this.getTopRight().x <= game.config.width * 2) {      // only calls when last pixel touches right side of screen
            this.playerEnd = false;         // recursively calls function to permanentaly spawn platforms
            this.scene.addPlatform();
        }

        if (playerDeath == true) {
            this.body.moves = false;
        }
    }
    
    
}
