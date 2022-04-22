//scene for game over (Maybe)
class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    preload(){

    }
    create(){
        let menuConfig = {
            fontFamily: 'Cursive',
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
        this.add.text(20,20,"This is game over",menuConfig).setOrigin(0,0)
    }
     
     update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start("menuScene");    
        }
    }
}