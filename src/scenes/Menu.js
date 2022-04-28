//scene for menu
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image("BG1",'./asset/BG1.png');
        this.load.image("BG2",'./asset/BG2.png');
        this.load.image("BG3",'./asset/BG3.png');  
    }
 create(){
    this.SCROLL_SPEED = 1;
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

    this.BG2=this.add.tileSprite(0,0, game.config.width, game.config.height, 'BG2').setOrigin(0);
    this.BG3=this.add.tileSprite(0,0, game.config.width, game.config.height, 'BG3').setOrigin(0);
    this.BG1=this.add.tileSprite(0,0, game.config.width, game.config.height, 'BG1').setOrigin(0);

    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(20,20,"Press Enter to play scene",menuConfig).setOrigin(0,0);
}
 
 update(){
    this.BG2.tilePositionX += this.SCROLL_SPEED;
    this.BG3.tilePositionX += this.SCROLL_SPEED+1;
    if(Phaser.Input.Keyboard.JustDown(keyENTER)){
        this.scene.start("playScene");    
    }
    
}
}

