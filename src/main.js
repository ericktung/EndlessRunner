class test extends Phaser.Scene{
    constructor(){
        super("BG")
    }
    preload(){
        this.load.path ='./asset/'; //path to asset
        //images
        this.load.image("Foreground",'Foreground.png');
        this.load.image("Ground_01",'Ground_01.png');
        this.load.image("Ground_02",'Ground_02.png');
        this.load.image("Middle",'Middle.png');
        this.load.image("Mountains",'Mountains.png');
        this.load.image("Sky",'Sky.png');
        this.load.image("Snow",'Snow.png');
    }
    create(){
      this.sky =this.add.tileSprite(0,0,800,450,'Sky').setOrigin(0,0);

      this.Mountains =this.add.tileSprite(0,0,800,450,'Mountains').setOrigin(0,0);
      
      this.Mid =this.add.tileSprite(0,0,800,450,'Middle').setOrigin(0,0);
      this.Foreground =this.add.tileSprite(0,0,800,450,'Foreground').setOrigin(0,0);
      this.G1 =this.add.tileSprite(0,0,800,450,'Ground_01').setOrigin(0,0);
      this.G2=this.add.tileSprite(0,0,800,450,'Ground_02').setOrigin(0,0);
      this.Snow=this.add.tileSprite(0,0,800,450,'Snow').setOrigin(0,0);
      
   
      


    }
    update() {
        // update tile sprite
     
            this.sky.tilePositionX -= 0.1;
            this.G1.tilePositionX += 0.3;
            this.G2.tilePositionX += 1
            this.Mountains.tilePositionX += 1
            this.Mid.tilePositionX += 1
            this.Snow.tilePositionX += 3
            this.Foreground.tilePositionX +=1;

  

        
    }
    
}
let keyLEFT, keyRIGHT;

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    scene: [ test ],
}
let game = new Phaser.Game(config);