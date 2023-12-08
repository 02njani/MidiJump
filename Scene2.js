class Scene2 extends Phaser.Scene 
{
    constructor() 
    {
        super("playGame");
    }
    
    

    create ()
    {
        //Background Music ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var noteDur = .25; //length of each note played
        const reverb = new Tone.JCReverb(0.4).toDestination();
        synth1 = new Tone.PolySynth({
            oscillator: {
                type: "sawtooth"
            },
            envelope: {
                attack: 0.3,
                decay: 0.5,
                sustain: 0.5,
                release: .5,
            },
        }).toDestination().chain(reverb);//.connect(chorus);
        synth1.volume.value = -5;

        function play() 
        {
            let delay = Tone.now();
            for(let i = 0; i < outputMelody.length; i++) 
            {
                delay += noteDur;
                synth1.triggerAttackRelease(Tone.Frequency(outputMelody[i] % 12 + 48, "midi").toFrequency(), noteDur, delay, 0.1);
            }
        }
        var totTime = noteDur * outputMelody.length;
        const loopA = new Tone.Loop(time => {
            play()
        },  totTime).start(0);
        Tone.Transport.start(); 

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
        for (let j = 0; j < outputMelody.length; j++) //converts sequence to note values 
        {
            noteSeq.push(Tone.Frequency(outputMelody[j], "midi").toNote())
        }

        //background tileSprite
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "sky");
        this.background.scaleX = 10.0;
        this.background.scaleY = 10.0;


        //Life system variables and images
        var p1text;
        var p2text;
        p1text = this.add.image(22,120, 'p1life');
        p2text = this.add.image(775,120, 'p2life');

        player1_lives = 3;

        p1life1 = this.add.image(775,18, 'heart');
        p1life1.setScale(1);
        p1life2 = this.add.image(775, 53,'heart');
        p1life2.setScale(1);
        p1life3 = this.add.image(775,88, 'heart');
        p1life3.setScale(1);

        player2_lives = 3;

        p2life1 = this.add.image(22,18, 'heart2');
        p2life1.setScale(1);
        p2life2 = this.add.image(22, 53,'heart2');
        p2life2.setScale(1);
        p2life3 = this.add.image(22,88, 'heart2');
        p2life3.setScale(1);

        //platform generation ///////////////////////////////////////////////////////////////////////////////////////
        platforms = this.physics.add.group();
        ground = this.physics.add.staticGroup();
        barrier = this.physics.add.staticGroup();
        stars = this.physics.add.group();
        
        var beta;
        var c = 520 ;
        var checkNote;
        var noteIndex;

        const seqlist = [60, 61, 62,63,64,65,66,67,68,69,70,71];
        const notex = [100, 150, 200, 250, 300, 400, 450, 500, 550, 600, 650, 700]         

        function platgen(outputMelody)

        {

            for (let i = 0; i < outputMelody.length; i++) 
            {
                 
                checkNote = (outputMelody[i] % 12) + 60 //scales down MIDI values to one octave (60 to 71 or C4 to B4)

                for (let j = 60; j < 73; j++)
                {
                    
                    if (checkNote == j)
                    {
                        
                        beta = (j%60); //scales j back to 0-11 to index notey[]
                        noteIndex = (j % 60); // j scaled to 0-11 for pulling x pos values from notex
                        c = c - 150;

                        ////creates platforms and sound platforms
                        if (i == (outputMelody.length - 1))
                        {
                            platforms.create(notex[noteIndex], c, 'goldplat').setScale(1.5, .7).refreshBody().setImmovable();
                            stars.create(notex[noteIndex], c-4, 'goldstar').setScale(1.5, .5).refreshBody().setImmovable();
                        }
                        else
                        {
                            platforms.create(notex[noteIndex], c, 'plat').setScale(1.5, .7).refreshBody().setImmovable();
                            stars.create(notex[noteIndex], c-4, 'star').setScale(1.5, .5).refreshBody().setImmovable();
                        }

                    }
                }
            }
        }
    
    
        platgen(outputMelody); //where platform gen function is called

        /////////////////////////////////////////////////////////////////////////////////////////////////////
        //P2 piano generation
        one = this.add.rectangle(100,50,100,100, 0xffffff);
        one.setStrokeStyle(2, 0x000000);
        
        three = this.add.rectangle(200,50,100,100,0xffffff);
        three.setStrokeStyle(2, 0x000000);
        
        two = this.add.rectangle(150,25,50,50, 0x000000);
        two.setStrokeStyle(2, 0x000000);
        
        five = this.add.rectangle(300, 50, 100, 100, 0xffffff);
        five.setStrokeStyle(2, 0x000000);
        
        four = this.add.rectangle(250,25,50,50,0x000000);
        four.setStrokeStyle(2, 0x000000);
        
        six = this.add.rectangle(400,50,100,100,0xffffff);
        six.setStrokeStyle(2, 0x000000);
        
        eight = this.add.rectangle(500,50,100,100, 0xffffff);
        eight.setStrokeStyle(2, 0x000000);
        
        seven = this.add.rectangle(450, 25, 50, 50, 0x000000);
        seven.setStrokeStyle(2, 0x000000);
        
        ten = this.add.rectangle(600,50,100,100,0xffffff);
        ten.setStrokeStyle(2, 0x000000);
        
        nine = this.add.rectangle(550, 25,50,50,0x000000);
        nine.setStrokeStyle(2, 0x000000);
       
        twelve = this.add.rectangle(700,50,100,100, 0xffffff);
        twelve.setStrokeStyle(2, 0x000000);
        
        eleven = this.add.rectangle(650, 25, 50, 50, 0x000000);
        eleven.setStrokeStyle(2, 0x000000);
       
        this.add.text(100,60,"A", {font: "20px Lucida Console", fill: 'black'});
        this.add.text(140,25,"W", {font: "20px Lucida Console", fill: 'white'});
        this.add.text(200,60,"S", {font: "20px Lucida Console", fill: 'black'});
        this.add.text(240,25,"E", {font: "20px Lucida Console", fill: 'white'});
        this.add.text(300,60,"D", {font: "20px Lucida Console", fill: 'black'});
        this.add.text(400,60,"F", {font: "20px Lucida Console", fill: 'black'});
        this.add.text(440,25,"T", {font: "20px Lucida Console", fill: 'white'});
        this.add.text(500,60,"G", {font: "20px Lucida Console", fill: 'black'});
        this.add.text(540,25,"Y", {font: "20px Lucida Console", fill: 'white'});
        this.add.text(600,60,"H", {font: "20px Lucida Console", fill: 'black'});
        this.add.text(640,25,"U", {font: "20px Lucida Console", fill: 'white'});
        this.add.text(700,60,"J", {font: "20px Lucida Console", fill: 'black'});

        projectiles = this.physics.add.group();

        aKey = this.input.keyboard.addKey('a');
        wKey = this.input.keyboard.addKey('w');
        sKey = this.input.keyboard.addKey('s');
        eKey = this.input.keyboard.addKey('e');
        dKey = this.input.keyboard.addKey('d');
        fKey = this.input.keyboard.addKey('f');
        tKey = this.input.keyboard.addKey('t');
        gKey = this.input.keyboard.addKey('g');
        yKey = this.input.keyboard.addKey('y');
        hKey = this.input.keyboard.addKey('h');
        uKey = this.input.keyboard.addKey('u');
        jKey = this.input.keyboard.addKey('j');

        /////////////////////////////////////////////////////////////////////////////////////////////////////

        ground.create(400, 568, 'ground').setScale(3).refreshBody(); // bottom platform or 'ground'
        barrier.create(400, 605, 'barrier').setScale(9, .25).refreshBody();
        player = this.physics.add.sprite(100, 450, 'littleguy');

        cursors = this.input.keyboard.createCursorKeys();

        //sprite movement
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('littleguy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'littleguy', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('littleguy', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
  
        
        //Collisions for player, ground, platforms, stars, and enemies ==============================================================
        
        this.physics.add.collider(ground, player);        
       
        this.physics.add.collider(player, platforms);
      
        this.physics.add.collider(barrier, platforms, removePlat); //deletes plat once it passes canvas

        function removePlat(barrier, plat)
        {
            plat.disableBody(true,true);
        }

        this.physics.add.collider(barrier, stars, removeStar); //deletes star once it passes canvas

        function removeStar(barrier, star)
        {
            star.disableBody(true,true);
        }

        this.physics.add.overlap(platforms, ground, noGround, null, this); //removes ground when plats and ground overlap

        function noGround() 
        {
            platforms.incY(platshiftY); //shifts plats up to avoid overlap
            stars.incY(platshiftY);
            ground.clear(true,false);
        }

        // Player and Star overlap collision, notes played when player steps on star
        lastStar = stars.getLast(true);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        function collectStar(player, star) 
        {
            //checks the last platform
            if (star == prevPlatform) 
            {
                return;
            }
            prevPlatform = star;

            var i = 0;
            var check = false;
            stars.children.each(function(child) {
                if (child == star) {
                    check = true;
                    //console.log(i);
                } else if (check == false) {
                    i++;
                }
              }, this);
           
            var index = i;
            
            
            const ampEnv = new Tone.AmplitudeEnvelope({
                attack: 0.2,
                decay: 1.0,
                sustain: 1.0,
                release: 2.0
            }).toDestination();
            const osc = new Tone.Oscillator(Tone.Frequency(outputMelody[index], "midi").toFrequency(), "sine").connect(ampEnv).start();
            osc.volume.value = -8;
            ampEnv.triggerAttackRelease("4t");

            ground.clear(true, false); //removes bottom platform 

            //triggers win scene if player hits last star 
            if (lastStar == star)
            {
                synth1.volume.value = -88;
                winset = 0; //p1 wins
                this.scene.start("endGame");
            }
        }

        
        this.physics.add.overlap(platforms, projectiles, deleteBomb, null, this);//deletes bombs upon collision with plats

        function deleteBomb(platforms, projectile) 
        {
            projectile.disableBody(true,true);
            const hitBombsynth = new Tone.MembraneSynth().toDestination();
            hitBombsynth.volume.value = -20;
            hitBombsynth.triggerAttackRelease("C2", "8n");
        }

        this.physics.add.overlap(barrier, projectiles, enemyKill, null, this);
        function enemyKill(barrier, projectile) 
        {
            player2_lives = player2_lives-1;
            if (player2_lives == 2) {
                p2life3.destroy();
            } else if(player2_lives == 1) {
                p2life2.destroy();
            } else if (player2_lives == 0) {
                synth1.volume.value = -88;
                p2life1.destroy(); 
                winset = 0; //p1 wins 
                this.scene.start("endGame"); 
            }
            
            projectile.disableBody(true, true);
        }

        this.physics.add.overlap(player, projectiles, getBombed, null, this);

        function getBombed(player, projectile) //deletes bombs upon collision with player
        {
            projectile.disableBody(true, true);
            
            pingPong.disconnect();
            const synth = new Tone.MembraneSynth().toDestination();
            synth.volume.value = -20;
            synth.triggerAttackRelease("C2", "8n");
          
            player1_lives = player1_lives-1;

            if (player1_lives == 2) {
                p1life3.destroy();
                player.setPosition(100, 450); 
                ground.create(400, 568, 'ground').setScale(3).refreshBody();
                zeta = -5;
                platforms.incY(platshiftY-20); 
                stars.incY(platshiftY-20);
                prevPlatform = null;

            } else if(player1_lives == 1) {
                p1life2.destroy();
                player.setPosition(100, 450); 
                ground.create(400, 568, 'ground').setScale(3).refreshBody();
                zeta = -5;
                platforms.incY(platshiftY-20); 
                stars.incY(platshiftY-20);
                prevPlatform = null;

            } else if (player1_lives == 0) {
                synth1.volume.value = -88;
                p1life1.destroy();
                player.setPosition(100, 450); 
                ground.create(400, 568, 'ground').setScale(3).refreshBody();
                zeta = -5;
                platforms.incY(platshiftY-20); 
                stars.incY(platshiftY-20);
                prevPlatform = null;
                winset = 1; //p2 wins
                this.scene.start("endGame");

            }

        }
        
        //=============================================================================================================================
        

        //does not start game until any key is hit
        this.input.keyboard.on('keydown', event =>
        {
            zeta = 40; 
        });

    } 
        
    
    update()
    {
        //set speed of platforms 
        platforms.setVelocityY(zeta);
        stars.setVelocityY(zeta);
        projectiles.setVelocityY(150);  //P2 projectile speed

        //scrolls background
        this.background.tilePositionY -= .05;

        //deletes plats that go below canvas 
        if (platforms.x > 400)
        {
            plat.destroy(true);
        } 

        ///player movement---------------------------------------------------------------
        if (cursors.left.isDown)
        {
            player.setVelocityX(-200); // P1 move left
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {   
            player.setVelocityX(200); // P1 move right
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0); // if no keys are pressed, player does not move 
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) // P1 can jump only if standing on platform
        {
            player.setVelocityY(-250);
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.up) && !player.body.touching.down && airJump == 0) 
        {
            player.setVelocityY(-200);
            airJump = 1;
        }
        if (player.body.touching.down) {
            airJump = 0;
        }
        
        // Screen wrap around functionality for player
        if (player.x < 0) {
            player.x = 800;
        } else if (player.x > 800) {
            player.x = -0;
        }
        //----------------------------------------------------------------------------
       
        //2nd player keyboard input
        keyPress(aKey, one);
        keyPress(wKey, two);
        keyPress(sKey, three);
        keyPress(eKey, four);
        keyPress(dKey, five);
        keyPress(fKey, six);
        keyPress(tKey, seven);
        keyPress(gKey, eight);
        keyPress(yKey, nine);
        keyPress(hKey, ten);
        keyPress(uKey, eleven);
        keyPress(jKey, twelve);

        //life system conditionals for player 1
        if (player.y > 610) 
        {
            player1_lives = player1_lives-1;
            if (player1_lives == 2) {
                p1life3.destroy();
                player.setPosition(100, 450); 
                platforms.incY(platshiftY-20); 
                stars.incY(platshiftY-20);
                ground.create(400, 568, 'ground').setScale(3).refreshBody();
                prevPlatform = null;
                zeta = -5;   
            } 
            else if(player1_lives == 1) 
            {
                p1life2.destroy();
                player.setPosition(100, 450);
                platforms.incY(platshiftY-20); 
                stars.incY(platshiftY-20); 
                ground.create(400, 568, 'ground').setScale(3).refreshBody();
                prevPlatform = null;
                zeta = -5;
            } 
            else if (player1_lives == 0) 
            {
                synth1.volume.value = -88;
                p1life1.destroy();
                player.setPosition(100, 450); 
                platforms.incY(platshiftY-20); 
                stars.incY(platshiftY-20);
                ground.create(400, 568, 'ground').setScale(3).refreshBody();
                prevPlatform = null;
                zeta = -5;

                winset = 1; //p2 wins
                this.scene.start("endGame");

            }
        }        

    }
}
