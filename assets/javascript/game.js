 $(document).ready(function() {


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
      picture: 'venusaur.gif'
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
      picture: 'charmeleon.gif'
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
      picture: 'spearow.gif'
    },

  }
  // if not adding all pokemon, create array to contain all numbers
  var curWord = [];
  var curGuess = [];
  var guessRemain;
  var caughtCount = 0;
  var lastWord = -1;
  var curPokemon;
  // console.log( ObjectLength(pokemon) );

  newGame();


//main - handles if there are button clicks
  document.onkeyup = function(event) {

    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    var guess = curWord.indexOf(letter);
    var guessCap = curWord.indexOf(letter.toUpperCase());
    console.log(curPokemon);
    

    if (guess != -1 || guessCap != -1) {
      var allIndex = getAllIndexes(curWord,letter);
      var allCapIndex = getAllIndexes(curWord,letter.toUpperCase());

      for (var i = 0; i < allIndex.length; i++) {
        curGuess[allIndex[i]] = letter;
      }

       for (var i = 0; i < allCapIndex.length; i++) {
        curGuess[allCapIndex[i]] = letter.toUpperCase();
      }

      $('#wordSpot').html(curGuess)
      checkWin();
      // checkLose();
    }

    else {
      guessRemain--;
      checkLose();
      $("#guessesRemaining").html(guessRemain);
    }
  };

// checks to see if all letters have been guessed
  function checkWin() {
    var emptyLetter = curGuess.indexOf("_");
    console.log(guessRemain)
    if (emptyLetter == -1) {
      // alert('Winner Winner Chicken Dinner');
      caughtCount++;
      $("#totalCaught").html(caughtCount);
      pokemon[curPokemon].caught = true;
      newGame();
    }    
  }
  
function  checkLose() {
  if (guessRemain == 0) {
      console.log('The pokemon Escaped');
      imgEscape();
      newGame();
    }
}
function imgEscape(){

}

//creates new game and updates screen
  function newGame() {

    // var randomWord = Math.floor(Math.random()*20)+1;

    var randomPokemon = Math.floor(Math.random()*21)+1;
    // console.log(randomPokemon);
    curPokemon = 'p' + randomPokemon;
    curWord = [];
    curGuess = [];
    guessRemain = 10;
    
    var check = pokemon[curPokemon].caught;
    $("#picture-spot").html("<img src='assets/images/"+pokemon[curPokemon].picture+ "' alt='Pokemon Picture'>")
    if (check) {
      
      if (caughtCount != ObjectLength(pokemon)) {
        newGame();
      }
      else {alert("Caught them All!");}
    }
    else {
      
      curGuess =[];
      // var curName = 
      curWord = pokemon[curPokemon].name.split("");
      for (var i = 0; i < curWord.length; i++) {
        curGuess.push("_");
      }
      $('#wordSpot').html(curGuess)
      $("#guessesRemaining").html(guessRemain);
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

}); //end of document ready


 