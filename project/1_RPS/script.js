let humanScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRound = 5;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Get COM choice by random number
function getComputerChoice() 
{
    switch (getRandomInt(3))
    {
        case 0:
            comChoice = "rock";
            break;
        case 1:
            comChoice = "paper";
            break;
        case 2:
            comChoice = "scissors";
            break;
    }
    console.log(`Computer choose: ${comChoice}`);
    return comChoice;
}

// Compare Player choices with COM choices
function playRound(humanChoice) 
{
    let computerChoice = getComputerChoice();   
    // Draw Condition
    if (humanChoice === computerChoice)
    {
        console.log(`Player: ${humanScore}  COM: ${computerScore}`);
    }
    // Winning Condition
    else if ((humanChoice === "rock" && computerChoice === "scissors") || (humanChoice === "paper" && computerChoice === "rock") || (humanChoice === "scissors" && computerChoice === "paper"))
    {
        humanScore++;
        console.log(`Player: ${humanScore}  COM: ${computerScore}`);
    }
    // Losing Condition
    else if ((humanChoice === "rock" && computerChoice === "paper") || (humanChoice === "paper" && computerChoice === "scissors") || (humanChoice === "scissors" && computerChoice === "rock"))
    {
        computerScore++;
        console.log(`Player: ${humanScore}  COM: ${computerScore}`);
    }

    // // Score based match, check if the score has reach its limits
    // if (humanScore === 5 || computerScore === 5) 
    // {
    //     announceWinner();
    // }

    // Round based match, check if the round has reach its limits and then check the score
    roundCount++;
    if (roundCount == maxRound)
    {
        announceWinner();
    }
}

let rockBtn     = document.querySelector("#rock");
let paperBtn    = document.querySelector("#paper");
let scissorBtn  = document.querySelector("#scissors");

rockBtn.addEventListener('click', (event) => {
    console.log('clicked Rock');
    playRound("rock");
});

paperBtn.addEventListener('click', (event) => {
    console.log('clicked Paper');
    playRound("paper");
});

scissorBtn.addEventListener('click', (event) => {
    console.log('clicked Scissors');
    playRound("scissors");
});

function announceWinner() 
{
    let resultMatch = document.querySelector("#result");

    // Score based match
    if (humanScore === 5) 
    {
        resultMatch.textContent = "You Win";
    } 
    else if (computerScore === 5) 
    {
        resultMatch.textContent = "You Lose";
    }

    // Round based match
    if (humanScore > computerScore) 
    {
        resultMatch.textContent = "You Win";
    } 
    else if (humanScore < computerScore) 
    {
        resultMatch.textContent = "You Lose";
    }
    else 
    {
        resultMatch.textContent = "It is a TIE";
    }
    // Reset scores for a new game
    humanScore = 0;
    computerScore = 0;
    roundCount = 0;
}