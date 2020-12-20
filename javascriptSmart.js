document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize function to check for win condition, and play dialogue if met
    const winCondition = () => {
            if (checkWin(gameBoard, 'x')) {
                gameText.innerText = selectRandom(defeatDialogue)
                victory = true;
            } else if (checkWin(gameBoard, 'o')) {
                gameText.innerText = selectRandom(victoryDialogue)
                victory = true;
            } 
        
            if (victory === false && turnCount < 9) {
                letCompGo()
            } else if (victory === false && turnCount === 9) {
                gameText.innerText = 'It is a tie'
            }
    }
    
    function checkWin (board, player) {
        if ((board[0][0].space === player && board[0][1].space === player && board[0][2].space === player) ||
            (board[1][0].space === player && board[1][1].space === player && board[1][2].space === player) ||
            (board[2][0].space === player && board[2][1].space === player && board[2][2].space === player) ||
            (board[0][0].space === player && board[1][0].space === player && board[2][0].space === player) ||
            (board[0][1].space === player && board[1][1].space === player && board[2][1].space === player) ||
            (board[0][2].space === player && board[1][2].space === player && board[2][2].space === player) ||
            (board[0][0].space === player && board[1][1].space === player && board[2][2].space === player) ||
            (board[2][0].space === player && board[1][1].space === player && board[0][2].space === player) )
            {
            return true
        } else {
            return false
        }
    }
    
    // Initialize Death's dialogue
    let dialogueIndex = 0
    let dialogueFinished = false
    const dialogue = ["Hello. I am Death.",
                      "Play a game with me.",
                      "A Tic Tac Toe game.",
                      "For your soul.",
                      "This is...",
                      "It is your move, mortal..."
    ]
    
    const yourMoveDialogue = ['It is your move',
                              'Your turn, now',
                              'You may take your turn',
                              'Make your move']
    
    const compMoveDialogue = ['Hmm...',
                              'Ah...',
                              'I shall go...',
                              'It is my turn, now']
    
    const victoryDialogue = ['Yesss. Your soul is mine',
                             'You have lost',
                             'Death and defeat are both inevitable',
                             'Congrats on losing']
    
    const defeatDialogue = ['Well. Your soul had bad vibes anyway.',
                            'Hrmm. I appear to have lost',
                            'You elude me. For now.']

    const deathSpeaks = () =>{
        gameText.innerHTML = dialogue[dialogueIndex]
        dialogueIndex++;

        if (dialogueIndex === dialogue.length) {
            clearInterval(dialogueTimer)
            titleDrop()
        }
    }
    
    const selectRandom = (randomArray) => {
        return randomArray[Math.floor(Math.random() * randomArray.length)]
    }
    
    const dialogueTimer = setInterval(deathSpeaks, 2000)
    
    //Function to make title visible after dialogue has finished
    const titleDrop = () => {
           popInText('intro-title')
           popInText('clear')
            dialogueFinished = true;
         }
    
    // Trigger "interrupt" dialogue if player moves before dialogue finishes
    const wowRude = () => {
        if (dialogueFinished === false) {
            clearInterval(dialogueTimer)
            gameText.innerText = "Wow, okay. Rude."
            titleDrop()
            dialogueFinished = true;
        }
    }
    
    // Initialize turn counter
    let turnCount = 0;
    
    
    // Initialize modular function to take turn counter and determine current player's turn.
    // Returns a 0 or a 1. 0 is for Player 1. 1 is for Player 2
    function calcTurn (turnCount) {
        return turnCount % 2
    }
    
    // Initialize victory boolean
    let victory = false;
    
    // Initialize 2D array simulating gameboard. Array moves left to right, processing each value in one row before continuing to the next
    let gameBoard = [[{space: 0, id: 'top-left', xcoord: 0, ycoord: 0}, 
                      {space: 0, id: 'top-middle', xcoord: 1, ycoord: 0}, 
                      {space: 0, id: 'top-right', xcoord: 2, ycoord: 0},],

                     [{space: 0, id: 'middle-left', xcoord: 0, ycoord: 1}, 
                      {space: 0, id: 'middle-middle', xcoord: 1, ycoord: 1},
                      {space: 0, id: 'middle-right', xcoord: 2, ycoord: 1}],

                     [{space: 0, id: 'bottom-left', xcoord: 0, ycoord: 2}, 
                      {space: 0, id: 'bottom-middle', xcoord: 1, ycoord: 2}, 
                      {space: 0, id: 'bottom-right', xcoord: 2, ycoord: 2}]];
    
    // Function to make the pictures quickly blink in
    const popIn = (imageUrl, elementId) => {
        let element = document.getElementById(elementId)
        element.style.backgroundImage = 'url('+imageUrl+')';
        
        setTimeout(()=>{
            element.style.backgroundImage = 'none'
        }, 20)
        setTimeout(()=>{
            element.style.backgroundImage = 'url('+imageUrl+')';
        }, 60)
        setTimeout(()=>{
            element.style.backgroundImage = 'none';
        }, 120)
        setTimeout(()=>{
            element.style.backgroundImage = 'url('+imageUrl+')';
        }, 180)
    }
    
    // Honestly, this function does the exact same thing as the one above
    // but more generic. I should refactor anything that uses the above function
    // to use the below one instead, but I'm lazy
    const popInText = (elementId) => {
        let element = document.getElementById(elementId)
        element.style.visibility = 'visible';
        setTimeout(()=>{
            element.style.visibility = 'hidden';
        }, 20)
        setTimeout(()=>{
            element.style.visibility = 'visible';
        }, 60)
        setTimeout(()=>{
            element.style.visibility = 'hidden';
        }, 120)
        setTimeout(()=>{
            element.style.visibility = 'visible';
        }, 180)
    }
    
    
    // Initialize helper function to take clicked square and compare to 2D array
    const checkArray = (rowId, colId, elementId) => {
        if (victory) {
           gameText.innerText = 'The game is finished, human' 
        } else {
            if (gameBoard[rowId][colId].space === 0) {
            turnCount++;
            if (calcTurn(turnCount) === 0) {
                gameBoard[rowId][colId].space = 'o';
                popIn("images/o.png", elementId);
            } else {
                gameBoard[rowId][colId].space = 'x';
                popIn("images/x.png", elementId);
            }
        } 
        
        // Call function to check if the board is in a winning configuration
        winCondition();
        }
    }
    
    // Initialize helper function to determine the clicked grid-square's status (If it has an X, O, or is empty)
    const checkSquare = (checkedId) => {
        
        switch(checkedId) {
            case "top-left":
                checkArray(0,0, checkedId)
                break;
                
            case "top-middle":
                checkArray(0,1, checkedId)
                break;
                
            case "top-right":
                checkArray(0,2, checkedId)
                break;
            
            case "middle-left":
                checkArray(1,0, checkedId)
                break;
            
            case "middle-middle":
                checkArray(1,1, checkedId)
                break;
                
            case "middle-right":
                checkArray(1,2, checkedId)
                break;
            
            case "bottom-left":
                checkArray(2,0, checkedId)            
                break;
                
            case "bottom-middle":
                checkArray(2,1, checkedId)
                break;
                
            case "bottom-right":
                checkArray(2,2, checkedId)
                break;
        } minimax(gameBoard, 'o')
    }
     
    // Initialize event listeners
    document.getElementById('top-left').addEventListener('click', ()=> {
        checkSquare('top-left')
    })
    document.getElementById('top-middle').addEventListener('click', ()=> {
        checkSquare('top-middle')
    })
    document.getElementById('top-right').addEventListener('click', ()=> {
        checkSquare('top-right')
    })
    document.getElementById('middle-left').addEventListener('click', ()=> {
        checkSquare('middle-left')
    })
    document.getElementById('middle-middle').addEventListener('click', ()=> {
        checkSquare('middle-middle')
    })
    document.getElementById('middle-right').addEventListener('click', ()=> {
        checkSquare('middle-right')
    })
    document.getElementById('bottom-left').addEventListener('click', ()=> {
        checkSquare('bottom-left')
    })
    document.getElementById('bottom-middle').addEventListener('click', ()=> {
        checkSquare('bottom-middle')
    })
    document.getElementById('bottom-right').addEventListener('click', ()=> {
        checkSquare('bottom-right')
    })
    
    // Initialize event listener for the reset button
    document.getElementById('clear').addEventListener('click', ()=> {
        console.log('Clearing gameboard')
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                let element = document.getElementById(gameBoard[i][j].id)
                gameBoard[i][j].space = 0;
                element.setAttribute('style', 'background-image: none')
            }
        }
        
        turnCount = 0;
        victory = false;
        gameText.innerText = 'Another round, then?'
    })
    
    // Function to check if it is the computer's turn, and set a timeout on it's move to fake a thought process
    const letCompGo = () => {
        if (calcTurn(turnCount) === 1) {
            gameText.innerText = selectRandom(compMoveDialogue)
            wowRude()
            setTimeout(compTurn, 1500)
        } else {
            // Returns header text to usual state
            gameText.innerText = selectRandom(yourMoveDialogue)
        }
    }
    
    // Function which filters the gameboard, creating an array containing only empty spaces
    function filterGameboard() {
        let openSpaces = []
        for (let i = 0; i < gameBoard.length; i++) {
                for (let j = 0; j < gameBoard[i].length; j++) {
                    if (gameBoard[i][j].space === 0) {
                        openSpaces.push(gameBoard[i][j])
                    }
                }
            }
        
        return openSpaces;
        }
    
    // This function simulates the AI. It reads the gameboard, passing the objects of any empty spaces to an
    // array, and then it randomly selects a space from the list to play on
    function compTurn () {
        let openSpaces = filterGameboard();
        let compMove = null;
    
           compMove = minimax(gameBoard, 'x') 
        
        // This is the same function (And ensuing function chain) used for the player
        checkSquare(compMove.id)
        }
    
    function minimax (board, player) {
        
        return selectRandom(openSpaces)
    }
})