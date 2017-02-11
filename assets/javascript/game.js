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

        typeWords("You caught " + pokemon[curPokemon].name+"!","");

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
    // console.log(randomPokemon);
    // var randomPokemon = 22;
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

      typeWords("Wild appeared!","")
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

function typeWords(words, moreWords) {
          normalWords = $('#text-display').html();
  wordsOut = true;
    $(function(){
      $("#text-display").typed({
        strings: [words,moreWords],
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

var pokemon = {
p1 :{
  name: 'Bulbasaur',
  type: 'Grass/Poison',
  number: 1,
  caught: false,
  picture: 'bulbasaur.gif'
},
p2 :{
    name: 'Ivysaur',
    type: 'Grass/Poison',
    number: 2,
    caught: false,
    picture: 'ivysaur.gif'
  },

  p3: {
    name: 'Venusaur',
    type: 'Grass/Poison',
    number: 3,
    caught: false,
    picture: "venusaur.gif" 
  },

      p4: {
    name: 'Charmander',
    type: 'Fire',
    number: 4,
    caught: false,
    picture: 'charmander.gif'
    
  },

      p5: {
    name: 'Charmeleon',
    type: 'Fire',
    number: 5,
    caught: false,
    picture: "charmeleon.gif"
    
  },


      p6: {
    name: 'Charizard',
    type: 'Fire',
    number: 6,
    caught: false,
    picture: 'charizard.gif'
  },

      p7: {
    name: 'Squirtle',
    type: 'Water',
    number: 7,
    caught: false,
    picture: 'squirtle.gif'
  },

      p8: {
    name: 'Wartortle',
    type: 'Water',
    number: 8,
    caught: false,
    picture: 'wartortle.gif'
  },

      p9: {
    name: 'Blastoise',
    type: 'Water',
    number: 4,
    caught: false,
    picture: 'blastoise.gif'
  },

      p10: {
    name: 'Caterpie',
    type: 'Bug',
    number: 10,
    caught: false,
    picture: 'caterpie.gif'
  },

      p11: {
    name: 'Metapod',
    type: 'Bug',
    number: 11,
    caught: false,
    picture: 'metapod.gif'
  },

      p12: {
    name: 'Butterfree',
    type: 'Bug/Flying',
    number: 12,
    caught: false,
    picture: 'butterfree.gif'
  },

      p13: {
    name: 'Weedle',
    type: 'Bug/Poison',
    number: 13,
    caught: false,
    picture: 'weedle.gif'
  },

      p14: {
    name: 'Kakuna',
    type: 'Bug/Poison',
    number: 14,
    caught: false,
    picture: 'kakuna.gif'
  },

      p15: {
    name: 'Beedrill',
    type: 'Bug/Poison',
    number: 15,
    caught: false,
    picture: 'beedrill.gif'
  },


      p16: {
    name: 'Pidgey',
    type: 'Normal/Flying',
    number: 16,
    caught: false,
    picture: 'pidgey.gif'
  },


      p17: {
    name: 'Pidgeotto',
    type: 'Normal/Flying',
    number: 17,
    caught: false,
    picture: 'pidgeotto.gif'
  },

      p18: {
    name: 'Pidgeot',
    type: 'Normal/Flying',
    number: 18,
    caught: false,
    picture: 'pidgeot.gif'
  },

      p19: {
    name: 'Rattata',
    type: 'Normal',
    number: 19,
    caught: false,
    picture: 'rattata.gif'
  },

      p20: {
    name: 'Raticate',
    type: 'Normal',
    number: 20,
    caught: false,
    picture: 'raticate.gif'
  },

    p21: {
    name: 'Spearow',
    type: 'Normal/Flying',
    number: 21,
    caught: false,
    picture: "spearow.gif"
  },

  p22: {
    name: 'Fearow',
    type: 'Normal/Flying',
    number: 22,
    caught: false,
    picture: 'fearow.gif'
  },

  p23: {
    name: "Ekans",
    type: 'Poison',
    number: 23,
    caught: false,
    picture: "ekans.gif"
  },

  p24: {
    name: 'Arbok',
    type: 'Poison',
    number: 24,
    caught: false,
    picture: "arbok.gif"
  },

  p25: {
    name: 'Pikachu',
    type: 'Electric',
    number: 25,
    caught: false,
    picture: "pikachu.gif"
  },

  p26: {
    name: 'Raichu',
    type: 'Electric',
    number: 26,
    caught: false,
    picture: "raichu.gif"
  },

  p27: {
    name: 'Sandshrew',
    type: 'Ground',
    number: 27,
    caught: false,
    picture: "sandshrew.gif"
  },

  p28: {
    name: 'Sandslash',
    type: 'Ground',
    number: 28,
    caught: false,
    picture: "sandslash.gif"
  },

  p29: {
    name: 'Nidoran',
    type: 'Poison',
    number: 29,
    caught: false,
    picture: "nidoranf.gif"
  },

  p30: {
    name: 'Nidorina',
    type: 'Poison',
    number: 30,
    caught: false,
    picture: "nidorina.gif"
  },

  p31: {
    name: 'Nidoqueen',
    type: 'Poison/Ground',
    number: 31,
    caught: false,
    picture: "nidoqueen.gif"
  },

  p32: {
    name: 'Niodran',
    type: 'Poison',
    number: 32,
    caught: false,
    picture: "nidoranm.gif"
  },

  p33: {
    name: "Nidorino",
    type: 'Poison',
    number: 33,
    caught: false,
    picture: 'nidorino.gif'

  },

  p34: {
    name: 'Nidoking',
    type: 'Poison/Ground',
    number: 34,
    caught: false,
    picture: "nidoking.gif"
  },

  p35: {
    name: 'Clefairy',
    type: 'Normal (Now Fairy)',
    number: 35,
    caught: false,
    picture: "clefairy.gif"
  },

  p36: {
    name: 'Clefable',
    type: 'Normal (Now Fairy)',
    number: 36,
    caught: false,
    picture: "clefable.gif"
  },

  p37: {
    name: 'Vulpix',
    type: 'Fire',
    number: 37,
    caught: false,
    picture: "vulpix.gif"
  },

  p38: {
    name: 'Ninetales',
    type: 'Fire',
    number: 39,
    caught: false,
    picture: "ninetales.gif"
  },

  p39: {
    name: 'Jigglypuff',
    type: 'Normal',
    number: 39,
    caught: false,
    picture: "jigglypuff.gif"
  },

  p40: {
    name: 'Wigglytuff',
    type: 'Normal',
    number: 40,
    caught: false,
    picture: "wigglytuff.gif"
  },

  p41: {
    name: 'Zubat',
    type: 'Poison/Flying',
    number: 41,
    caught: false,
    picture: "zubat.gif"
  },

  p42: {
    name: 'Golbat',
    type: 'Poison/Flying',
    number: 42,
    caught: false,
    picture: "golbat.gif"
  },

  p43: {
    name: 'Oddish',
    type: 'Grass/Poison',
    number: 43,
    caught: false,
    picture: "oddish.gif"
  },

  p44: {
    name: 'Gloom',
    type: 'Grass/Poison',
    number: 44,
    caught: false,
    picture: "gloom.gif"
  },

  p45: {
    name: 'Vileplume',
    type: 'Grass/Poison',
    number: 45,
    caught: false,
    picture: "vileplume.gif"
  },

  p46: {
    name: 'Paras',
    type: 'Bug/Grass',
    number: 46,
    caught: false,
    picture: "paras.gif"
  },

  p47: {
    name: 'Parasect',
    type: 'Bug/Grass',
    number: 47,
    caught: false,
    picture: "parasect.gif"
  },

  p48: {
    name: 'Venonat',
    type: 'Bug/Poison',
    number: 48,
    caught: false,
    picture: "venonat.gif"
  },

  p49: {
    name: 'Venomoth',
    type: 'Bug/Poison',
    number: 49,
    caught: false,
    picture: "venomoth.gif"
  },

  p50: {
    name: 'Diglett',
    type: 'Ground',
    number: 50,
    caught: false,
    picture: "diglett.gif"
  },

  // p51: {
  //   name: 'Spearow',
  //   type: 'Normal/Flying',
  //   number: 21,
  //   caught: false,
  //   picture: ".gif"
  // },

  }