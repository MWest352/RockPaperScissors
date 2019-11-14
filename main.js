 //Simple Rock Paper Scissors Javascript Game.  5 rounds 

//USER CHOICE
var playerSelection = 
    prompt("Do you choose Rock, Paper or Scissors").toLowerCase();

    if (!playerSelection){
                        //Undefined
    console.log("Try Again!");
    }   else{
                       //Display Player Choice 
    console.log("Player one:" + " " + playerSelection);
    }


//COMPUTER CHOICE
var computerPlay = 
     Math.random();
    if (computerPlay < 0.34){
     computerPlay = "rock";
    }  else if(computerPlay <= 0.67){
     computerPlay = "paper";
    }  else{
     computerPlay = "scissors"; 
    }
console.log("Computer: " + computerPlay);


let points = {Humans: 0, Robots: 0};



//PLAY ROUND
function playRound(playerSelection, computerPlay){

//COMPARATIVE STATEMENT
        if(playerSelection===computerPlay){
            //console.log("Tie!")
            return "Tie!"
            }
       
        if(playerSelection==="rock"){
            if(computerPlay==="scissors"){
                Scoreboard("Humans")
               // console.log("Player Wins!");
                return "Player Wins!";
            }
            else{
                Scoreboard("Robots")
                //console.log("Computer Wins!");
                return "Computer Wins";
            }
        }

        if(playerSelection==="paper"){
            if(computerPlay==="rock"){
                Scoreboard("Humans")
                //console.log("Player Wins!");
                return "Player Wins";   
            }
            else{
                Scoreboard("Robots")
                //console.log("Computer Wins!");
                return "Computer Wins";
            }
        }

        if(playerSelection==="scissors"){
            if(computerPlay==="rock"){
                Scoreboard("Robots")
                //console.log("Computer Wins!");
                return "Computer Wins!";
            }
            else{
                Scoreboard("Humans")
                //console.log("Player Wins!");
                return "Player Wins!";
            }
        }
    };

    console.log(playRound(playerSelection, computerPlay))

//SCOREBOARD
function Scoreboard(winner){
    winner = "Humans" ? points.Humans++ : points.Robots++;
    console.log("Humans: " + points.Humans + "\nRobots: " + points.Robots);
}

