//scene for playing

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload(){
        this.load.path ='./asset/'; //set path to asset.
        this.load.image('player','player.png');
        this.load.image('block','block.png')
        this.load.image("Sky",'Sky.png');
        this.load.image("ground",'ground.png');

    }
    create(){
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 4;
        this.counter =0;
        this.physics.world.gravity.y = 2600;
        cursors = this.input.keyboard.createCursorKeys();
        this.sky=this.add.tileSprite(0,0, game.config.width, game.config.height, 'Sky').setOrigin(0);
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'ground').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setOrigin(0);
       
        this.player = this.physics.add.sprite(120, game.config.height/2-tileSize, 'player').setScale(SCALE);
        
        this.block = this.physics.add.sprite(360, game.config.height/2-tileSize, 'block').setScale(SCALE);
        this.block.body.setAllowGravity(true).setVelocityX(-200);



        this.blockV = this.physics.add.sprite(300, game.config.height/2, 'block').setScale(SCALE);
        this.blockV.body.setAllowGravity(false).setVelocityX(-200);
        
        this.physics.add.collider(this.blockV,this.ground);

        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.block,this.ground);
        this.physics.add.overlap(this.player,this.block,this.blockdestory,null,this);//counter dosent work
        //this.addblock()
    }
    update() {
        // update tile sprites (tweak for more "speed")
        this.sky.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;
       
        if(this.block.x<0){
            this.block.x=game.config.width;
        }
        if(this.blockV.x<0){
            this.blockV.x=game.config.width;
        }
        if(this.checkCollision(this.player, this.block)) {
            //maybe put animation??
            //add counter
            // this.block.x = Phaser.Math.Between(0, game.config.width);
            this.block.x=game.config.width;
        }
        if(this.checkCollision(this.player, this.blockV)) {
            //maybe put animation??
            //add counter
            // this.block.x = Phaser.Math.Between(0, game.config.width);
            this.scene.start("GameOver"); 
        }
        
		// check if alien is grounded
	    this.player.isGrounded = this.player.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.player.isGrounded) {
            //this.player.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	//this.player.anims.play('jump');
	    }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.player.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	       
	    } 
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start("GameOver");    
        }
    }
    blockdestory(player,block){//destory block when it is touch
        block.destroy();
       this.destroy=true;
    }
    addblock(){//trying to create a new block after it is destory
        this.destroy=false
        if (this.destory=true){
            this.block = this.physics.add.sprite(360, game.config.height/2-tileSize, 'block').setScale(SCALE);
            this.block.body.setAllowGravity(true).setVelocityX(-200);
        }
        
    }
    checkCollision(player, block) {
        // simple AABB checking
        if (player.x < block.x + block.width && 
            player.x + player.width > block.x && 
            player.y < block.y + block.height &&
            player.height + player.y > block. y) {
                return true;
        } else {
            return false;
        }
    }
    
    
}
