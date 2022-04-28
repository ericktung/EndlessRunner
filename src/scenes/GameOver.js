//scene for game over (Maybe)
class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    preload(){

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
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.text(20,20,"This is game over",menuConfig).setOrigin(0,0);
        this.add.text(512, 288, "High Score: " + highScore, menuConfig).setOrigin(0.5, 0.5);
    }
     
     update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start("menuScene");    
        }
    }
}