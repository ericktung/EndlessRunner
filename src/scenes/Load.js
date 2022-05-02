class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {

        this.load.path = './asset/';      

        this.load.image("cutscene", "cutscene.png");

        this.load.image("BG1", 'BG1.png');
        this.load.image("BG2", 'BG2.png');
        this.load.image("BG3", 'BG3.png');
        this.load.image("scorebox", "scorebox.png");
        this.load.image("gameover", "gameover.png");

        this.load.image("Obstacle", "Obstacle.png");
        this.load.image('groundBlock', 'groundBlock.png');
        this.load.image('Bouquet', 'bouquet.png');
        this.load.image('heartSpikes', 'heartSpikes.png');
        this.load.image('speedBox', 'speedBox.png');

        this.load.atlas("runner", "atlas/runner-atlas.png", "atlas/runner-atlas.json");

        this.load.audio("StartMusic", "endless_sfx.wav");
        this.load.audio("LoopMusic", "endless_loop.wav");
        this.load.spritesheet("heart", "heart-sheet.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("monster", "lover-sheet.png", {
            frameWidth: 512,
            frameHeight: 512
        });
    }

    create() {

        // go to Title scene
        this.scene.start('menuScene');
    }
}