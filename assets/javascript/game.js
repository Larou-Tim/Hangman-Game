$(document).ready(function() {

  // if not adding all pokemon, create array to contain all numbers
  var curWord = [];
  var curGuess = [];
  var guessedLet = [];
  var guessRemain;
  var caughtCount = 0;
  var curPokemon;
  // console.log( ObjectLength(pokemon) );
  var canRun = true;
  var wordsOut = false;
  var normalWords;
// console.log()

  newGame();


//main - handles if there are button clicks
  document.onkeyup = function(event) {
    if (canRun && !wordsOut) {
      var letter = String.fromCharCode(event.keyCode).toLowerCase();
      var guess = curWord.indexOf(letter);
      var guessCap = curWord.indexOf(letter.toUpperCase());
      // console.log(curPokemon);
    
        //only allow alphbet 
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
    else if (canRun && wordsOut) {
      returnWords();
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
        $("#total-caught").html(caughtCount);
        pokemon[curPokemon].caught = true;
        pokeballThrow();

        typeWords("You caught " + pokemon[curPokemon].name+"!","Pokedex says: " + pokemon[curPokemon].pokedex);

        setTimeout(function(){ newGame(); }, 1000);
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

    var randomPokemon = Math.floor(Math.random()*50)+1;
    console.log(randomPokemon);
    // var randomPokemon = 1;
    curPokemon = 'p' + randomPokemon;
    curWord = [];
    curGuess = [];
    guessedLet = [];
    guessRemain = 6;

    
    var check = pokemon[curPokemon].caught;
    $("#picture-spot").stop();
    $("#picture-spot").empty();
    $("#picture-spot").append("<img src='assets/images/"+pokemon[curPokemon].picture+ "' alt='Pokemon Picture' id='poke-gif'>")
      canRun = true;
    if (check) {
      
      if (caughtCount != ObjectLength(pokemon)) {
        newGame();
      }
      else {alert("Caught them All!");}
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

      typeWords("Wild pokemon appeared! Can you guess it's name? Press any key to continue.");
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

$(".body").on("click",function() {
    if (wordsOut) {
      returnWords();
    }

});

  function blink (){
     $('#blink-icon').delay(200).fadeTo(200,0.0).delay(200).fadeTo(200,1, blink);
   }


  function returnWords (){
    wordsOut = false;
    $("#icon-spot").empty();
    guessedLet = [];
    $("#text-display").html(normalWords);
 }
 

}); //end of document ready

var normalWords = '<div class="row"><span>Pokemon Caught: </span><span id="total-caught">' +
                  '</span></div><div class="row"><span>Guesses Remaining: </span>' + 
                  '<span id="guesses-remaining"></span></div>'
                  '<div class="row"><span>Guessed Letters: </span><span' +
                   'id="guessed-letters"></span></div>"'
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

  p83: {
    name: 'Farfetchd',
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


  }