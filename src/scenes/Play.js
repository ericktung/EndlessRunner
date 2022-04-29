//scene for playing

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.path = './asset/'; //set path to asset.
        this.load.image('player', 'player.png');
        this.load.image('block', 'block.png')
        this.load.image("BG1", 'BG1.png');
        this.load.image("ground", 'ground.png');
        this.load.image("BG2", 'BG2.png');
        this.load.image("BG3", 'Bg3.png');
        this.load.image("Obstacle", "Obstacle.png");
        this.load.image('groundBlock', 'groundBlock.png');

        this.load.spritesheet("runner", "runner-sheet.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet("monster", "lover-sheet.png", {
            frameWidth: 384,
            frameHeight: 384
        });
    }
    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 5;
        this.counter = 0;
        this.physics.world.gravity.y = 2600;
        this.spawntime = 0
        this.obstuoch == false;
        cursors = this.input.keyboard.createCursorKeys();
        this.BG2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG2').setOrigin(0);
        this.BG3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG3').setOrigin(0);
        this.BG1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG1').setOrigin(0);

        // Difficulty variables
        this.platformVelocity = -400;       // How fast the platforms move left across the screen
        this.spawnDifficulty = 100;          // percentage based obstacle spawner
        this.scaleDifficulty = 1;           // starts at level 1, improves over time

        // This generates the first platform that the player can stand on. Timings subject to change
        let randomGenNumber = (Math.floor(Math.random() * 8) * 16);
        this.groundTile = this.physics.add.sprite(0, game.config.height - randomGenNumber - tileSize, 'groundBlock').setScale(128, 64).setOrigin(0);
        this.groundTile.setVelocityX(this.platformVelocity);
        this.groundTile.setImmovable(true);
        this.groundTile.body.setAllowGravity(false);
        this.groundTile.setFriction(0);
        this.groundTile.setDepth(0);
        this.groundTile.tint = 0xF73D6E;

        // create player
        this.player = this.physics.add.sprite(256, game.config.height / 2 + tileSize, 'runner');
        this.player.setOrigin(0.5, 0.5);
        this.playerMistake = 0;
        this.playerDeath = false;
        this.player.setSize(64, 128);
        this.player.setDepth(2);

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("runner", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("runner", { frames: [9, 10, 10, 9] }),
            frameRate: 8
        })

        this.player.anims.play("run");

        // create monster
        this.monster = this.physics.add.sprite(-256, 428, 'Obstacle');
        this.monster.setOrigin(0.5, 0.5);
        this.monster.setImmovable();
        this.monster.setScale(4, 32);
        this.monster.setDepth(2);
        this.monster.enableBody();
        this.monster.body.setAllowGravity(false);
        this.monsterClose = false;
        this.monster.tint = 0xFFC700;

        this.physics.add.overlap(this.player, this.monster, () => this.playerDeath = true, null, this);

        this.anims.create({
            key: "chomp",
            frames: this.anims.generateFrameNumbers("monster", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8] }),
            framerate: 8,
            repeat: -1
        });

        this.obstacleList = [
            '32 x 32',
            'Obstacle',
            'placeholder 1',
            'placeholder 2'
        ]

        //Vanish block
        this.blockV = this.physics.add.sprite(300, game.config.height / 2, 'block').setScale(SCALE);
        this.blockV.body.setAllowGravity(false).setVelocityX(-200);

        this.physics.add.collider(this.player, this.groundTile);
        // this.physics.add.collider(this.groundTile, this.obsticles)
        //this.physics.add.collider(this.obsticles, this.tileGroup);

        this.physics.add.overlap(this.player, this.block, this.blockdestory, null, this); //counter dosent work
        this.physics.add.overlap(this.player, this.obsticles, this.speedchange, null, this); //counter dosent work

        this.time.addEvent({
            delay: 1000,
            callback: this.addObstacle,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 10000,
            callback: this.speedIncrease, // speeds up the map every 10 seconds
            callbackScope: this,
            loop: true
        });

        this.timerScore = 0;
        this.time.addEvent({
            delay: 100,
            callback: this.timeIncrease, // score display, 1 point every 100ms right now
            callbackScope: this,
            loop: true
        });
        let scoreConfig = {
            fontFamily: 'Ruluko',
            fontSize: '28px',
            color: 'white',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.scoreText = this.add.text(game.config.width - tileSize * 16, tileSize * 4, "Score: " + this.timerScore, scoreConfig);

        // Creates first platform
        this.time.delayedCall(500, () => {
            this.addPlatform();
        });
        this.tileGroup = this.add.group({ runChildUpdate: true });
        this.obstacleGroup = this.add.group({ runChildUpdate: true });
    }

    addPlatform() {

        let platformX = game.config.width * 2; // sets the X position of the platform on the right side of the screen
        let platformY = Phaser.Math.Between(game.config.height / 2, game.config.height - tileSize); // randomly generates a height for the platform

        let slower = this.platformVelocity + 25;            // slightly randomizes platform speed
        let faster = this.platformVelocity - 25;

        let currentVelocity = Phaser.Math.Between(slower, faster);
        
        // create platform
        let tileFloor = new Platform(
            this,                       // scene
            platformX,                  // X position
            platformY,                  // Y position
            'groundBlock',              // texture
            currentVelocity);     // velocity

        // add to tileGroup for collision physics
        this.tileGroup.add(tileFloor);

        let obstacleSelector = Math.floor(Math.random() * 4);       // randomizes selection of obstacles

        // add box obstacles inside Platform
        if (tileFloor.scaleX > 16) {                                              // decides if platform is long enough
            if (Math.ceil(Math.random() * 100) < this.spawnDifficulty) {          // % chance to spawn obstacle
                let genObstacle = new Obstacle(
                    this, 
                    Phaser.Math.Between(platformX + tileSize, (platformX + (tileSize * tileFloor.scaleX) - (tileSize * 6))),
                    platformY - (tileSize * 3), 
                    this.obstacleList[1],               // replace with obstacleSelector later
                    currentVelocity);

                this.obstacleGroup.add(genObstacle);
            }
        }
    }



    update() {

        console.log(this.playerMistake);          // debug
        //console.log(this.monster.x, this.monster.y);

        if (this.playerDeath == false) {

            this.physics.world.collide(this.player, this.tileGroup);
            this.physics.world.collide(this.player, this.obstacleGroup);
            this.physics.world.collide(this.player, this.monster);
            this.physics.add.overlap(this.player, this.obstacleGroup, this.blockdestory, null, this);
        } else {
            this.scene.start('GameOver');
        }

        if (this.timerScore > highScore) {

            highScore = this.timerScore;
        }

        this.playerMistake -= 1;

        if (this.playerMistake < 300) {
            this.monsterClose = false; // control monster spawns
        } else {
            this.monsterClose = true;
        }

        if (this.monsterClose == true) {
            // this.time.delayedCall(
            //     5000,
            //     () => this.playerMistake = 200
            // );
            this.monster.setX(16);
        } else if (this.monsterClose == false) {
            this.monster.setX(-256);
        }

        if (this.player.y >= game.config.height + 256 ||        
            this.player.x <= -128) {                            // world death bounds

            this.scene.start("GameOver"); 
        }

        // update tile sprites (tweak for more "speed")
        this.BG2.tilePositionX += this.SCROLL_SPEED;
        this.BG3.tilePositionX += this.SCROLL_SPEED + 1;

        //Phaser.Actions.IncX(this.obsticles.getChildren(),-this.SCROLL_SPEED)       
        //vanish block
        if (this.blockV.x < 0) {
            this.blockV.x = game.config.width;
        }

        //if(this.checkCollision(this.player, this.block)) {
        //maybe put animation??
        //add counter
        //this.block.x = Phaser.Math.Between(0, game.config.width);
        //this.block.x=game.config.width;
        //}
        //checking vanish block collision
        if (this.checkCollision(this.player, this.blockV)) {
            //maybe put animation??
            //add counter
            // this.block.x = Phaser.Math.Between(0, game.config.width);
            this.speedVelocity -= 5;
            this.timerScore += 1; // using (this.blockV) as a temp obstacle that increases platform speed and adds (5) to player score
            this.scoreText
        }

        // check if alien is grounded
        this.player.isGrounded = this.player.body.touching.down;
        // if so, we have jumps to spare
        if (this.player.isGrounded) {

            this.player.body.offset.x =  32;            // sets the hitbox of the player while running
            this.player.body.offset.y = 24;
            this.player.body.width = 64;            
            this.player.body.height = 96;

            this.player.on("animationcomplete", () => {
                this.player.anims.play("run");
            })

            this.jumps = this.MAX_JUMPS;
            this.jumping = false;
            this.player.body.velocity.x = 0; // makes sure the player velocity is 0 when grounded
        }
        
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
        if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 250)) {
            this.player.body.velocity.y = this.JUMP_VELOCITY;
            this.jumping = true;
            this.player.body.velocity.x = 100; // allows the player to move forward ONLY when jumping
            this.player.anims.play("jump");

            this.player.body.offset.x =  32;            // sets the hitbox of the player while jumping
            this.player.body.offset.y = 8;
            this.player.body.width = 64;            
            this.player.body.height = 112;
        }
        if (this.player.body.x >= game.config.width / 2) {
            this.player.body.velocity.x = 0; // stops the player from gaining momentum after reaching the halfway point of the screen
        }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
        if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
            this.jumps--;
            this.jumping = false;
        }
        if (this.player.body.touching.right) {
            this.player.body.velocity.x = 200; // if player is stuck on the wall, they can escape
        }
    }

    setPlayerMistake(mistake) {
        this.playerMistake = mistake;
    }

    blockdestory(player, obsticles) { //destory block when it is touch

        obsticles.destroy();
        this.destroy = true;
        this.playerMistake = 400;
        this.player.x = this.player.x * 0.9;    // here
        // this.SCROLL_SPEED = this.SCROLL_SPEED - 2;
        // this.time.delayedCall(600, () => {
        //     this.SCROLL_SPEED = 5;
        // });
        // console.log(this.SCROLL_SPEED)

    }


    checkCollision(player, block) {
        // simple AABB checking
        if (player.x < block.x + block.width &&
            player.x + player.width > block.x &&
            player.y < block.y + block.height &&
            player.height + player.y > block.y) {
            return true;
        } else {
            return false;
        }
    }
    speedIncrease() {

        this.platformVelocity -= 100; // speeds up the map based on the timed Event in Create()

    }

    timeIncrease() {

        this.timerScore += 1;
        this.scoreText.setText('Score: ' + this.timerScore); // changes the score text to be updated every time function is called

    }

}