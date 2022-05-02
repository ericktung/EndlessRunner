//scene for playing

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }


    create() {
        // initialize input keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //music part
        //create start music
        this.bgm = this.sound.add('StartMusic', { 
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false 
        });
        this.loopbgm = this.sound.add('LoopMusic', { 
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true 
        });
        if (playerMuted == false) {
            this.bgm.mute = false;
            this.loopbgm.mute = false;
         } else {
            this.bgm.mute = true;
            this.loopbgm.mute = true;
         }
        //play start music
        this.bgm.play();
        //play the loop music once the startmusic ends.
        this.time.addEvent({
            delay: 54000, 
            callback: 
            this.onEvent,
            callbackScope:this, 
            loop: false
        });

        this.longJump = this.sound.add('longJump', {
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: false
        });

        this.shortJump = this.sound.add('shortJump', {
            mute: false,
            volume: 0.2,
            rate: 4,
            loop: false
        });

        this.speedBoxSound = this.sound.add('land', {
            mute: false, 
            volume: 0.5,
            rate: 2,
            loop: false
        });

        this.hitSound = this.sound.add('hit', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false
        });

        this.chomp = this.sound.add('chomp', {
            mute: false,
            volume: 0.5,
            rate: 0.25,
            loop: false
        });

        // basic physics variables
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 1;
        this.jumps = 1;
        this.SCROLL_SPEED = 5;
        this.physics.world.gravity.y = 3500;
        cursors = this.input.keyboard.createCursorKeys();

        // create background
        this.BG1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG1').setOrigin(0).setDepth(2);
        this.BG2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG2').setOrigin(0).setDepth(0);
        this.BG3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG3').setOrigin(0).setDepth(1);

        // Difficulty variables
        this.platformVelocity = -550;       // How fast the platforms move left across the screen
        this.prevVelocity = 0;
        this.spawnDifficulty = 30;          // percentage based obstacle spawner
        this.scaleDifficulty = 1;           // starts at level 1, improves over time

        // This generates the first platform that the player can stand on.
        this.groundTile = this.physics.add.sprite(0, game.config.height - 64, 'groundBlock').setScale(128, 64).setOrigin(0);
        this.groundTile.setVelocityX(this.platformVelocity);
        this.groundTile.setImmovable(true);
        this.groundTile.body.setAllowGravity(false);
        this.groundTile.setFriction(0);
        this.groundTile.setDepth(10);
        this.groundTile.tint = 0xF73D6E;

        // create player and animations
        this.player = this.physics.add.sprite(256, game.config.height - 192, 'runner');
        this.player.setOrigin(0.5, 0.5);
        this.playerMistake = 0;
        this.playerDanger = false;
        this.player.setSize(64, 128);
        this.player.setDepth(15);
        this.playerObstacleOverlap = false;
        playerDeath = false;
        this.playerSpeedUp = false;
        this.playerLimit = (game.config.width / 8) * 3;
        this.playerCanMove = true;

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNames("runner", {
                prefix: "run", start: 1, end: 8
            }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNames("runner", {
                prefix: "jump", start: 1, end: 4
            }),
            frameRate: 8,
            repeat: 0
        })

        this.player.anims.play("run");

        // create monster and animations
        this.monster = this.physics.add.sprite(-700, game.config.height/2, 'monster');
        this.monster.setOrigin(0.5, 0.5);
        this.monster.setImmovable();
        //this.monster.setScale(1.5, 1.5);
        this.monster.setDepth(15);
        //this.monster.setSize(192, 288);
        this.monster.body.offset.x =  128;          
        this.monster.body.offset.y = 64;
        this.monster.body.width = 288;            
        this.monster.body.height = 288;
        this.monster.setRotation(Math.PI / 12);
        this.monster.body.setAllowGravity(false);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("monster", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 4, 5, 6, 7, 8, 0] }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "chomp",
            frames: this.anims.generateFrameNumbers("monster", {frames: [1, 2, 3]}),
            frameRate: 12,
            repeat: -1
        })

        this.monster.anims.play("idle");

        this.obstacleList = {
            'heartSpikes': 2,           // the Y multiplier we need to 'place' the obstacle on the floor
            'Bouquet': 5,               
            'speedBox': 3,
            'placeholder 2': 1
        };

        this.time.addEvent({
            delay: 15000,
            callback: () => {this.platformVelocity -= 20}, // speeds up the map every 10 seconds
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 45000,
            callback: this.difficultyUP,
            callbackScope: this,
            loop: true
        })

        // score and time configs
        let scoreConfig = {
            fontFamily: 'Ruluko',
            fontSize: '18px',
            color: 'white',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        
        this.scoreBox = this.add.sprite(game.config.width - tileSize*8, tileSize * 4, "scorebox").setOrigin(0.5, 0.5);
        this.scoreBox.setDepth(4);

        this.add.text(game.config.width - tileSize *8, tileSize * 3, "SCORE", scoreConfig).setOrigin(0.5).setDepth(5);
        scoreConfig.fontSize = "28px";
        this.scoreText = this.add.text(game.config.width - tileSize *8, tileSize * 4.5, this.timerScore, scoreConfig).setOrigin(0.5);
        this.scoreText.setDepth(5);

        this.scoreMultipler = 1;
        this.timerScore = 0;
        if (playerDeath != true) {
            this.scoreChange = this.time.addEvent({
                delay: 100,
                callback: this.timeIncrease,                // score display, 1 point every 100ms right now
                callbackScope: this,
                loop: true
            });

             // Creates first platform
            this.time.delayedCall(500, () => {
                this.addPlatform();
            });
        }


        // basic groups for platform and obstacle generation
        this.tileGroup = this.add.group({ runChildUpdate: true });
        this.damageObstacle = this.add.group({ runChildUpdate: true });
        this.speedObstacle = this.add.group({ runChildUpdate: true });

        // basic collision physics
        this.physics.add.collider(this.player, this.groundTile);
        this.physics.add.collider(this.player, this.tileGroup);
        this.physics.add.overlap(
            this.player, 
            this.monster, 
            () => playerDeath = true, 
            null, 
            this);
        this.obstacleLogic = this.physics.add.overlap(
            this.player, 
            this.damageObstacle, 
            this.playerInDanger, 
            null, 
            this);
        this.physics.add.overlap(
            this.player, 
            this.speedObstacle, 
            this.hitSpeedObstacle, 
            null, 
            this);
    }

    update() {

        console.log(this.timerScore);          // debug

        // highscore setter
        if (this.timerScore > highScore) {
            highScore = this.timerScore;
        }

        this.playerMistake -= 1;            // playerMistake always going down, basically a timer
        
        if (this.playerMistake < 0) {
            this.tweens.add({
                targets: this.monster,      // if the player is no longer in danger, the monster moves back
                x: -700,
                ease: "Power2"
            })
            this.playerDanger = false;
            }

        if (this.player.y >= game.config.height + 256 || this.player.x <= -128 || playerDeath == true) {                            // world death bounds
            
            this.gameEnd();
        } else {
            this.BG2.tilePositionX += this.SCROLL_SPEED;
            this.BG3.tilePositionX += this.SCROLL_SPEED + 1;
        }

        // Jumping and collision logic with obstacles
        if(!this.player.body.touching.right) {
            this.playerObstacleOverlap = false;
        }

        // player position limits
        if (this.playerSpeedUp == true) {
            this.playerLimit = game.config.width / 2;
        } else {
            this.playerLimit = (game.config.width / 8) * 3;
        }

        if (this.player.body.x >= this.playerLimit) {
            this.playerCanMove = false;
            this.player.body.velocity.x = 0;            // stops the player from gaining momentum after reaching the halfway point of the screen
        } else {
            this.playerCanMove = true;
        }
        

        if (this.player.body.touching.down && !this.playerObstacleOverlap) {
            
            this.player.body.offset.x =  32;            // sets the hitbox of the player while running
            this.player.body.offset.y = 32;
            this.player.body.width = 64;            
            this.player.body.height = 96;

            this.player.on("animationcomplete", () => {
                this.player.anims.play("run");
            })
            // player recieves a jump only when they have touched the floor
            this.jumps = this.MAX_JUMPS;
            this.jumping = false;
            this.player.body.velocity.x = 0; // makes sure the player velocity is 0 when grounded (prevents sliding)
        }

        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
        if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 325)) {
            this.player.body.velocity.y = this.JUMP_VELOCITY;
            this.jumping = true;

            if(this.playerCanMove == true) {
                this.player.body.velocity.x = 100;          // allows the player to move forward ONLY when jumping and only before the position limits
            }

            this.player.anims.play("jump");
            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.shortJump.play();
            }
            

            this.player.body.offset.x =  32;            // sets the hitbox of the player while jumping
            this.player.body.offset.y = 8;
            this.player.body.width = 64;            
            this.player.body.height = 120;

        }

        
        
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
        if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
            this.jumps--;
            this.jumping = false;
        }
        
        if (this.player.body.touching.right && !this.playerObstacleOverlap) {
            this.player.body.velocity.x = 200;           // if player is stuck on the wall, they can escape
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(this.bgm.mute == false) {
                this.bgm.mute = true;                       // mute button
                this.loopbgm.mute = true;
                playerMuted = true;
            } else {
                this.bgm.mute = false;
                this.loopbgm.mute = false;
                playerMuted = false;
            }
        }
    }

    addPlatform() {

        let platformX = game.config.width * 2;              // sets the X position of the platform on the right side of the screen
        let platformY = Phaser.Math.Between(9, 17) * 32;         // randomly generates a height for the platform

        let slower = this.platformVelocity + 25;            // slightly randomizes platform speed
        let faster = this.platformVelocity - 25;
        let currentVelocity = Phaser.Math.Between(slower, faster);      // parallax platforms
        
        // create platform
        let tileFloor = new Platform(
            this,                       // scene
            platformX,                  // X position
            platformY,                  // Y position
            currentVelocity);           // velocity

        this.tileGroup.add(tileFloor);
        let obstacleSelector = Math.floor(Math.random() * 3);       

        // add box obstacles inside Platform
        if (tileFloor.scaleX > 16) {                                              // decides if platform is long enough
            if (Math.ceil(Math.random() * 100) < this.spawnDifficulty) {          // % chance to spawn obstacle
                let genObstacle = new Obstacle(
                    this, 
                    Phaser.Math.Between(platformX + tileSize * 2, (platformX + (tileSize * tileFloor.scaleX) - (tileSize * 5))),
                    platformY - (tileSize * this.obstacleList[Object.keys(this.obstacleList)[obstacleSelector]]),           
                    Object.keys(this.obstacleList)[obstacleSelector],                       // texture
                    currentVelocity);

                if (obstacleSelector <= 1) {
                    this.damageObstacle.add(genObstacle);
                } else if (obstacleSelector == 2) {
                    this.speedObstacle.add(genObstacle);
                }
            }
        }
    }

    playerInDanger() {
        this.obstacleLogic.active = false;
        this.playerMistake = 700;
        this.playerObstacleOverlap = true;

        this.hitSound.play();

        if (this.playerDanger == true) {            // logic check if player has already hit an obstacle
            playerDeath = true;                     // then the next one they hit will kill them
            
        } else {
            this.cameras.main.shake(250);
            this.playerDanger = true;

            this.tweens.add({
                targets: this.monster,
                x: -20,
                ease: "Power4"
            })

            this.monster.setX(-10);
            this.monster.setY(192);
        }
        // monster bounce
        this.tweens.add({
            targets: this.monster,
            y: "+= 30",
            duration: this.playerMistake*10,
            ease: "Bounce",
            repeat: -1,
            yoyo: true
        })
        this.time.delayedCall(1000, () => {this.obstacleLogic.active = true});
    }

    hitSpeedObstacle() {

        if (this.playerSpeedUp == false) {
            this.speedBoxSound.play();
            this.player.body.velocity.x += 100;
            this.playerSpeedUp = true;
            this.playerObstacleOverlap = true;

            this.SCROLL_SPEED = 6;
            this.time.delayedCall(5000, () => {this.SCROLL_SPEED = 5; this.player.body.velocity.x -= 100; this.playerSpeedUp = false;});

            this.scoreMultiplier = 2;
            this.time.delayedCall(5000, () => {this.scoreMultiplier = 1});
        } 
            
        
    }

    difficultyUP() {
        this.scaleDifficulty += 1;          // platform velocity -45 each time also (event)

        if (this.scaleDifficulty == 2) {    // color change of background when difficulty increases
            this.BG1.tint = 0x00001D;
            this.BG2.tint = 0x71CED2;
            this.spawnDifficulty = 40;
        } else if (this.scaleDifficulty == 3) {
            this.BG2.tint = 0x440BD4;
            this.spawnDifficulty = 50;
        } else if (this.scaleDifficulty >= 4) {
            this.BG2.tint = 0xF53E6E;
            this.spawnDifficulty = 60;
        } 
    }

    timeIncrease() {

        this.timerScore += this.scoreMultipler;
        this.scoreText.setText(this.timerScore); // changes the score text to be updated every time function is called
    }
    
    onEvent(){
        this.bgm.stop();
        this.loopbgm.play();
    }

    gameEnd() {
        this.SCROLL_SPEED = 0;
        this.monster.anims.play("chomp");
        this.bgm.stop();
        this.loopbgm.stop();
        this.player.body.moves = false;
        this.player.anims.stop();
        this.scoreChange.paused = true;
        playerScore = this.timerScore;
        this.cameras.main.fade(1800,0,0,0);
        this.monsterLunge = this.tweens.add({
            targets: this.monster,
            x: this.player.x - 75,
            y: this.player.y - 75,
            ease: "Power4",
            onComplete: () => {
                this.chomp.play();
                this.scene.start("GameOver");
            }
        })
    }

}