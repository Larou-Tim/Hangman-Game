$(document).ready(function() {

  // if not adding all pokemon, create array to contain all numbers
  var curWord = [];
  var curGuess = [];
  var guessedLet = [];
  var guessRemain = 6;
  var caughtCount = 0;
  var curPokemon;
  // console.log( ObjectLength(pokemon) );
  var canRun = true;
  var needGame = false;
  var wordsOut = false;
  var normalWords = '<div class="row"><span>Pokemon Caught: </span><span id="total-caught">' + caughtCount +
                  '</span></div><div class="row"><span>Guesses Remaining: ' +  guessRemain +'</span>' + 
                  '<span id="guesses-remaining"></span></div>' +
                  '<div class="row"><span>Guessed Letters: </span><span ' +
                   'id="guessed-letters"></span></div>'
// console.log()

  newGame();


//main - handles if there are button clicks
  document.onkeyup = function(event) {
    console.log(caughtCount);
    if (canRun && !wordsOut && !needGame) {
      var letter = String.fromCharCode(event.keyCode).toLowerCase();
      var guess = curWord.indexOf(letter);
      var guessCap = curWord.indexOf(letter.toUpperCase());
      // console.log(curPokemon);
    
        //only allow alphbet - removed for mr mine/farfetchd
      if (event.keyCode > 64 && event.keyCode < 91) {

        if (guess != -1 || guessCap != -1) {
          var allIndex = getAllIndexes(curWord,letter);
          var allCapIndex = getAllIndexes(curWord,letter.toUpperCase());

          for (var i = 0; i < allIndex.length; i++) {
            curGuess[allIndex[i]] = letter;
          }

          for (var i = 0; i < allCapIndex.length; i++) {
            curGuess[allCapIndex[i]] = letter.toUpperCase();
          }

          $('#word-spot').html(curGuess)
          hpBar();
          checkWin();
        } //end inner if

        else {
          if (guessedLet.indexOf(letter) == -1) {
          guessRemain--;
          guessedLet.push(letter);
          guessCircles();
          $("#guessed-letters").append("<span>" + letter + " </span>");
          checkLose();  
          } //end inner if
        } //end else
      } //end alphebet handler if
    } //end canRun if
    else if (canRun && wordsOut && !needGame) {
      returnWords(normalWords);
    }

    else if (!canRun && wordsOut && needGame) {
        returnWords(normalWords);
        setTimeout(function(){ newGame(); }, 1000);
        needGame = false;

    }
  }; //end on click function

  // checks to see if all letters have been guessed
  function checkWin() {
      var emptyLetter = curGuess.indexOf("_");
      // console.log(guessRemain)
      if (emptyLetter == -1) {
        // alert('Winner Winner Chicken Dinner');
        canRun = false;
        caughtCount++;
        pokemon[curPokemon].caught = true;
        pokeballThrow();
        typeWords("You caught " + pokemon[curPokemon].name+"! <br />Pokedex says: " + pokemon[curPokemon].pokedex);
        needGame = true;
        // setTimeout(function(){ newGame(); }, 3000);
      }    
    }

function pokeballThrow () {
  $("#image-box").append("<img src='assets/images/pokeball.png' id='pokeball' alt='pokeball'>")
  $("#pokeball").animate({ top: "-=240px", left: "+=345px" }, "normal", function() {
    $("#poke-gif").animate({
    width: '0px',
    height: '0px',
      });

  });
  setTimeout(function(){ $("#poke-gif").remove(); }, 1000)
  setTimeout(function(){ $("#pokeball").remove(); }, 1000)
}

function  checkLose() {
  if (guessRemain == 0) {
      console.log('The pokemon Escaped');
      $("#poke-gif").animate({
        width: '0px',
        height: '0px',
        opacity: '0.2',
        left: "-=300px" 
      },"normal");

      setTimeout(function(){ newGame(); }, 1000);
      
    }
}

function guessCircles() {

        $("#guessesRemaining").html(guessRemain);
        switch (guessRemain) {
          case 6:
              $("#circle-1").css("background", "");
              $("#circle-2").css("background", "");
              $("#circle-3").css("background", "");
              $("#circle-4").css("background", "");
              $("#circle-5").css("background", "");
              $("#circle-6").css("background", "");
              break;
          case 5:
            $("#circle-1").css("background", "#666666");
            break;
          case 4:
            $("#circle-2").css("background", "#666666");
            break;
          case 3:
            $("#circle-3").css("background", "#666666");
            break;
          case 2:
            $("#circle-4").css("background", "#666666");
            break;
          case 1:
            $("#circle-5").css("background", "#666666");
            break;
          case 0:
            $("#circle-6").css("background", "#666666");
            break;
          }
}

//creates new game and updates screen
function newGame() {

    var randomPokemon = 83 //Math.floor(Math.random()*150)+1;
    // console.log(randomPokemon);
    // var randomPokemon = 1;
    curPokemon = 'p' + randomPokemon;
    curWord = [];
    guessedLet = [];
    guessRemain = 6;

    // var check = pokemon[curPokemon].caught;

    $("#picture-spot").stop();
    $("#picture-spot").empty();
    $("#picture-spot").append("<img src='assets/images/"+ pokemon[curPokemon].picture + "' alt='Pokemon Picture' id='poke-gif'>")
    if (pokemon[curPokemon].caught) {
      
      if (caughtCount != ObjectLength(pokemon)) {
        newGame();
      }
      else {alert("Caught them All!");} // add mew and special win handler
    }
    else {
      //****************** switchc to spans, add class to display unknown symbols
      
      curGuess =[];
      curWord = pokemon[curPokemon].name.split("");

      for (var i = 0; i < curWord.length; i++) {
        curGuess.push("_");
      }
      $('#word-spot').html(curGuess);
      $("#guesses-remaining").html(guessRemain);
      $("#guessed-letters").empty();

      typeWords("Wild pokemon appeared! Can you guess it's name? <br /> Press any key to continue.");
      canRun = true;
      console.log(canRun + ' ' + needGame + " " + wordsOut);
      guessCircles();
      hpBar();
    }
  }
// handler for finding all matches
  function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
      if (arr[i] === val)
        indexes.push(i);
    return indexes;
  }
//determines how many pokemon are in the array to check if they are all caught (could probably hardcode)
  function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
      if( object.hasOwnProperty(key) ) {
        ++length;
      }
    }
    return length;
  };

  function hpBar () {

    var countRemaining = getAllIndexes(curGuess,"_").length;
    var totalLetters = curGuess.length;
    var hpPercent = Math.floor( countRemaining/totalLetters * 100 );

    if (hpPercent > 50) {
      $(".progress").html('<div class="progress-bar progress-bar-success" style="width:' + hpPercent +'%"><span class="sr-only"></span></div>');

    }
    else if(hpPercent > 20) {
       $(".progress").html('<div class="progress-bar progress-bar-warning" style="width:' + hpPercent +'%"><span class="sr-only"></span></div>');
    }

    else if(hpPercent > 0) {
      $(".progress").html('<div class="progress-bar progress-bar-danger" style="width:' + hpPercent +'%"><span class="sr-only"></span></div>');     
    }
  }

