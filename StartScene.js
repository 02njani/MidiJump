class StartScene extends Phaser.Scene 
{
    constructor() 
    {
        super("startGame");
    }
    preload()
    {
        //loading all assets for scene 2 
        this.load.image('sky', 'assets/ombreback.png');
        this.load.image('ground', 'assets/grayground.png', { frameWidth: 1000, frameHeight: 600 });
        this.load.image('plat', 'assets/grayplat.png');
        this.load.image('goldplat', 'assets/goldplat.png');
        this.load.image('star', 'assets/grayplat.png');
        this.load.image('goldstar', 'assets/goldstar.png');
        this.load.image('barrier', 'assets/pplat.png');
        this.load.image('bomb', 'assets/whitenote.png');
        this.load.image('heart', 'assets/heart3.png', { frameWidth: 10, frameHeight: 10});
        this.load.image('heart2', 'assets/heart4.png', { frameWidth: 10, frameHeight: 10});
        this.load.image('p1life', 'assets/p1_life.png');
        this.load.image('p2life', 'assets/p2_life.png');

        this.load.spritesheet('littleguy', 
        'assets/littleman.png',
        { frameWidth: 32, frameHeight: 48 });

        //startscene images
        this.load.image('howto', 'assets/howtoplay.png');
        this.load.image('firststart', 'assets/startgame.png');
        this.load.image('introtext', 'assets/introtext.png');

        //settings and instructions text
        this.load.image('howtotext', 'assets/howtotext.png');
        this.load.image('howtohint', 'assets/introtext2.png');
        this.load.image('backbutton', 'assets/backarrow.png');


        //loading scnene 1 images
        this.load.image('title', 'assets/gametitle.png');
        this.load.image('startgray', 'assets/graystart.png');
        this.load.image('startButton', 'assets/startbutton.png');
        this.load.image('clearButton', 'assets/redobutton2.png');
        this.load.image('inputmel', 'assets/inputmeltext.png');

        this.load.image('cnat', 'assets/whitekey.png');
        this.load.image('csharp', 'assets/blackkey.png');
        this.load.image('dnat', 'assets/whitekey.png');
        this.load.image('dsharp', 'assets/blackkey.png');
        this.load.image('enat', 'assets/whitekey.png');
        this.load.image('fnat', 'assets/whitekey.png');
        this.load.image('fsharp', 'assets/blackkey.png');
        this.load.image('gnat', 'assets/whitekey.png');
        this.load.image('gsharp', 'assets/blackkey.png');
        this.load.image('anat', 'assets/whitekey.png');
        this.load.image('asharp', 'assets/blackkey.png');
        this.load.image('bnat', 'assets/whitekey.png');
        this.load.image('plusButton', 'assets/plus.png');
        this.load.image('minusButton', 'assets/minus.png');


        //load images for winlose scene
        this.load.image('player1wins', 'assets/p1wins.png');
        this.load.image('player2wins', 'assets/p2wins.png');
        this.load.image('playagain','assets/playagain.png');

    }
    create()
    {
        //images and buttons
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "sky");
        this.background.scaleX = 10.0;
        this.background.scaleY = 10.0;

        var grayBack = this.add.image(10,0,'startgray');
        grayBack.setScale(4);
        grayBack.setOrigin(0,0);

        var title = this.add.image(110,20, 'title');
        title.setOrigin(0,0);
        title.setScale(3);

        var intro = this.add.image(0,0,'introtext');
        intro.setScale(4);
        intro.setOrigin(0,0);

        var firststart = this.add.image(240,220,'firststart'); //start button
        firststart.setScale(4);
        firststart.setOrigin(0,0);
        firststart.setInteractive();

        var instructions = this.add.image(240,320,'howto'); //how to play button
        instructions.setScale(4);
        instructions.setOrigin(0,0);
        instructions.setInteractive();

        
       
        //start scene 1 and tone js and game
        firststart.on('pointerdown', () =>
        {
            //start audio
            Tone.start();
            this.scene.start("bootGame");   
        });

        //on button event- instructions
        instructions.on('pointerdown', () =>
        { 
            this.scene.start("howtoplay");   
        });


    }

    update()
    {
        //scrolls background
        this.background.tilePositionY -= .05;
    }
}