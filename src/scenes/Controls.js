class Controls extends Phaser.Scene {
    constructor() {
        super("controlScene");
    }

    create(){

        this.UISound = this.sound.add('UI', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false
        });

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        
        let controlConfig = {
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
        
        this.cutscene = this.add.image(0,0, 'cutscene').setOrigin(0);
        this.cutscene.setTint(0x777777);
        this.add.text(game.config.width/2, 48, 'Welcome to Heart Breakout!', controlConfig).setOrigin(0.5);
        controlConfig.fontSize = 42;
        this.add.text(game.config.width/2, 128, 'Use the (UP) arrow to jump', controlConfig).setOrigin(0.5);
        controlConfig.fontSize = 28;
        this.add.text(game.config.width/2, 160, 'Tap (UP) for a small jump', controlConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 192, 'Hold (UP) for a large jump', controlConfig).setOrigin(0.5);
        controlConfig.fontSize = 32;
        this.add.text(game.config.width/2, 264, 'Hitting obstacles will alert the monster', controlConfig).setOrigin(0.5);
        controlConfig.fontSize = 24;
        this.add.text(game.config.width/2, 292, 'Hitting another obstacle while the monster is on screen will result in your death', controlConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, 348, 'Save your jump to jump mid-air', controlConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 372, 'Jump resets after landing on the ground', controlConfig).setOrigin(0.5);

        controlConfig.fontSize = 30;
        this.play = this.add.text(20,game.config.height/2+180,"Press (UP) to play", controlConfig).setOrigin(0,0);
        this.intro = this.add.text(20, game.config.height/2 + 240, 'Press (ENTER) to return to menu', controlConfig).setOrigin(0, 0);
        
        this.time.addEvent({
            delay: 500,                // ms
            callback: () => {
                this.play.alpha = 0;
                this.intro.alpha = 0;
            },
            loop: true
        });
        this.time.addEvent({
            delay: 1000,                // ms
            callback: () => {
                this.play.alpha = 1;
                this.intro.alpha = 1;
            },
            loop: true
        }); 
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.UISound.play();
            this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.UISound.play();
            this.scene.start('menuScene');
        }
    }
}