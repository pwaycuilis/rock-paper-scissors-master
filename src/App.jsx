import { useState } from 'react'


function App() {

  const [score, setScore] = useState(0);
  const [displayRules, setDisplayRules] = useState('false');
  const [playerChoice, setPlayerChoice] = useState('');
  const [currentStep, setCurrentStep] = useState('1');
  const [computerChoice, setComputerChoice] = useState(null);
  const [roundResult, setRoundResult] = useState(null);

  const outcomes = {
    rock: { beats: "scissors", losesTo: "paper" },
    paper: { beats: "rock", losesTo: "scissors" },
    scissors: { beats: "paper", losesTo: "rock" }
  };

  const delay = (duration, callback) => {
    setTimeout(callback, duration);
  }


  const generateComputerChoice = (playerSelection) => {

    // console.log('player choice from in genCompChoice: ' + playerChoice)
    delay(1000, () => {
      const choices = ['rock', 'paper', 'scissors'];
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerSelection = choices[randomIndex];
      setComputerChoice(computerSelection);
      determineWinner(playerSelection, computerSelection)
     
    });

  }

  const determineWinner = (playerSelection, computerSelection) => {

    delay(1000, () => {
      // console.log('inside determineWinner delay func')

      if (playerSelection === computerSelection) {
        setRoundResult('Draw');
      } else if (outcomes[playerSelection].beats === computerSelection) {
        setRoundResult('Win');
        setScore( score + 1);
      } else {
        setRoundResult('Loss');
        setScore( score - 1);
      }
    })
  }

  const toggleRulesDisplay = () => {
    // console.log({displayRules});
    if (displayRules == 'false') {
      setDisplayRules('true');
    } else if (displayRules == 'true') {
      setDisplayRules('false');
    } else {
      console.log('display rules error');
    }
  }

  const handlePlayerChoice = (selection) => {
    setPlayerChoice(selection);
    setCurrentStep('2');
    generateComputerChoice(selection);
    
  }



  const playAgain = () => {
    setComputerChoice(null);
    setPlayerChoice(null);
    setRoundResult(null);
    setCurrentStep(1);
  }



  return (
    <>
      <header className="flex-container space-between">
        <h1 className="game-title">
          Rock <br></br>
          Paper <br></br>
          Scissors
        </h1>
        {/* <div className="game-title">
          <div>Rock</div>
          <div>Paper</div>
          <div>Scissors</div>
        </div> */}
        <div className="score-container">
          <div className="score-label">Score</div>
          <div className="score-amount">{score}</div>
        </div>
      </header>

      <main>
        <div className="step-1__container" 
          data-visible={currentStep == "1" ? "true" : "false"}>
          <div className="buttons-container">
            <div className="button-container paper-container active"
              onClick={() => handlePlayerChoice('paper')}>
              <div className="button-image img-paper"></div>
            </div>

            <div className="button-container scissors-container active"
              onClick={() => handlePlayerChoice('scissors')}>
              <div className="button-image img-scissors"></div>
            </div>

            <div className="button-container rock-container active"
              onClick={() => handlePlayerChoice('rock')}>
              <div className="button-image img-rock"></div>
            </div>

          </div>
          
        </div>

        <div className="rules-display__container" data-visible={displayRules}>
          <div className="rules-display__title">Rules</div>
          <div className="rules-display__image"></div>
          <div className="rules-display__close active"
            onClick={() => toggleRulesDisplay()}></div>
        </div>

        <div className="step-2__container" data-visible={currentStep == "2" ? "true" : "false"}>
          <div className="choices-container flex-container">
      
              <div className="player-choice__container choice-container" data-animated={ roundResult == "Win" ? true : false}>

                { playerChoice == "paper" ? (
                  <div className="button-container paper-container">
                    <div className="button-image img-paper"></div>
                  </div>
                ) : playerChoice == "rock" ? (
                  <div className="button-container rock-container">
                    <div className="button-image img-rock"></div>
                  </div>
                ) : playerChoice == "scissors" ? (
                  <div className="button-container scissors-container">
                    <div className="button-image img-scissors"></div>
                  </div>
                ) : (<div></div> )
                }
                <div className="player-choice__text choice-text">You picked</div>
                </div>

            <div className="house-choice__container choice-container" >
              <div className="button-container" data-animated={ roundResult == "Loss" ? true : false}>
               
                
                { computerChoice == "paper" ? (
                  <div className="button-container paper-container">
                    <div className="button-image img-paper"></div>
                  </div>
                ) : computerChoice == "scissors" ? (
                  <div className="button-container scissors-container">
                    <div className="button-image img-scissors"></div>
                  </div>
                ) : computerChoice == "rock" ? (
                  <div className="button-container rock-container">
                    <div className="button-image img-rock"></div>
                  </div>
                ) : ( <div></div> ) 
                }
              </div>
              <div className="house-choice__text choice-text">The house picked</div>
              
              
            </div>
            
          </div>
          <div className="result-container step-4__container" data-visible={roundResult ? true : false}> 
                { roundResult == "Loss" ? (
                  <div className="result-text">You Lose</div>
                  
                ) : roundResult == "Win" ? (
                  <div className="result-text">You win</div>
                ) : roundResult == "Draw" ? (
                  <div className="result-text">Draw</div>
                ) : <div className="result-text"></div> 
                } 
            
                <button className="play-again__button active"
                  onClick={() => playAgain() }>Play Again
                </button>
          
          </div>

        </div>


        <div className="rules-button__container active"
          onClick={() => toggleRulesDisplay()}>
            <div className="rules-button__text">Rules</div>
        </div>
        
      </main>

    </>
  )
}

export default App
