
// I am mostly going to organize your code differently and explain some core internals,
// This should turn out to mostly be your code, and just patterns of putting them together.

// Functions as a const because they are expected to be read-only, the signature of functions should never change
// In most cases

// One note about const is that it does not allow for hoisting, so you need to order your functions a top to bottom
// based on usage


// Overall this focuses on putting information into structures such as the Selection
// and also focuses on smaller functions for the sake of readability and functionality


// Building a n object like this allows us to easily extend functionality
// We could attach methods or anything we want to each value and makes updates to values easier
const Selection = {
  ROCK: {
    name: "rock"
  },
  PAPER: {
    name: "paper"
  },
  SCISSORS: {
    name: "scissors"
  }
};

// Const objects and arrays can be modified, but can not be reassigned, it helps keep information straight
// This also helps with adding information that itself is cyclical.
Selection.ROCK.beats = Selection.SCISSORS;
Selection.PAPER.beats = Selection.ROCK;
Selection.SCISSORS.beats = Selection.PAPER;

// Making this into a function allows us to set it up as a const, for smoother usage
const humanSelection = () => {

  let input = "";
  try {
    input = prompt("Do you choose Rock, Paper or Scissors").toLowerCase();
  } catch(e) {
    // We did not get acceptable input -- recall for selection
    // this will make the function recursive, and loop waiting for proper input
    input = humanSelection()
  }

  switch(input) {
    case "rock": return Selection.ROCK;
    case "paper": return Selection.PAPER;
    case "scissors": return Selection.SCISSORS;
  }
};

const computerSelection = () => {
  // By default Math.Random() outputs 0 -> 1 but it is not inclusive of 1
  // Multiplying by 3 would give you from 0, 1, and 2
  // The plus one increases the floor to then give 1, 2, and 3

  const rand = Math.floor(Math.random() * 3) + 1;

  switch(rand) {
    case 1: return Selection.ROCK;
    case 2: return Selection.PAPER;
    case 3: return Selection.SCISSORS;
  }
};

// Each of these can be extended to contain extra information -- its nice to set objects up this way
// to make future extension easier if you do need it... makes refactoring a breeze.
const WinnerState = {
  PLAYER_ONE: {},
  PLAYER_TWO: {},
  TIE: {}
};

const determineWinner = (playerOne, playerTwo) => {
// playerOne and playerTwo are expected to be a property from `Selection`

  if (playerOne.beats === playerTwo) return WinnerState.PLAYER_ONE;
  else if (playerTwo.beats === playerOne) return WinnerState.PLAYER_TWO;
  else if (playerOne === playerTwo) return WinnerState.TIE;
  else {
    // We have an unaccounted for case...
    console.error(`
      Cant determine winner: 
      playerOne: ${playerOne}
      playerTwo: ${playerTwo}
    `)
  }
};

const newRound = () => {
  // prompt user for input
  const player = humanSelection();

  // computer determine its selection
  const computer = computerSelection();

  // determine and return winner
  return determineWinner(player, computer);
};

// Use a class here so we can start new games easily with instances of the object
// Same for Scoreboard

class Player {
  constructor(name) {
    this.name = name;
    this.wins = 0;
    this.ties = 0;
    this.losses = 0;
  }

  win = () => this.wins++;
  lose = () => this.losses++;
  tie = () => this.ties++;
}

class Scoreboard {
  constructor() {
    this.playerOne = new Player("Player One");
    this.playerTwo = new Player("Computer");
    this.roundsPlayed = 0;
  }

  roundPlayed = () => this.roundsPlayed++;

  winner = winner => {
    winner.win();
    console.log(`Congratulations ${winner.name} you won round ${this.roundsPlayed}`);
    this.roundPlayed();
  };

  tie = () => {
    this.playerOne.tie();
    this.playerTwo.tie();

    console.log("This round was a tie");

    this.roundPlayed();
  };

  matchWinner = () => {

    let message = "";

    if (this.playerOne.wins > this.playerTwo.wins) {
      message = `Congratulations to ${this.playerOne.name}`;

    } else if (this.playerTwo.wins > this.playerOne.wins) {
      message = `Congratulations to ${this.playerTwo.name}`

    } else {
      message = "The match was a tie, nobody is the winner"
    }

    message += "\nPlay another Match??";
    const newMatch = confirm(message);

    // Expected rounds are over... do we want a new match?
    if (newMatch) match();
  };

  printScores = () => {
    const scoreboard = `
      Scoreboard:
       Rounds Played: ${this.roundsPlayed}
       
       Player One: 
         Wins: ${this.playerOne.wins}
         Losses: ${this.playerOne.losses}
         Ties: ${this.playerOne.ties}
         
       Player Two:
         Wins: ${this.playerTwo.wins}
         Losses: ${this.playerTwo.losses}
         Ties: ${this.playerTwo.ties}
    `;
    console.log(scoreboard)
  }

}

// I would create a top level function that would represent the "match" like we talked about
// This defaults to 5 rounds if it is not input
const match = (rounds = 5) => {
  if (isNaN(rounds) || rounds < 1) {
    // Considered unacceptable inputs of non-number rounds
    // Would be a function that allows input for a match again
    console.log("Please input a number greater than 0...");
    rounds = 5
  }

  const scoreBoard = new Scoreboard();

  while (scoreBoard.roundsPlayed < rounds) {
    const roundWinner = newRound();

    // Because all of this information is based on data structures we built
    // it will be easier to run functions on winners and losers to output
    // data that we care about -- and we dont have to pass as much information
    // to each function
    switch(roundWinner) {
      case WinnerState.PLAYER_ONE: {
        scoreBoard.winner(scoreBoard.playerOne);
        scoreBoard.playerTwo.lose();
        break;
      }
      case WinnerState.PLAYER_TWO: {
        scoreBoard.winner(scoreBoard.playerTwo);
        scoreBoard.playerOne.lose();
        break;
      }
      case WinnerState.TIE: scoreBoard.tie()
    }

    scoreBoard.printScores();

  }

  // Run this to see if they'd like another match...
  scoreBoard.matchWinner();
};

// This is the top level function call to make everything get going. Every other bit of code is wrapped
// in another function -- might make sense to set this to a button click
match();