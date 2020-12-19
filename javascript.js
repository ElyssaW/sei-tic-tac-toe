document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize turn counter
    let turnCount = 0;
    
    // Initialize 2D array simulating gameboard. Array moves left to right, processing each value in one row before continuing to the next
    let gameBoard = [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]];
    
    // Initialize modular function to take turn counter and determine current player's turn.
    // Returns a 0 or a 1. 0 is for Player 1. 1 is for Player 2
    function calcTurn (turnCount) {
        return turnCount % 2
    }
    
    // Initialize helper function to take clicked square and compare to 2D array
    const checkArray = (rowId, colId, elementId) => {
        if (gameBoard[rowId][colId] === 0) {
            turnCount++;
            if (calcTurn(turnCount) === 0) {
                gameBoard[rowId][colId] = 1;
                document.getElementById(elementId).style.backgroundColor = "red";
            } else {
                gameBoard[rowId][colId] = -1;
                document.getElementById(elementId).style.backgroundColor = "yellow";
            }
            
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
        }
        console.log(checkedId);
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
    
    const winCondition = () => {
        // Initialize variable to keep track of "score" from the gameboard
        let scoreRow = 0;
        let scoreColumn = 0;
        let scoreDiagonalDown = 0;
        let scoreDiagonalUp = 0;
        
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                scoreRow = scoreRow + gameBoard[i][j]
            }
            
            for (let k = 0; k < gameBoard[i].length; k++) {
                scoreColumn = scoreColumn + gameBoard[k][i]
            }
            
            scoreDiagonalDown = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2]
            
            scoreDiagonalUp = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0]
            
            if (scoreRow === 3 || scoreRow === -3 || scoreColumn === 3 || scoreColumn === -3) {
                console.log('Victory!')
            } else {
                scoreRow = 0
                scoreColumn = 0
            }
            
            if (scoreDiagonalDown === 3 || scoreDiagonalDown === -3 || scoreDiagonalUp === 3 || scoreDiagonalUp === -3) {
                console.log('Victory!')
            } else {
                scoreDiagonalDown = 0
                scoreDiagonalUp = 0
            }
        }
    }
    
    //Initialize event listens to listen for click on gameboard
    
    //Initialize event listens for click on the restart button to clear the board
    
    //Initialize function to determine current turn from turn counter and update HTML
    
    //Initialize "Death" and their dialogue
})

// There is a grid of nine squares, made up of three columns X three rows. There are two sets of "pieces," X's and O's, and two players, each with their own respective set of pieces (Player one has X's, player two has 0's) They alternate placing their pieces on the grid, and the first player to place three of their pieces in a straight line (Which canbe achieved by covering one complete column, one complete row, or making a diagonal through the cneter) they win. If the game board is filled, and none of the colums or rows contain only one set of pieces, or create a diagonal line through the center, it is a draw.