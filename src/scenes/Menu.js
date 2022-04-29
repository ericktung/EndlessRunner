//scene for menu
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image("cutscene", "./asset/cutscene.png"); 
    }
 create(){
    this.SCROLL_SPEED = 1;
    let menuConfig = {
        fontFamily: 'Ruluko',
        fontSize: '50px',
        color: 'white',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

    this.add.image(0,0, 'cutscene').setOrigin(0);


    this.BG2.tint = 0x5EC39D;

    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(20,game.config.height/2+100, "HEART ♥ BREAKOUT", menuConfig);
    menuConfig.fontSize = "30px";
    this.play = this.add.text(20,game.config.height/2+180,"Press Enter to play",menuConfig).setOrigin(0,0);
    var timer = this.time.addEvent({
        delay: 500,                // ms
        callback: () => {
            this.play.alpha = 0
        },
        loop: true
    });
    this.time.addEvent({
        delay: 1000,                // ms
        callback: () => {
            this.play.alpha = 1
        },
        loop: true
    });
}
 
 update(){
    if(Phaser.Input.Keyboard.JustDown(keyENTER)){
        this.scene.start("playScene");    
    }
    
}
}

