//Rock Paper Scissors game.  5 Rounds.



//Choices

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



//Game Logic

Selection.ROCK.beats = Selection.SCISSORS;
Selection.PAPER.beats = Selection.ROCK;
Selection.SCISSORS.beats = Selection.PAPER;



//Item Selection

//Human
const humanSelection = () => {
    let input ="";
    try {
        input = prompt("Choose your weapon, Rock, Paper or Scissors").toLowerCase();
    } catch(e) {
        input = humanSelection()
    }

    switch(input){
        case "rock": return Selection.ROCK;
        case "paper": return Selection.PAPER;
        case "scissors": return Selection.SCISSORS;
    }
};


//Computer
const computerSelection = () => {
    const rand = Math.floor(Math.random() * 3) +1;

    switch(rand) {
        case 1: return Selection.ROCK;
        case 2: return Selection.PAPER;
        case 3: return Selection.SCISSORS;
    }
};


const WinnerState = {
    PLAYER_ONE:{},
    PLAYER_TWO:{},
    TIE:{}
};

//Comparative Statement of Inputs
const determineWinner = (playerOne, playerTwo) => {
    if (playerOne.beats === playerTwo) return WinnerState.PLAYER_ONE;
    else if (playerTwo.beats === playerOne) return WinnerState.PLAYER_TWO;
    else if (playerOne === playerTwo) return WinnerState.TIE;
    else{
        console.error(`
        Cant Determine Winner:
        playerOne: ${playerOne}
        playerTwo: ${playerTwo}
        `)
    }
};


//Rounds
const newRound = () => {
    const player = humanSelection();

    const computer = computerSelection();

    return determineWinner(player, computer);
};


class Player{
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

//Scoreboard Logic tallying wins, losses, ties, and rounds
class Scoreboard {
    constructor(){
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
    
    console.log("Tie! No Victor");
    
    this.roundPlayed();
    };

//Match Completion Message
    matchWinner = () => {
        let message = "";

        if (this.playerOne.wins > this.playerTwo.wins) {
            message = `Congratulations! Humans live to see another day!`;
        } else if (this.playerTwo.wins > this.playerOne.wins){
            message = `ROBOTS WIN.  KILL ALL HUMANS!`;
        } else {
            message = `Allright! We'll call it a draw!`
        }

        message += "\nPlay Another Match?";
        const newMatch = confirm(message);

        if (newMatch) match();
    };
    
//Scoreboard Display showing wins, losses, ties, and rounds
    printScores = () => {
        const Scoreboard = `
        Scoreboard:
            Rounds Played: ${this.roundsPlayed}

            Player One:
                Wins: ${this.playerOne.wins};
                Losses: ${this.playerOne.losses};
                Ties: ${this.playerOne.ties};

            Player Two:
                Wins: ${this.playerTwo.wins};
                Losses: ${this.playerTwo.losses};
                Ties: ${this.playerTwo.ties};
        `;
        console.log(Scoreboard)
    }

}

//Match logic  One Match = Five Rounds
const match = (rounds = 5) => {
    if (isNaN(rounds) || rounds < 1) {
        console.log("Please Input A Number Greater Than 0");
        rounds = 5
    }

//Match/Rounds/Scoreboard execution
    const scoreBoard = new Scoreboard();

    while (scoreBoard.roundsPlayed < rounds) {
        const roundWinner = newRound();


        switch(roundWinner) {
            case WinnerState.PLAYER_ONE: {
                scoreBoard.winner(scoreBoard.playerOne);
                scoreBoard.playerTwo.lose();
                break;
            }
        
            case WinnerState.PLAYER_TWO:{
                scoreBoard.winner(scoreBoard.playerTwo);
                scoreBoard.playerOne.lose();
                break;
            }
            case WinnerState.TIE: scoreBoard.tie()
        }

        scoreBoard.printScores();
    }
    
    scoreBoard.matchWinner();

};

//RunGame
match();
