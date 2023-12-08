class Instructions extends Phaser.Scene 
{
    constructor() 
    {
        super("howtoplay");
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

        var howtotext = this.add.image(130,100, 'howtotext');
        howtotext.setScale(2.7);
        howtotext.setOrigin(0);

        var howtotext = this.add.image(130,90, 'howtohint');
        howtotext.setScale(2.7);
        howtotext.setOrigin(0);

        var backbutton = this.add.image(200,400, 'backbutton');
        backbutton.setScale(.6);
        backbutton.setOrigin(0,0);
        backbutton.setInteractive();

        backbutton.on('pointerdown', () =>
        {
            this.scene.start("startGame");   
        });

    }

    update()
    {
        this.background.tilePositionY -= .05;

    }

}