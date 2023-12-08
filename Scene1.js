class Scene1 extends Phaser.Scene 
{
    constructor() 
    {
        super("bootGame");
    }

    create()

    {   
       
        //background images
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "sky");
        this.background.scaleX = 10.0;
        this.background.scaleY = 10.0;

        var grayBack = this.add.image(10,0,'startgray');
        grayBack.setScale(4);
        grayBack.setOrigin(0,0);

        var title = this.add.image(110,20, 'title');
        title.setOrigin(0,0);
        title.setScale(3);

        var title = this.add.image(110,20, 'inputmel');
        title.setOrigin(0,0);
        title.setScale(3);

        //User input text
        var start = false;
       
        //START Button
        var startButton = this.add.image(470, 420, 'startButton')
        startButton.setScale(.45);
        startButton.setInteractive();

        //BACK button
        var backbutton = this.add.image(330,420, 'backbutton');
        backbutton.setScale(.9);
        backbutton.setInteractive();

        backbutton.on('pointerdown', () =>
        {
            clickSound(500);
            octCount = 0;
            inputMelody = [];
            this.scene.start("startGame");   
        });

        //CLEAR Button
        var clearButton = this.add.image(500, 200, 'clearButton');
        clearButton.setScale(.8);
        clearButton.setInteractive();

        //plus Octave button
        var plusButton = this.add.image(420,220,'plusButton');
        plusButton.setScale(3);
        plusButton.setInteractive();

        //minus Octave Button
        var minusButton = this.add.image(420,240,'minusButton');
        minusButton.setScale(3);
        minusButton.setInteractive();
       
        //Keyboard Layout
        var cnat = this.add.image(200,200,'cnat');
        var dnat = this.add.image(231,200,'dnat');
        var enat = this.add.image(262,200,'enat');
        var fnat = this.add.image(293,200,'fnat');
        var gnat = this.add.image(324,200,'gnat');
        var anat = this.add.image(355,200,'anat');
        var bnat = this.add.image(386,200,'bnat');
        var csharp = this.add.image(215,185,'csharp');
        csharp.setScale(1,.75);
        var dsharp = this.add.image(247,185,'dsharp');
        dsharp.setScale(1,.75);
        var fsharp = this.add.image(307,185,'fsharp');
        fsharp.setScale(1,.75);
        var gsharp = this.add.image(339,185,'gsharp');
        gsharp.setScale(1,.75);
        var asharp = this.add.image(371,185,'asharp'); 
        asharp.setScale(1,.75);

        //creates keyboard buttons and displays notes 
        var displayText = this.add.text(185,310,"Input Melody: ", {fill: 'black'});
        var count=0;
        var textPos=400;
        var currentNote;
        var displayText;
        var octText = this.add.text(185,270,'Octave:', {fill:'black'});
        var octVal = this.add.text(260,270, '',{fill: 'black'});
        var octClear = this.add.text(260,270, '',{fill: 'black'});

        var textCleared = this.add.text(430,280,'', {fill: 'red'}); 
        var inputNote;
    
       
        var keyboardButtons = [cnat,csharp,dnat,dsharp,enat,fnat,fsharp,gnat,gsharp,anat,asharp,bnat];


        //plus Octave Button 
        plusButton.on('pointerdown', () =>
        {
            clickSound(200);
            octClear.visible = false;
            octCount++;
            if (octCount<=2)
            {
                octVal.visible = false;
                octVal = this.add.text(260,270, octCount,{fill: 'black'});
                console.log(octCount);
            }
            else
            {
                octCount = 2;
            }
            
        } ); 

         //plus Octave Button 
         minusButton.on('pointerdown', () =>
         {
            clickSound(200);
            octCount--;
            octClear.visible = false;
             if (octCount >= 0)
             {
                octVal.visible=false;
                octVal = this.add.text(260,270, octCount,{fill: 'black'});
                console.log(octCount);
             }
             else
             {
                octCount = 0;
             }
             
         } ); 

        for  (let i = 0; i < 12; i++)
        {
       
            var currentNote = keyboardButtons[i].setInteractive();

            currentNote.on('pointerdown', () =>
            {
                displayText.visible = true;
                textCleared.visible = false;
                
                if(!(inputMelody.length > 7))
                {
                    inputMelody[count] = 60+i+octCount*12;
                    
                    const ampEnv = new Tone.AmplitudeEnvelope({
                        attack: 0.8,
                        decay: 1.0,
                        sustain: 1.0,
                        release: 3.0
                    }).toDestination();
                    const osc = new Tone.Oscillator(Tone.Frequency(60 + i+octCount*12, "midi").toFrequency(), "sine").connect(ampEnv).start();
                    ampEnv.triggerAttackRelease("4t");


                    timeInputCount++;
                    userInput.notes.push({ pitch: 60+i, startTime: 0.0+1.0*timeInputCount, endTime: 1.0+timeInputCount*1.0 });
                
                    textPos = textPos + 30;
                    currentNote = inputMelody[count];
                    inputNote = Tone.Frequency(inputMelody[count], "midi").toNote();

                
                    displayText.appendText(inputNote + "  ", false);
                                
                    count = count + 1;
                }
            
            } ); 

        } 
   
      
        //magenta music rnn sequence generation/////////////////////////////////////////////////////////////////////////////////

        var music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
        music_rnn.initialize();

        var rnn_steps = 25; //how many steps to continue generating 
        var rnn_temperature = 1.2; //variability of generated sequence, Note: anything above 1.5 will essentially be random!!
        const qns = mm.sequences.quantizeNoteSequence(userInput, 4); //second argument is quantizes sequence, 4 is quarter note i think
        async function generateMelody() {
            //this is generating the sequence with AI
            const melody = await music_rnn.continueSequence(qns, rnn_steps, rnn_temperature);
            // console.log(melody.notes[0].pitch);
            return melody.notes;
        }

        let melody;
          
      
        //clear button removes previous user input 
        clearButton.on('pointerdown', () =>
        {
            clickSound(500);

            count = 0;
            octCount = 0;
            octVal.setVisible(false);

            inputMelody = [];
            displayText.visible=false;
            displayText = this.add.text(185,310,"Input Melody: ", {fill: 'black'});
            textCleared = this.add.text(330,310,'MELODY CLEARED', {fill: 'red'}); 
            textCleared.visible = true;

            octClear = this.add.text(260,270, octCount,{fill: 'black'});
            
            console.log('cleared');
        } ); 
        
  

        //does not allow player to start game until input is inserted 
        startButton.on('pointerdown', () =>
        {
            clickSound(500);
            this.add.text(420,350,"Loading...", {fill: "red"});
            if (!start && inputMelody[0]>0){

                async function setup() {
                    melody = await generateMelody();
                    while(melody.length < 15)  //this makes sure at least 15 platforms are generated
                    {
                        melody = await generateMelody();
        
                    }
                }  
                
                (async () => { //this starts game AFTER sequence is generated!
                    await setup()
                    for (let i = 0; i < melody.length; i++) 
                    {
                      //this variable is the midi values of the new melody
                      newNotes.push(melody[i].pitch);
                    } 

                    start =true;
                    outputMelody = inputMelody.concat(newNotes);
                    this.scene.start("playGame");
                  
                })() 

                
            } else{
                this.add.text(250,360,"PLEASE ENTER YOUR MELODY TO START",{fill: "red"}, {align: 'center'});
            }
        }); 
       
    }

    update()
    {
        //scrolls background
        this.background.tilePositionY -= .05;
    }

}
