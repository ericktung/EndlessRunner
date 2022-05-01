class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, difficulty, velocity) {

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
        this.setDepth(8);

        this.playerEnd = true;      // old variables

        this.colorList1 = [
            0xF73D6E,           // pink gradient
            0xEA3061,           
            0xDE2455,           
            0xD11748,           
            0xB7002E            
        ];

        this.colorList2 = [
            0x980000,
            0x7F0000,           // red gradient
            0x650000,
            0x4C0000,
            0x320000
        ];

        this.colorList3 = [
            0x368F00,
            0x1D7600,           // green gradient
            0x035C00,
            0x004300,
            0x003900
        ];

        this.colorList4 = [
            0x5CCACB,           // teal gradient
            0x43B1B2,
            0x299798,
            0x107E7F,
            0x006465
        ];

        if (difficulty == 1) {
            if (y <= 332) {
                this.tint = this.colorList1[0];
            }
            if (y > 332 && y <= 400) {
                this.tint = this.colorList1[1];
            }
            if (y > 400 && y <= 464) {
                this.tint = this.colorList1[2];
            }
            if (y > 464 && y <= 528) {
                this.tint = this.colorList1[3];
            }
            if (y > 528) {
                this.tint = this.colorList1[4];
            }
        }

        if (difficulty == 2) {
            if (y <= 332) {
                this.tint = this.colorList2[0];
            }
            if (y > 332 && y <= 400) {
                this.tint = this.colorList2[1];
            }
            if (y > 400 && y <= 464) {
                this.tint = this.colorList2[2];
            }
            if (y > 464 && y <= 528) {
                this.tint = this.colorList2[3];
            }
            if (y > 528) {
                this.tint = this.colorList2[4];
            }
        }

        if (difficulty == 3) {
            if (y <= 332) {
                this.tint = this.colorList3[0];
            }
            if (y > 332 && y <= 400) {
                this.tint = this.colorList3[1];
            }
            if (y > 400 && y <= 464) {
                this.tint = this.colorList3[2];
            }
            if (y > 464 && y <= 528) {
                this.tint = this.colorList3[3];
            }
            if (y > 528) {
                this.tint = this.colorList3[4];
            }
        }
        
        if (difficulty >= 4) {
            if (y <= 332) {
                this.tint = this.colorList4[0];
            }
            if (y > 332 && y <= 400) {
                this.tint = this.colorList4[1];
            }
            if (y > 400 && y <= 464) {
                this.tint = this.colorList4[2];
            }
            if (y > 464 && y <= 528) {
                this.tint = this.colorList4[3];
            }
            if (y > 528) {
                this.tint = this.colorList4[4];
            }
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
