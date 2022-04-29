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

        this.load.image("Obstacle", "Obstacle.png");
        this.load.image('groundBlock', 'groundBlock.png');
        this.load.image('Bouquet', 'bouquet.png');
        this.load.image('heartSpikes', 'heartSpikes.png');

        this.load.spritesheet("runner", "runner-sheet.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet("monster", "lover-sheet.png", {
            frameWidth: 384,
            frameHeight: 384
        });
    }

    create() {

        // go to Title scene
        this.scene.start('menuScene');
    }
}