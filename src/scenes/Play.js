//scene for playing

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload(){
        this.load.path ='./asset/'; //set path to asset.
        this.load.image('player','player.png');
        this.load.image('block','block.png')
        this.load.image("Foreground",'Foreground.png');
        this.load.image("Ground_01",'Ground_01.png');
        this.load.image("Ground_02",'Ground_02.png');
        this.load.image("Middle",'Middle.png');
        this.load.image("Mountains",'Mountains.png');
        this.load.image("Sky",'Sky.png');
        this.load.image("Snow",'Snow.png');

    }
    create(){
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 4;
        currentScene = 3;
        this.physics.world.gravity.y = 2600;
        cursors = this.input.keyboard.createCursorKeys();
     this.sky=this.add.tileSprite(0,0, game.config.width, game.config.height, 'Sky').setOrigin(0);
     this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'Ground_02').setOrigin(0);
        this.player = this.physics.add.sprite(120, game.config.height/2-tileSize, 'player', 'side').setScale(SCALE);
        this.physics.add.collider(this.player, this.ground);
    }
    update() {
        // update tile sprites (tweak for more "speed")
        this.sky.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

		// check if alien is grounded
	    this.player.isGrounded = this.player.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.player.isGrounded) {
            this.player.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	this.player.anims.play('jump');
	    }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.player.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	       
	    } 
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	   
    }
   
    
}
