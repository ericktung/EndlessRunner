//scene for menu
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
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
    //play music
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
       this.bgm.mute = true;
       this.loopbgm.mute = true;
    } else {
        this.bgm.mute = false;
       this.loopbgm.mute = false;
    }

    this.bgm.play();
    var timedEvent = this.time.addEvent({delay: 54000, callback: this.onEvent, callbackScope:this, loop: false});

    this.UISound = this.sound.add('UI', {
        mute: false,
        volume: 0.5,
        rate: 1,
        loop: false
    });

    // key input
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // menu text
    this.add.text(20,game.config.height/2+100, "HEART ♥ BREAKOUT", menuConfig);
    menuConfig.fontSize = "30px";
    this.play = this.add.text(20,game.config.height/2+180,"Press (UP) to play",menuConfig).setOrigin(0,0);
    this.intro = this.add.text(20, game.config.height/2 + 240, 'Press (ENTER) for more info', menuConfig).setOrigin(0, 0);
    this.mute = this.add.text(game.config.width / 5 * 3, game.config.height/2 + 240, 'Press (SPACE) to mute/unmute', menuConfig).setOrigin(0, 0);
    
    var timer = this.time.addEvent({
        delay: 500,                // ms
        callback: () => {
            this.play.alpha = 0;
            this.intro.alpha = 0;
            this.mute.alpha = 0;
        },
        loop: true
    });
    this.time.addEvent({
        delay: 1000,                // ms
        callback: () => {
            this.play.alpha = 1;
            this.intro.alpha = 1;
            this.mute.alpha = 1;
        },
        loop: true
    });
}
 
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.UISound.play();
            this.scene.start("playScene");
            this.bgm.stop();
            this.loopbgm.stop();
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.UISound.play();
            this.scene.start('controlScene');
            this.bgm.stop();
            this.loopbgm.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.UISound.play();
            if(this.bgm.mute == false) {
                playerMuted = true;
                this.bgm.mute = true;
                this.loopbgm.mute = true;
            } else {
                playerMuted = false;
                this.bgm.mute = false;
                this.loopbgm.mute = false;
            }
        }
    }
    onEvent(){
        this.bgm.stop();
        this.loopbgm.play();
    }
}

