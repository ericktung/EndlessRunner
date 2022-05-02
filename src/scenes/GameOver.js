//scene for game over (Maybe)
class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create(){
        this.UISound = this.sound.add('UI', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false
        });
        
        let menuConfig = {
            fontFamily: 'Ruluko',
            fontSize: '30px',
            backgroundImage: 'background',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.SCROLL_SPEED = 1;
        
        this.BG2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG2').setOrigin(0);
        this.BG3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG3').setOrigin(0);
        this.BG1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG1').setOrigin(0);

        //this.BG2.tint = 0x5EC39D;

        this.cameras.main.fadeIn(1000, 0,0,0);

        // key input
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // score text
        this.add.sprite(game.config.width/2, game.config.height/2, "gameover");
        this.add.text(game.config.width/2, game.config.height/3+(tileSize*5), "High Score: " + highScore, menuConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width/2, game.config.height/3+(tileSize*2.5), "Your Score: " + playerScore, menuConfig).setOrigin(0.5, 0.5);

        // play again text
        menuConfig.color = "white";
        this.playAgain = this.add.text(game.config.width/2, game.config.height-(tileSize*4), "(UP) to play again\n(ENTER) to return to Menu", menuConfig).setOrigin(0.5);
        var timer = this.time.addEvent({
            delay: 500,                // ms
            callback: () => {
                this.playAgain.alpha = 0;
            },
            loop: true
        });
        this.time.addEvent({
            delay: 1000,                // ms
            callback: () => {
                this.playAgain.alpha = 1;
            },
            loop: true
        });
    }
     
     update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.UISound.play();
            this.scene.start("menuScene");    
        }

        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.UISound.play();
            this.scene.start("playScene");    
        }
        this.BG2.tilePositionX += this.SCROLL_SPEED;
        this.BG3.tilePositionX += this.SCROLL_SPEED + 1;
    }
}