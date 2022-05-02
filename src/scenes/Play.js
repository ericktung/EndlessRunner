//scene for playing

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }


    create() {
        // initialize input keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //music part
        //create start music
        this.bgm = this.sound.add('StartMusic', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });
        //create loop music
        this.loopbgm = this.sound.add('LoopMusic', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        //play start music
        this.bgm.play();
        //play the loop music once the startmusic ends.
        var timedEvent = this.time.addEvent({delay: 54000, callback: this.onEvent, callbackScope:this, loop: false});

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
        this.spawnDifficulty = 30;          // percentage based obstacle spawner
        this.scaleDifficulty = 1;           // starts at level 1, improves over time

        // This generates the first platform that the player can stand on.
        this.groundTile = this.physics.add.sprite(0, game.config.height - 64, 'groundBlock').setScale(128, 64).setOrigin(0);
        this.groundTile.setVelocityX(this.platformVelocity);
        this.groundTile.setImmovable(true);
        this.groundTile.body.setAllowGravity(false);
        this.groundTile.setFriction(0);
        this.groundTile.setDepth(8);
        this.groundTile.tint = 0xF73D6E;

        // create player and animations
        this.player = this.physics.add.sprite(256, game.config.height - 192, 'runner');
        this.player.setOrigin(0.5, 0.5);
        this.playerMistake = 0;
        this.playerDanger = false;
        this.playerDeath = false;
        this.player.setSize(64, 128);
        this.player.setDepth(10);
        this.playerObstacleOverlap = false;

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
        this.monster.setDepth(10);
        //this.monster.setSize(192, 288);
        this.monster.body.offset.x =  128;          // updates the monster hitbox for every frame            
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
            'Bouquet': 6,               
            'Obstacle': 3,
            'placeholder 2': 1
        };

        this.time.addEvent({
            delay: 10000,
            callback: () => {this.platformVelocity -= 25}, // speeds up the map every 10 seconds
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 45000,
            callback: () => {this.difficultyUP;},
            callbackScope: this,
            loop: true
        })

        // score and time configs
        let scoreConfig = {
            fontFamily: 'Ruluko',
            fontSize: '18px',
            color: '#f96b45',
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

        this.timerScore = 0;
        if (this.playerDeath != true) {
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
        this.obstacleGroup = this.add.group({ runChildUpdate: true });

        // basic collision physics
        this.physics.add.collider(this.player, this.groundTile);
        this.physics.add.collider(this.player, this.tileGroup);
        this.physics.add.overlap(
            this.player, 
            this.monster, 
            () => this.playerDeath = true, 
            null, 
            this);
        this.obstacleLogic = this.physics.add.overlap(
            this.player, 
            this.obstacleGroup, 
            this.playerInDanger, 
            null, 
            this);
    }

    update() {

        console.log(this.playerDanger);          // debug

        // highscore setter
        if (this.timerScore > highScore) {
            highScore = this.timerScore;
        }

        // permanent updating variables
        this.playerMistake -= 1;            // playerMistake always going down
        

        if (this.playerMistake < 0) {
            // this.tweens.add({
            //     targets: this.monster,
            //     x: -700,
            //     ease: "Power2"
            // })
            this.playerDanger = false;
            this.monster.setX(-700);
            }

        if (this.player.y >= game.config.height + 256 || this.player.x <= -128 || this.playerDeath == true) {                            // world death bounds
            this.gameEnd();
        } else {
            this.BG2.tilePositionX += this.SCROLL_SPEED;
            this.BG3.tilePositionX += this.SCROLL_SPEED + 1;
        }

        // Jumping and collision logic with obstacles
        if(!this.player.body.touching.right) {
            this.playerObstacleOverlap = false;
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
        if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 300)) {
            this.player.body.velocity.y = this.JUMP_VELOCITY;
            this.jumping = true;
            this.player.body.velocity.x = 100;          // allows the player to move forward ONLY when jumping
            this.player.anims.play("jump");

            this.player.body.offset.x =  32;            // sets the hitbox of the player while jumping
            this.player.body.offset.y = 8;
            this.player.body.width = 64;            
            this.player.body.height = 120;
        }
        
        if (this.player.body.x >= ((game.config.width / 8) * 3)) {
            this.player.body.velocity.x = 0;            // stops the player from gaining momentum after reaching the halfway point of the screen
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
    }

    addPlatform() {

        let platformX = game.config.width * 2;              // sets the X position of the platform on the right side of the screen
        let platformY = Phaser.Math.Between(9, 17) * 32;         // randomly generates a height for the platform

        let slower = this.platformVelocity + 25;            // slightly randomizes platform speed
        let faster = this.platformVelocity - 25;
        let currentVelocity = Phaser.Math.Between(slower, faster);
        
        // create platform
        let tileFloor = new Platform(
            this,                       // scene
            platformX,                  // X position
            platformY,                  // Y position
            this.scaleDifficulty,       // platform color
            currentVelocity);     // velocity

        // add to tileGroup for collision physics
        this.tileGroup.add(tileFloor);

        let obstacleSelector = Math.floor(Math.random() * 3);       // randomizes selection of obstacles
        // add box obstacles inside Platform
        if (tileFloor.scaleX > 16) {                                              // decides if platform is long enough
            if (Math.ceil(Math.random() * 100) < this.spawnDifficulty) {          // % chance to spawn obstacle
                let genObstacle = new Obstacle(
                    this, 
                    Phaser.Math.Between(platformX + tileSize * 2, (platformX + (tileSize * tileFloor.scaleX) - (tileSize * 6))),
                    platformY - (tileSize * this.obstacleList[Object.keys(this.obstacleList)[obstacleSelector]]),           
                    Object.keys(this.obstacleList)[obstacleSelector],                       // texture
                    currentVelocity);

                this.obstacleGroup.add(genObstacle);
            }
        }
    }

    playerInDanger() {
 
        this.obstacleLogic.active = false;
        this.playerMistake = 700;
        this.playerObstacleOverlap = true;

        if (this.playerDanger == true) {
            this.playerDeath = true;
        } else {
            this.cameras.main.shake(250);
            this.playerDanger = true;

             // monster bounce
            this.tweens.add({
                targets: this.monster,
                y: "+= 30",
                duration: this.playerMistake*10,
                ease: "Bounce",
                repeat: -1,
                yoyo: true
            })

            this.monster.setX(-10);
            this.monster.setY(128);
        }
        this.time.delayedCall(1000, () => {this.obstacleLogic.active = true});

       

    }

    difficultyUP() {
        this.scaleDifficulty += 1;


        if (this.scaleDifficulty == 2) {
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

        this.timerScore += 1;
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
                this.scene.start("GameOver");
            }
        })
    }

}