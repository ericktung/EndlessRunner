//scene for playing

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload(){
        this.load.path ='./asset/'; //set path to asset.
        this.load.image('player','player.png');
        this.load.image('block','block.png')
        this.load.image("BG1",'BG1.png');
        this.load.image("ground",'ground.png');
        this.load.image("BG2",'BG2.png');
        this.load.image("BG3",'Bg3.png');


    }
    create(){
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 1;
        this.counter =0;
        this.physics.world.gravity.y = 2600;
        this.spawntime =0
        cursors = this.input.keyboard.createCursorKeys();
        this.BG2=this.add.tileSprite(0,0, game.config.width, game.config.height, 'BG2').setOrigin(0);
        this.BG3=this.add.tileSprite(0,0, game.config.width, game.config.height, 'BG3').setOrigin(0);
        this.BG1=this.add.tileSprite(0,0, game.config.width, game.config.height, 'BG1').setOrigin(0);
       
        

       
        
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'ground').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.obsticles = this.physics.add.group({//eiser way to create obsticales
            key :'block',
            quantity:24
        });
        this.obsticles.children.each(function(block){//eiser way to create obsticales
            let x = Math.random()*game.config.width;
            let y =Math.random()*game.config.height;
            block.setPosition(x,y);
        })
        var outer = new Phaser.Geom.Rectangle(0, 0, 800, 600);
        var inner = new Phaser.Geom.Rectangle(350, 250, 100, 100);

        for (var i=0; i<10;i++){
            var p = Phaser.Geom.Rectangle.RandomOutside(outer, inner);
            var b = this.obsticles.create(p.x, p.y,  'block');
             
            this.physics.add.existing(b);
            
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setOrigin(0);
       
        this.player = this.physics.add.sprite(120, game.config.height/2-tileSize, 'player').setScale(SCALE);
        
        this.block = this.physics.add.sprite(360, game.config.height/2-tileSize, 'block').setScale(SCALE);
        this.block.body.setAllowGravity(true).setVelocityX(-200);


        //Vanish block
        this.blockV = this.physics.add.sprite(300, game.config.height/2, 'block').setScale(SCALE);
        this.blockV.body.setAllowGravity(false).setVelocityX(-200);
        
        this.physics.add.collider(this.blockV,this.ground);

        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.ground, this.obsticles)
        this.physics.add.collider(this.block,this.ground);
        this.physics.add.overlap(this.player,this.obsticles,this.blockdestory,null,this);//counter dosent work
        //this.addblock()
        this.addingobstical = this.time.addEvent({
            delay: 1000,
            callback: this.addObsticle,
            callbackScope: this,
            loop: true
        });
    }
    
    update() {
        // update tile sprites (tweak for more "speed")
        this.BG2.tilePositionX += this.SCROLL_SPEED;
        this.BG3.tilePositionX += this.SCROLL_SPEED+1;

        this.groundScroll.tilePositionX += this.SCROLL_SPEED;
       
       
        Phaser.Actions.IncX(this.obsticles.getChildren(),-this.SCROLL_SPEED)       
        if(this.block.x<0){
            this.block.x=game.config.width;
        }
        //vanish block
        if(this.blockV.x<0){
            this.blockV.x=game.config.width;
        }

        if(this.checkCollision(this.player, this.block)) {
            //maybe put animation??
            //add counter
            // this.block.x = Phaser.Math.Between(0, game.config.width);
            this.block.x=game.config.width;
        }
        //checking vanish block collision
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
        if(keyDOWN.isDown&&this.player.isGrounded){//change the size of the collison box
            this.player.scaleY = 0.25
        }else if(!keyDOWN.isDown){
            this.player.scaleY = 0.5
        }
        
      
    }
    change(){
        this.player.scaleY = 0.25
    }
    blockdestory(player,obsticles){//destory block when it is touch
        obsticles.destroy();
       this.destroy=true;
    }
    addblock(){//trying to create a new block after it is destory
        this.destroy=false
        if (this.destory=true){
            this.block = this.physics.add.sprite(360, game.config.height/2-tileSize, 'block').setScale(SCALE);
            this.block.body.setAllowGravity(true).setVelocityX(-200);
        }
        
    }
    addObsticle(){//here this function andy
        var outer = new Phaser.Geom.Rectangle(0, 0, 800, 600);
        var inner = new Phaser.Geom.Rectangle(350, 250, 100, 100);
        for (var i=0; i<2;i++){
            var p = Phaser.Geom.Rectangle.RandomOutside(outer, inner);
            var b = this.obsticles.create(this.game.config.width, p.y,  'block');
             
            this.physics.add.existing(b);
            
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
