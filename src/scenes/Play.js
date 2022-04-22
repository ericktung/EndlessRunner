//scene for playing
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload(){
        this.load.path ='./asset/'; //set path to asset.
        this.load.image('player','player.png');
        this.load.image('block','block.png')
        this.load.image("Foreground",'Foreground.png');
        this.load.image("Ground_01",'Ground_01.png');
        this.load.image("Ground_02",'Ground_02.png');
        this.load.image("Middle",'Middle.png');
        this.load.image("Mountains",'Mountains.png');
        this.load.image("Sky",'Sky.png');
        this.load.image("Snow",'Snow.png');

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
        //create ket to controll
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //testing scene change
        this.add.text(20,20,"Press Enter to GameOver",menuConfig).setOrigin(0,0)

        //create back ground
        this.sky =this.add.tileSprite(0,0,800,450,'Sky').setOrigin(0,0);
        this.Mountains =this.add.tileSprite(0,0,800,450,'Mountains').setOrigin(0,0);
        this.Mid =this.add.tileSprite(0,0,800,450,'Middle').setOrigin(0,0);
        this.Foreground =this.add.tileSprite(0,0,800,450,'Foreground').setOrigin(0,0);
        this.G1 =this.add.tileSprite(0,0,800,450,'Ground_01').setOrigin(0,0);
        this.G2=this.add.tileSprite(0,0,800,450,'Ground_02').setOrigin(0,0);
        this.Snow=this.add.tileSprite(0,0,800,450,'Snow').setOrigin(0,0);
        this.player = new Player(this, 20 ,60, 'player', 0, 30).setOrigin(0, 0);
        this.block= new obstacles(this,100,300,'block,',0,20).setOrigin(0,0);
    
    }
     
     update(){
        this.sky.tilePositionX -= 0.1;
        this.G1.tilePositionX += 0.3;
        this.G2.tilePositionX += 1
        this.Mountains.tilePositionX += 1
        this.Mid.tilePositionX += 1
        this.Snow.tilePositionX += 3
        this.Foreground.tilePositionX +=1;
        this.player.update();
      
        if(this.checkCollision(this.player,this.block)){
            console.log("collide");
           

        }
     

        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start("GameOver");    
        }
    }
    checkCollision(player, block) {
        // simple AABB checking
           
         if (player.x < block.x + block.width && 
            player.x + player.width > block.x && 
            player.y < block.y + block.height &&
            player.height + player.y > block. y) {
                return true;
        } else {
            return false;
        }
        
    }
    
}
