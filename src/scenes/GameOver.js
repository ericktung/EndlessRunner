//scene for game over (Maybe)
class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create(){
        let menuConfig = {
            fontFamily: 'Ruluko',
            fontSize: '30px',
            backgroundImage: 'background',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.SCROLL_SPEED = 5;
        
        this.BG2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG2').setOrigin(0);
        this.BG3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG3').setOrigin(0);
        this.BG1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'BG1').setOrigin(0);

        this.BG2.tint = 0x5EC39D;

        

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.text(20,20,"This is game over",menuConfig).setOrigin(0,0);
        this.add.text(512, 288, "High Score: " + highScore, menuConfig).setOrigin(0.5, 0.5);
    }
     
     update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start("menuScene");    
        }
        this.BG2.tilePositionX += this.SCROLL_SPEED;
        this.BG3.tilePositionX += this.SCROLL_SPEED + 1;
    }
}