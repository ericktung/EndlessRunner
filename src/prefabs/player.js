class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.moveSpeed = 2;       

        
    }
   create(){
    
   }
    update() {
        if(keyLEFT.isDown) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown) {
            this.x += this.moveSpeed;
        }else if(keyDOWN.isDown) {
            this.y+= this.moveSpeed;
            this.height=this.height/2; //change height to 1/2;
        } else if (keyUP.isDown ) {
            this.y -= this.moveSpeed;
        }else{
            this.height =this.height;
        }
    }
    
    // position reset
    reset() {
        this.x = game.config.width;
    }
}