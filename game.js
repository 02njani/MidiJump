var config =
{
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade:
    {
      gravity: { y: 300 },
      debug: false
     }
  },
  scene: [StartScene, Instructions,Scene1, Scene2, WinLose],
  pixelArt: true
}

//init global variables 
var platforms;
var platshiftY = -120
var ground;
var barrier;
var stars;
var projectiles;
var cursors;
var player = new mm.Player();

var newNotes = []; //empty array, will contain generated sequence
var inputMelody = []; //user input array
var outputMelody = [];
const noteSeq = []; 
var lastPlat;
var lastStar;
var prevPlatform = null;
var timeInputCount = -1;

var zeta = -5;
var numspeed;
var p1life1;
var p1life2;
var p1life3;
var player1_lives;
var winset =0;
var airJump;

var p2life1;
var p2life2;
var p2life3;
var player2_lives;

var synth1;
const pingPong = new Tone.PingPongDelay("4n", 0.2);
const drum = new Tone.MembraneSynth({
  oscillator: {
    type: "sine"
  },
  filter: {
    Q : 6,
    type : "lowpass",
    rolloff : -24
  }
  }).toDestination().connect(pingPong);
pingPong.toDestination();
drum.volume.value = -30;


//this is the og sequence that the model continues, EVENTUALLY this will not be hard coded by us but instead will be input from user
var userInput = {
  notes: [], 
  totalTime: 1.0
};

//define octave
var octCount = 0;

//define keyboard 
var aKey;
var wKey;
var sKey;
var eKey;
var dKey;
var fKey;
var tKey;
var gKey;
var yKey;
var hKey;
var uKey;
var jKey;

var one;
var two;
var three;
var four;
var five;
var six; 
var seven;
var eight;
var nine;
var ten;
var eleven;
var twelve;

var shoot = false;

function keyPress(key, rect) 
{
  if (key.isDown)
   {
    if (shoot == false) {
      projectile(projectiles, rect);
      pianoPlay(rect);
      shoot = true;
      rect.setFillStyle(0x4728ff, 1);
      setTimeout(timeTheBombs, 2000);
    }
  } 
  else 
  {
    if (rect == two || rect == four || rect == seven || rect == nine || rect == eleven) 
    {
      rect.setFillStyle(0x000000, 1);
    } 
    else 
    {
      rect.setFillStyle(0xffffff, 1);
    }  
  } 
}

function projectile(projectilesGroup, rect) 
{
  projectilesGroup.create(rect.x, rect.y + 40, 'bomb');
}

function timeTheBombs() 
{
  shoot = false;
}

function pianoPlay(rect) {
  var midiVal = 60;
  if (rect == one) {
    midiVal = 84;
  } else if (rect == two) {
    midiVal = 85;
  } else if (rect == three) {
    midiVal = 86;
  } else if (rect == four) {
    midiVal = 87;
  } else if (rect == five) {
    midiVal = 88;
  } else if (rect == six) {
    midiVal = 89;
  } else if (rect == seven) {
    midiVal = 90;
  } else if (rect == eight) {
    midiVal = 91;
  } else if (rect == nine) {
    midiVal = 92;
  } else if (rect == ten) {
    midiVal = 93;
  } else if (rect == eleven) {
    midiVal = 94;
  } else if (rect == twelve) {
    midiVal = 95;
  }

  pingPong.toDestination();
  drum.triggerAttackRelease(Tone.Frequency(midiVal, "midi").toNote(), "8n");

}

  //creates game
  var game = new Phaser.Game(config);


//click sounds 
var clicksound;
var freq;

function clickSound(freq) {
    clicksound = new Tone.Synth({
      oscillator: {
        type: 'square',
        modulationFrequency: .2,
      },
      envelope: 
      {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
        release: 0.1,
      },
      
    }).toDestination();
    clicksound.volume.value = -30;
    clicksound.triggerAttackRelease(freq, '8n');
  }