function typeWords(words) {
  // console.log(words);
  // normalWords = $('#text-display').html();
  canRun = false;
  wordsOut = true;


      $(function(){
        $("#text-display").typed({
          strings: [words],
          typeSpeed: 1
        });
      });
    setTimeout(function(){  
      $("#icon-spot").append(
        '<i class="glyphicon glyphicon-triangle-bottom" aria-hidden="true" id="blink-icon"></i>'
      );
        blink();
    }, 1000);
}

// $(".body").on("click",function() {
//     if (wordsOut) {
//       returnWords();
//     }

// });

  function blink (){
     $('#blink-icon').delay(200).fadeTo(200,0.0).delay(200).fadeTo(200,1, blink);
   }


  function returnWords (){
    wordsOut = false;
    $("#icon-spot").empty();
    // guessedLet = [];
    $("#text-display").html(normalWords);
    $("#total-caught").html(caughtCount);
 }
 

}); //end of document ready


var pokemon = {
p1 :{
  name: 'Bulbasaur',
  type: 'Grass/Poison',
  number: 1,
  caught: false,
  picture: 'bulbasaur.gif',
  pokedex: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
},
p2 :{
    name: 'Ivysaur',
    type: 'Grass/Poison',
    number: 2,
    caught: false,
    picture: 'ivysaur.gif',
    pokedex: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs."
  },

  p3: {
    name: 'Venusaur',
    type: 'Grass/Poison',
    number: 3,
    caught: false,
    picture: "venusaur.gif" ,
    pokedex: "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight."
  },

      p4: {
    name: 'Charmander',
    type: 'Fire',
    number: 4,
    caught: false,
    picture: 'charmander.gif',
    pokedex: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail."
    
  },

      p5: {
    name: 'Charmeleon',
    type: 'Fire',
    number: 5,
    caught: false,
    picture: "charmeleon.gif",
    pokedex: "When it swings its burning tail, it elevates the temperature to unbearably high levels."
    
  },


      p6: {
    name: 'Charizard',
    type: 'Fire',
    number: 6,
    caught: false,
    picture: 'charizard.gif',
    pokedex:"Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally."
  },

      p7: {
    name: 'Squirtle',
    type: 'Water',
    number: 7,
    caught: false,
    picture: 'squirtle.gif',
    pokedex:"After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth."
  },

      p8: {
    name: 'Wartortle',
    type: 'Water',
    number: 8,
    caught: false,
    picture: 'wartortle.gif',
    pokedex:"Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance."
  },

      p9: {
    name: 'Blastoise',
    type: 'Water',
    number: 4,
    caught: false,
    picture: 'blastoise.gif',
    pokedex:"A brutal POKéMON with pressurized water jets on its shell. They are used for high speed tackles."
  },

      p10: {
    name: 'Caterpie',
    type: 'Bug',
    number: 10,
    caught: false,
    picture: 'caterpie.gif',
    pokedex:"Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls."
  },

      p11: {
    name: 'Metapod',
    type: 'Bug',
    number: 11,
    caught: false,
    picture: 'metapod.gif',
    pokedex:"This POKéMON is vulnerable to attack while its shell is soft, exposing its weak and tender body."
  },

      p12: {
    name: 'Butterfree',
    type: 'Bug/Flying',
    number: 12,
    caught: false,
    picture: 'butterfree.gif',
    pokedex: "In battle, it flaps its wings at high speed to release highly toxic dust into the air."
  },

      p13: {
    name: 'Weedle',
    type: 'Bug/Poison',
    number: 13,
    caught: false,
    picture: 'weedle.gif',
    pokedex: "Often found in forests, eating leaves. It has a sharp venomous stinger on its head."
  },

      p14: {
    name: 'Kakuna',
    type: 'Bug/Poison',
    number: 14,
    caught: false,
    picture: 'kakuna.gif',
    pokedex:"Almost incapable of moving, this POKéMON can only harden its shell to protect itself from predators."
  },

      p15: {
    name: 'Beedrill',
    type: 'Bug/Poison',
    number: 15,
    caught: false,
    picture: 'beedrill.gif',
    pokedex:"Flies at high speed and attacks using its large venomous stingers on its forelegs and tail."
  },


      p16: {
    name: 'Pidgey',
    type: 'Normal/Flying',
    number: 16,
    caught: false,
    picture: 'pidgey.gif',
    pokedex:"A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand."
  },


      p17: {
    name: 'Pidgeotto',
    type: 'Normal/Flying',
    number: 17,
    caught: false,
    picture: 'pidgeotto.gif',
    pokedex:"Very protective of its sprawling territorial area, this POKéMON will fiercely peck at any intruder."
  },

      p18: {
    name: 'Pidgeot',
    type: 'Normal/Flying',
    number: 18,
    caught: false,
    picture: 'pidgeot.gif',
    pokedex:"When hunting, it skims the surface of water at high speed to pick off unwary prey such as MAGIKARP."
  },

      p19: {
    name: 'Rattata',
    type: 'Normal',
    number: 19,
    caught: false,
    picture: 'rattata.gif',
    pokedex:"Bites anything when it attacks. Small and very quick, it is a common sight in many places."
  },

      p20: {
    name: 'Raticate',
    type: 'Normal',
    number: 20,
    caught: false,
    picture: 'raticate.gif',
    pokedex:"It uses its whiskers to maintain its balance. It apparently slows down if they are cut off."
  },

    p21: {
    name: 'Spearow',
    type: 'Normal/Flying',
    number: 21,
    caught: false,
    picture: "spearow.gif",
    pokedex:"Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne."
  },

  p22: {
    name: 'Fearow',
    type: 'Normal/Flying',
    number: 22,
    caught: false,
    picture: 'fearow.gif',
    pokedex:"With its huge and magnificent wings, it can keep aloft without ever having to land for rest."
  },

  p23: {
    name: "Ekans",
    type: 'Poison',
    number: 23,
    caught: false,
    picture: "ekans.gif",
    pokedex:"Moves silently and stealthily. Eats the eggs of birds, such as PIDGEY and SPEAROW, whole."
  },

  p24: {
    name: 'Arbok',
    type: 'Poison',
    number: 24,
    caught: false,
    picture: "arbok.gif",
    pokedex:"It is rumored that the ferocious warning markings on its belly differ from area to area."
  },

  p25: {
    name: 'Pikachu',
    type: 'Electric',
    number: 25,
    caught: false,
    picture: "pikachu.gif",
    pokedex:"When several of these POKéMON gather, their electricity could build and cause lightning storms."
  },

  p26: {
    name: 'Raichu',
    type: 'Electric',
    number: 26,
    caught: false,
    picture: "raichu.gif",
    pokedex:"Its long tail serves as a ground to protect itself from its own high voltage power."
  },

  p27: {
    name: 'Sandshrew',
    type: 'Ground',
    number: 27,
    caught: false,
    picture: "sandshrew.gif",
    pokedex:"Burrows deep underground in arid locations far from water. It only emerges to hunt for food."
  },

  p28: {
    name: 'Sandslash',
    type: 'Ground',
    number: 28,
    caught: false,
    picture: "sandslash.gif",
    pokedex:"Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape."
  },

  p29: {
    name: 'Nidoran',
    type: 'Poison',
    number: 29,
    caught: false,
    picture: "nidoranf.gif",
    pokedex:"Although small, its venomous barbs render this POKéMON dangerous. The female has smaller horns."
  },

  p30: {
    name: 'Nidorina',
    type: 'Poison',
    number: 30,
    caught: false,
    picture: "nidorina.gif",
    pokedex:"The female's horn develops slowly. Prefers physical attacks such as clawing and biting."
  },

  p31: {
    name: 'Nidoqueen',
    type: 'Poison/Ground',
    number: 31,
    caught: false,
    picture: "nidoqueen.gif",
    pokedex:"Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves."
  },

  p32: {
    name: 'Niodran',
    type: 'Poison',
    number: 32,
    caught: false,
    picture: "nidoranm.gif",
    pokedex:"Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom."
  },

  p33: {
    name: "Nidorino",
    type: 'Poison',
    number: 33,
    caught: false,
    picture: 'nidorino.gif',
    pokedex:"An aggressive POKéMON that is quick to attack. The horn on its head secretes a powerful venom."

  },

  p34: {
    name: 'Nidoking',
    type: 'Poison/Ground',
    number: 34,
    caught: false,
    picture: "nidoking.gif",
    pokedex:"It uses its powerful tail in battle to smash, constrict, then break the prey's bones."
  },

  p35: {
    name: 'Clefairy',
    type: 'Normal (Now Fairy)',
    number: 35,
    caught: false,
    picture: "clefairy.gif",
    pokedex:"Its magical and cute appeal has many admirers. It is rare and found only in certain areas."
  },

  p36: {
    name: 'Clefable',
    type: 'Normal (Now Fairy)',
    number: 36,
    caught: false,
    picture: "clefable.gif",
    pokedex:"A timid fairy POKéMON that is rarely seen. It will run and hide the moment it senses people."
  },

  p37: {
    name: 'Vulpix',
    type: 'Fire',
    number: 37,
    caught: false,
    picture: "vulpix.gif",
    pokedex:"At the time of birth, it has just one tail. The tail splits from its tip as it grows older."
  },

  p38: {
    name: 'Ninetales',
    type: 'Fire',
    number: 39,
    caught: false,
    picture: "ninetales.gif",
    pokedex:"Very smart and very vengeful. Grabbing one of its many tails could result in a 1000-year curse."
  },

  p39: {
    name: 'Jigglypuff',
    type: 'Normal',
    number: 39,
    caught: false,
    picture: "jigglypuff.gif",
    pokedex:"When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep."
  },

  p40: {
    name: 'Wigglytuff',
    type: 'Normal',
    number: 40,
    caught: false,
    picture: "wigglytuff.gif",
    pokedex:"The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size."
  },

  p41: {
    name: 'Zubat',
    type: 'Poison/Flying',
    number: 41,
    caught: false,
    picture: "zubat.gif",
    pokedex:"Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets."
  },

  p42: {
    name: 'Golbat',
    type: 'Poison/Flying',
    number: 42,
    caught: false,
    picture: "golbat.gif",
    pokedex:"Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly."
  },

  p43: {
    name: 'Oddish',
    type: 'Grass/Poison',
    number: 43,
    caught: false,
    picture: "oddish.gif",
    pokedex:"During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds."
  },

  p44: {
    name: 'Gloom',
    type: 'Grass/Poison',
    number: 44,
    caught: false,
    picture: "gloom.gif",
    pokedex:"The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey."
  },

  p45: {
    name: 'Vileplume',
    type: 'Grass/Poison',
    number: 45,
    caught: false,
    picture: "vileplume.gif",
    pokedex:"The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up."
  },

  p46: {
    name: 'Paras',
    type: 'Bug/Grass',
    number: 46,
    caught: false,
    picture: "paras.gif",
    pokedex:"Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host."
  },

  p47: {
    name: 'Parasect',
    type: 'Bug/Grass',
    number: 47,
    caught: false,
    picture: "parasect.gif",
    pokedex:"A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places."
  },

  p48: {
    name: 'Venonat',
    type: 'Bug/Poison',
    number: 48,
    caught: false,
    picture: "venonat.gif",
    pokedex:"Lives in the shadows of tall trees where it eats insects. It is attracted by light at night."
  },

  p49: {
    name: 'Venomoth',
    type: 'Bug/Poison',
    number: 49,
    caught: false,
    picture: "venomoth.gif",
    pokedex:"The dust-like scales covering its wings are color coded to indicate the kinds of poison it has."
  },

  p50: {
    name: 'Diglett',
    type: 'Ground',
    number: 50,
    caught: false,
    picture: "diglett.gif",
    pokedex:"Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground."
  },

  p51: {
    name: 'Dugtrio',
    caught: false,
    picture: "dugtrio.gif",
    pokedex:"A team of DIGLETT triplets. It triggers huge earthquakes by burrowing 60 miles underground."
  },

    p52: {
    name: 'Meowth',
    caught: false,
    picture: "meowth.gif",
    pokedex:"Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change."
  },


    p53: {
    name: 'Persian',
    caught: false,
    picture: "persian.gif",
    pokedex:"Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness."
  },


    p54: {
    name: 'Psyduck',
    caught: false,
    picture: "psyduck.gif",
    pokedex:"While lulling its enemies with its vacant look, this wily POKéMON will use psychokinetic powers."
  },


    p55: {
    name: 'Golduck',
    caught: false,
    picture: "golduck.gif",
    pokedex:"Often seen swimming elegantly by lake shores. It is often mistaken for the Japanese monster, Kappa."
  },


    p56: {
    name: 'Mankey',
    caught: false,
    picture: "mankey.gif",
    pokedex:"Extremely quick to anger. It could be docile one moment then thrashing away the next instant."
  },

    p57: {
    name: 'Primeape',
    caught: false,
    picture: "primeape.gif",
    pokedex:"Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught."
  },

    p58: {
    name: 'Growlithe',
    caught: false,
    picture: "growlithe.gif",
    pokedex:"Very protective of its territory. It will bark and bite to repel intruders from its space."
  },

    p59: {
    name: 'Arcanine',
    caught: false,
    picture: "arcanine.gif",
    pokedex:"A POKéMON that has been admired since the past for its beauty. It runs agilely as if on wings."
  },

    p60: {
    name: 'Poliwag',
    caught: false,
    picture: "poliwag.gif",
    pokedex:"Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand."
  },

    p61: {
    name: 'Poliwhirl',
    caught: false,
    picture: "poliwhirl.gif",
    pokedex:"Capable of living in or out of water. When out of water, it sweats to keep its body slimy."
  },

    p62: {
    name: 'Poliwrath',
    caught: false,
    picture: "poliwrath.gif",
    pokedex:"An adept swimmer at both the front crawl and breast stroke. Easily overtakes the best human swimmers."
  },

    p63: {
    name: 'Abra',
    caught: false,
    picture: "abra.gif",
    pokedex:"Using its ability to read minds, it will identify impending danger and TELEPORT to safety."
  },

    p64: {
    name: 'Kadabra',
    caught: false,
    picture: "kadabra.gif",
    pokedex:"It emits special alpha waves from its body that induce headaches just by being close by."
  },
    p65: {
    name: 'Alakazam',
    caught: false,
    picture: "alakazam.gif",
    pokedex:"Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000."
  },

    p66: {
    name: 'Machop',
    caught: false,
    picture: "machop.gif",
    pokedex:"Loves to build its muscles. It trains in all styles of martial arts to become even stronger."
  },

    p67: {
    name: 'Machoke',
    caught: false,
    picture: "machoke.gif",
    pokedex:"Its muscular body is so powerful, it must wear a power save belt to be able to regulate its motions."
  },

    p68: {
    name: 'Machamp',
    caught: false,
    picture: "machamp.gif",
    pokedex:"Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon."
  },

    p69: {
    name: 'Bellsprout',
    caught: false,
    picture: "bellsprout.gif",
    pokedex:"A carnivorous POKéMON that traps and eats bugs. It uses its root feet to soak up needed moisture."
  },

    p70: {
    name: 'Weepinbell',
    caught: false,
    picture: "weepinbell.gif",
    pokedex:"It spits out POISONPOWDER to immobilize the enemy and then finishes it with a spray of ACID."
  },
  p71: {
    name: 'Victreebel',
    caught: false,
    picture: "victreebel.gif",
    pokedex:"Said to live in huge colonies deep in jungles, although no one has ever returned from there."
  },

  p72: {
    name: 'Tentacool',
    caught: false,
    picture: "tentacool.gif",
    pokedex:"Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid."
  },

  p73: {
    name: 'Tentacruel',
    caught: false,
    picture: "tentacruel.gif",
    pokedex:"The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey."
  },

  p74: {
    name: 'Geodude',
    caught: false,
    picture: "geodude.gif",
    pokedex:"Found in fields and mountains. Mistaking them for boulders, people often step or trip on them."
  },

  p75: {
    name: 'Graveler',
    caught: false,
    picture: "graveler.gif",
    pokedex:"Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction."
  },

  p76: {
    name: 'Golem',
    caught: false,
    picture: "golem.gif",
    pokedex:"Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without damage."
  },

  p77: {
    name: 'Ponyta',
    caught: false,
    picture: "ponyta.gif",
    pokedex:"Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time."
  },

  p78: {
    name: 'Rapidash',
    caught: false,
    picture: "rapidash.gif",
    pokedex:"Very competitive, this POKéMON will chase anything that moves fast in the hopes of racing it."
  },

  p79: {
    name: 'Slowpoke',
    caught: false,
    picture: "slowpoke.gif",
    pokedex:"Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack."
  },

  p80: {
    name: 'Slowbro',
    caught: false,
    picture: "slowbro.gif",
    pokedex:"The SHELLDER that is latched onto SLOWPOKE's tail is said to feed on the host's left over scraps."
  },

  p81: {
    name: 'Magnemite',
    caught: false,
    picture: "magnemite.gif",
    pokedex:"Uses anti-gravity to stay suspended. Appears without warning and uses THUNDER WAVE and similar moves."
  },

  p82: {
    name: 'Magneton',
    caught: false,
    picture: "magneton.gif",
    pokedex:"Formed by several MAGNEMITEs linked together. They frequently appear when sunspots flare up."
  },
//********
  p83: {
    name: "Farfetchd",
    caught: false,
    picture: "farfetchd.gif",
    pokedex:"The sprig of green onions it holds is its weapon. It is used much like a metal sword."
  },

  p84: {
    name: 'Doduo',
    caught: false,
    picture: "doduo.gif",
    pokedex:"A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints."
  },


  p85: {
    name: 'Dodrio',
    caught: false,
    picture: "dodrio.gif",
    pokedex:"Uses its three brains to execute complex plans. While two heads sleep, one head stays awake."
  },

  p86: {
    name: 'Seel',
    caught: false,
    picture: "seel.gif",
    pokedex:"The protruding horn on its head is very hard. It is used for bashing through thick ice."
  },


  p87: {
    name: 'Dewgong',
    caught: false,
    picture: "dewgong.gif",
    pokedex:"Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters."
  },


  p88: {
    name: 'Grimer',
    caught: false,
    picture: "grimer.gif",
    pokedex:"Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories."
  },


  p89: {
    name: 'Muk',
    caught: false,
    picture: "muk.gif",
    pokedex:"Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison."
  },


  p90: {
    name: 'Shellder',
    caught: false,
    picture: "shellder.gif",
    pokedex:"Its hard shell repels any kind of attack. It is vulnerable only when its shell is open."
  },

  p91: {
    name: 'Cloyster',
    caught: false,
    picture: "cloyster.gif",
    pokedex:"When attacked, it launches its horns in quick volleys. Its innards have never been seen."
  },

    p92: {
    name: 'Gastly',
    caught: false,
    picture: "gastly.gif",
    pokedex:"Almost invisible, this gaseous POKéMON cloaks the target and puts it to sleep without notice."
  },

    p93: {
    name: 'Haunter',
    caught: false,
    picture: "haunter.gif",
    pokedex:"Because of its ability to slip through block walls, it is said to be from another dimension."
  },

    p94: {
    name: 'Gengar',
    caught: false,
    picture: "gengar.gif",
    pokedex:"Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright."
  },

    p95: {
    name: 'Onix',
    caught: false,
    picture: "onix.gif",
    pokedex:"As it grows, the stone portions of its body harden to become similar to a diamond, but colored black."
  },

    p96: {
    name: 'Drowzee',
    caught: false,
    picture: "drowzee.gif",
    pokedex:"Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams."
  },

    p97: {
    name: 'Hypno',
    caught: false,
    picture: "hypno.gif",
    pokedex:"When it locks eyes with an enemy, it will use a mix of PSI moves such as HYPNOSIS and CONFUSION."
  },

    p98: {
    name: 'Krabby',
    caught: false,
    picture: "krabby.gif",
    pokedex:"Its pincers are not only powerful weapons, they are used for balance when walking sideways."
  },

    p99: {
    name: 'Kingler',
    caught: false,
    picture: "kingler.gif",
    pokedex:"The large pincer has 10000 hp of crushing power. However, its huge size makes it unwieldy to use."
  },

    p100: {
    name: 'Voltorb',
    caught: false,
    picture: "voltorb.gif",
    pokedex:"Usually found in power plants. Easily mistaken for a POKé BALL, they have zapped many people."
  },

  p101: {
    name: 'Electrode',
    caught: false,
    picture: "electrode.gif",
    pokedex:"It stores electric energy under very high pressure. It often explodes with little or no provocation."
  },

  p102: {
    name: 'Exeggcute',
    caught: false,
    picture: "exeggcute.gif",
    pokedex:"Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms."
  },

  p103: {
    name: 'Exeggutor',
    caught: false,
    picture: "exeggutor.gif",
    pokedex:"Legend has it that on rare occasions, one of its heads will drop off and continue on as an EXEGGCUTE."
  },

  p104: {
    name: 'Cubone',
    caught: false,
    picture: "cubone.gif",
    pokedex:"Wears the skull of its deceased mother. Its cries echo inside the skull and come out as a sad melody."
  },

  p105: {
    name: 'Marowak',
    caught: false,
    picture: "marowak.gif",
    pokedex:"The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets."
  },

  p106: {
    name: 'Hitmonlee',
    caught: false,
    picture: "Hitmonlee.gif",
    pokedex:"When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides."
  },

  p107: {
    name: 'Hitmonchan',
    caught: false,
    picture: "hitmonchan.gif",
    pokedex:"While apparently doing nothing, it fires punches in lightning fast volleys that are impossible to see."
  },

  p108: {
    name: 'Lickitung',
    caught: false,
    picture: "lickitung.gif",
    pokedex:"Its tongue can be extended like a chameleon's. It leaves a tingling sensation when it licks enemies."
  },

  p109: {
    name: 'Koffing',
    caught: false,
    picture: "koffing.gif",
    pokedex:"Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning."
  },

  p110: {
    name: 'Weezing',
    caught: false,
    picture: "weezing.gif",
    pokedex:"It lives and grows by absorbing dust, germs and poison gases that are contained in toxic waste and garbage."
  },

  p111: {
    name: 'Rhyhorn',
    caught: false,
    picture: "rhyhorn.gif",
    pokedex:"Its massive bones are 1000 times harder than human bones. It can easily knock a trailer flying."
  },

  p112: {
    name: 'Rhydon',
    caught: false,
    picture: "rhydon.gif",
    pokedex:"Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees."
  },

  p113: {
    name: 'Chansey',
    caught: false,
    picture: "chansey.gif",
    pokedex:"A rare and elusive POKéMON that is said to bring happiness to those who manage to get it."
  },

  p114: {
    name: 'Tangela',
    caught: false,
    picture: "tangela.gif",
    pokedex:"The whole body is swathed with wide vines that are similar to seaweed. Its vines shake as it walks."
  },

  p115: {
    name: 'Kangaskhan',
    caught: false,
    picture: "kangaskhan.gif",
    pokedex:"The infant rarely ventures out of its mother's protective pouch until it is 3 years old."
  },

  p116: {
    name: 'Horsea',
    caught: false,
    picture: "horsea.gif",
    pokedex:"Known to shoot down flying bugs with precision blasts of ink from the surface of the water."
  },

  p117: {
    name: 'Seadra',
    caught: false,
    picture: "seadra.gif",
    pokedex:"Capable of swimming backwards by rapidly flapping its wing-like pectoral fins and stout tail."
  },

  p118: {
    name: 'Goldeen',
    caught: false,
    picture: "goldeen.gif",
    pokedex:"Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen."
  },

  p119: {
    name: 'Seaking',
    caught: false,
    picture: "seaking.gif",
    pokedex:"In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks."
  },

  p120: {
    name: 'Staryu',
    caught: false,
    picture: "staryu.gif",
    pokedex:"An enigmatic POKéMON that can effortlessly regenerate any appendage it loses in battle."
  },

  p121: {
    name: 'Starmie',
    caught: false,
    picture: "starmie.gif",
    pokedex:"Its central core glows with the seven colors of the rainbow. Some people value the core as a gem."
  },
//********
  p122: {
    name: 'MrMine',
    caught: false,
    picture: "mrmine.gif",
    pokedex:"If interrupted while it is miming, it will slap around the offender with its broad hands."
  },

  p123: {
    name: 'Scyther',
    caught: false,
    picture: "scyther.gif",
    pokedex:"With ninja-like agility and speed, it can create the illusion that there is more than one."
  },

  p124: {
    name: 'Jynx',
    caught: false,
    picture: "jynx.gif",
    pokedex:"It seductively wiggles its hips as it walks. It can cause people to dance in unison with it."
  },

  p125: {
    name: 'Electabuzz',
    caught: false,
    picture: "electabuzz.gif",
    pokedex:"Normally found near power plants, they can wander away and cause major blackouts in cities."
  },

  p126: {
    name: 'Magmar',
    caught: false,
    picture: "magmar.gif",
    pokedex:"Its body always burns with an orange glow that enables it to hide perfectly among flames."
  },

  p127: {
    name: 'Pinsir',
    caught: false,
    picture: "pinsir.gif",
    pokedex:"If it fails to crush the victim in its pincers, it will swing it around and toss it hard."
  },

  p128: {
    name: 'Tauros',
    caught: false,
    picture: "tauros.gif",
    pokedex:"When it targets an enemy, it charges furiously while whipping its body with its long tails."
  },

  p129: {
    name: 'Magikarp',
    caught: false,
    picture: "magikarp.gif",
    pokedex:"In the distant past, it was somewhat stronger than the horribly weak descendants that exist today."
  },

  p130: {
    name: 'Gyarados',
    caught: false,
    picture: "gyarados.gif",
    pokedex:"Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage."
  },


  p131: {
    name: 'Lapras',
    caught: false,
    picture: "lapras.gif",
    pokedex:"A POKéMON that has been overhunted almost to extinction. It can ferry people across the water."
  },

  p132: {
    name: 'Ditto',
    caught: false,
    picture: "ditto.gif",
    pokedex:"Capable of copying an enemy's genetic code to instantly transform itself into a duplicate of the enemy."
  },

  p133: {
    name: 'Eevee',
    caught: false,
    picture: "eevee.gif",
    pokedex:"Its genetic code is irregular. It may mutate if it is exposed to radiation from element STONEs."
  },

  p134: {
    name: 'Vaporeon',
    caught: false,
    picture: "vaporeon.gif",
    pokedex:"Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid's."
  },

  p135: {
    name: 'Jolteon',
    caught: false,
    picture: "jolteon.gif",
    pokedex:"It accumulates negative ions in the atmosphere to blast out 10000-volt lightning bolts."
  },

  p136: {
    name: 'Flareon',
    caught: false,
    picture: "flareon.gif",
    pokedex:"When storing thermal energy in its body, its temperature could soar to over 1600 degrees."
  },

  p137: {
    name: 'Porygon',
    caught: false,
    picture: "porygon.gif",
    pokedex:"A POKéMON that consists entirely of programming code. Capable of moving freely in cyberspace."
  },

  p138: {
    name: 'Omanyte',
    caught: false,
    picture: "omanyte.gif",
    pokedex:"Although long extinct, in rare cases, it can be genetically resurrected from fossils."
  },

  p139: {
    name: 'Omastar',
    caught: false,
    picture: "omastar.gif",
    pokedex:"A prehistoric POKéMON that died out when its heavy shell made it impossible to catch prey."
  },

  p140: {
    name: 'Kabuto',
    caught: false,
    picture: "kabuto.gif",
    pokedex:"A POKéMON that was resurrected from a fossil found in what was once the ocean floor eons ago."
  },

  p141: {
    name: 'Kabutops',
    caught: false,
    picture: "kabutops.gif",
    pokedex:"Its sleek shape is perfect for swimming. It slashes prey with its claws and drains the body fluids."
  },

  p142: {
    name: 'Aerodactyl',
    caught: false,
    picture: "aerodactyl.gif",
    pokedex:"A ferocious, prehistoric POKéMON that goes for the enemy's throat with its serrated saw-like fangs."
  },

  p143: {
    name: 'Snorlax',
    caught: false,
    picture: "snorlax.gif",
    pokedex:"Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful."
  },

  p144: {
    name: 'Articuno',
    caught: false,
    picture: "articuno.gif",
    pokedex:"A legendary bird POKéMON that is said to appear to doomed people who are lost in icy mountains."
  },

  p145: {
    name: 'Zapdos',
    caught: false,
    picture: "zapdos.gif",
    pokedex:"A legendary bird POKéMON that is said to appear from clouds while dropping enormous lightning bolts."
  },

  p146: {
    name: 'Moltres',
    caught: false,
    picture: "moltres.gif",
    pokedex:"Known as the legendary bird of fire. Every flap of its wings creates a dazzling flash of flames."
  },

  p147: {
    name: 'Dratini',
    caught: false,
    picture: "dratini.gif",
    pokedex:"Long considered a mythical POKéMON until recently when a small colony was found living underwater."
  },

  p148: {
    name: 'Dragonair',
    caught: false,
    picture: "dragonair.gif",
    pokedex:"A mystical POKéMON that exudes a gentle aura. Has the ability to change climate conditions."
  },

  p149: {
    name: 'Dragonite',
    caught: false,
    picture: "dragonite.gif",
    pokedex:"An extremely rarely seen marine POKéMON. Its intelligence is said to match that of humans."
  },

  p150: {
    name: 'Mewtwo',
    caught: false,
    picture: "mewtwo.gif",
    pokedex:"It was created by a scientist after years of horrific gene splicing and DNA engineering experiments."
  },

  p151: {
    name: 'Mew',
    caught: false,
    picture: "mew.gif",
    pokedex:"So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide."
  },


  }