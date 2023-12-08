class WinLose extends Phaser.Scene 
{
    constructor() 
    {
        super("endGame");
    }


    /*
    if player 1 reaches last note: display P1 Wins!!!

    if player 2 kills player 2: display P2 Wins!!!

    if player 2 dies: display P1 Wins!!!!    

    */

    create()
    {
        
        //background images
        var startBack = this.add.image(0,0,'sky');
        startBack.setOrigin(0,0);
        startBack.setScale(15);

        var grayBack = this.add.image(10,0,'startgray');
        grayBack.setScale(4);
        grayBack.setOrigin(0,0);

        if (winset == 0)
        {
            var P1win = this.add.image(10,0,'player1wins');
            P1win.setScale(4);
            P1win.setOrigin(0,0);
        }
        if (winset == 1)
        {
            var P2win = this.add.image(10,0,'player2wins');
            P2win.setScale(4);
            P2win.setOrigin(0,0);
        }


        //winlose music/sound
        const pingPong = new Tone.PingPongDelay("4n", 0.2).toDestination();
        const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
        const rev = new Tone.JCReverb(0.4).toDestination();

        const ending = new Tone.PolySynth({
            oscillator: {
                type: "sawtooth"
            },
            envelope: {
                attack: 0.1,
                decay: 0.5,
                sustain: 0.5,
                release: .5,
            },
            
        }).toDestination().connect(pingPong);//.connect(chorus);
        ending.volume.value = -5;
        const now = Tone.now();
        var tonic = outputMelody[0] % 12 + 60;
        var dom = tonic + 7;
        tonic = Tone.Frequency(tonic, "midi").toNote()
        dom = Tone.Frequency(dom, "midi").toNote();
        ending.triggerAttackRelease(tonic, "16n", now);
        ending.triggerAttackRelease(dom, "8n", now + .15); 

        //winset determines who wins, so when p1 loses all lives in scene2, write line that sets winset = 1;
        // in scene 2 wherever p2 loses all lives, write line that sets winset = 0; 

        //play again button
        var redoButton = this.add.image(410, 400, 'playagain')
        redoButton.setScale(1);
        redoButton.setInteractive();

        redoButton.on('pointerdown', () =>
        {
            location.reload();
        
        } ); 


    }
}