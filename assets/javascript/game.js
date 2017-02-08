 
      $(document).ready(function() {

      // var words =['pokemon','pikachu','charizard','bulbasaur', 'jigglypuff','squirtle','pidgey','snorlax','butterfree', 'beedrill', 'rattata', 'ekans', 'nidoking','clefary','vulpix','gloom','diglett','meowth','psyduck','abra'];

      var pokemon = {
        p1 :{
          name: 'Bulbasaur',
          type: 'Grass/Poison',
          number: 1,
          caught: false,
        },
        p2: {
          name: 'Charmander',
          type: 'Fire',
          number: 4,
          caught: false,
        },
        p3: {
          name: 'Venusaur',
          type: 'Grass/Poison',
          number: 3,
          caught: false,
        }
      }
      // if not adding all pokemon, create array to contain all numbers
      var curWord = [];
      var curGuess = [];;
      var guessRemain;
      var caughtCount = 0;
      var lastWord = -1;
      var curPokemon;
      // Array(words.length).join("_");
      // console.log( _.size(obj.Data) );
        console.log( ObjectLength(pokemon) );
      newGame();

  document.onkeyup = function(event) {

        // Captures the key press, converts it to lowercase, and saves it to a variable.
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        //index to determine if there are matches can probably replace this
        var guess = curWord.indexOf(letter);
        var guessCap = curWord.indexOf(letter.toUpperCase());
        console.log(guessCap);
 

        if (guess != -1 || guessCap != -1) {
          var allIndex = getAllIndexes(curWord,letter);
          var allCapIndex = getAllIndexes(curWord,letter.toUpperCase());

            for (var i = 0; i < allIndex.length; i++) {
              curGuess[allIndex[i]] = letter;
            }

             for (var i = 0; i < allCapIndex.length; i++) {
              curGuess[allCapIndex[i]] = letter.toUpperCase();
            }


          // curGuess[guess] = letter;
          // curWord.push(words[i]);
          $('#wordSpot').html(curGuess)
          checkWin();

        }
        else {
          guessRemain--;
          $("#guessesRemaining").html(guessRemain);
        }
      };


    function checkWin() {
      var emptyLetter = curGuess.indexOf("_");
      if (emptyLetter == -1) {
        // alert('Winner Winner Chicken Dinner');
        caughtCount++;
        $("#totalCaught").html(caughtCount);
        pokemon[curPokemon].caught = true;
        newGame();
      }
    }

      function newGame() {

        // var randomWord = Math.floor(Math.random()*20)+1;

        var randomPokemon = Math.floor(Math.random()*3)+1;
        console.log(randomPokemon);
        curPokemon = 'p' + randomPokemon;
        curWord = [];
        curGuess =[];
        guessRemain = 10;
        
        var check = pokemon[curPokemon].caught;
        
        if (check) {
          console.log('xxxx');
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

    function getAllIndexes(arr, val) {
          var indexes = [], i;
          for(i = 0; i < arr.length; i++)
              if (arr[i] === val)
                  indexes.push(i);
          return indexes;
      }

  function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
    };





    });


 