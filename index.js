//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

let message = document.getElementById('message').textContent;


let shipNumber = 4; //declare number of battlesip on field, so later if there is need to change that number just do it on this line

const player_1 = {
  name: 'Mido', //create players
  shipCount: 0,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const player_2 = {
  name: 'Skela',
  shipCount: 0,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

generateBattlefield = (player) => {
  while (player.shipCount < shipNumber) {
    //shipCount will start from 0 and will increase until reach shipNumber value
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);

    while (player.gameBoard[x][y] === 1) {
      //preventing two or more ships on same coordinates;
      x = Math.floor(Math.random() * 4); //while there is a ship on those coordinates, generate new coordinates
      y = Math.floor(Math.random() * 4);
    }
    player.gameBoard[x][y] = 1; //place ship on specific coord.
    player.shipCount++; //shipCount increased by 1
  }
};

coinFlip = () => { //decide who is going to play first
  if (Math.random() < 0.50) {
    currentPlayer = player_1;
    otherPlayer = player_2;
  } else {
    currentPlayer = player_2;
    otherPlayer = player_1;
  }
}

coinFlip();

switchPlayers = () => { //switch players
  if (currentPlayer === player_1) {
    currentPlayer = player_2;
    otherPlayer = player_1;
    opponentBoard = arrayOppenentBoards[0]
  } else {
    currentPlayer = player_1;
    otherPlayer = player_2
    opponentBoard = arrayOppenentBoards[1]
  }
}




const board_Player1 = document.getElementById("board_player1");
const board_Player2 = document.getElementById("board_player2");
let opponentBoard = board_Player2 // Starts the game by setting the target board
generateBattlefield(player_1); //generate fields for players
generateBattlefield(player_2);

const arrayPlayerBoards = [board_Player1, board_Player2];
const arrayOppenentBoards = [board_Player2, board_Player1];
const arrayOpponents = [player_2, player_1];



createBatlleField = () => {
  for (let i = 0; i < arrayPlayerBoards.length; i++) {
    for (var x = 0; x < 4; x++) {
      const li = document.createElement("li"); // creating childs for the list (board), in this case represent a row number 'x' of the board
      for (var y = 0; y < 4; y++) {
        const cell = document.createElement("div");
        cell.className = "square"; // adding css properties to make it looks like a square
        cell.textContent = `${x},${y}`; // saves the coordinates as a string value 'x,y'
        cell.value = 0; //state of the cell

        //this function adds the click event to each cell
        cell.addEventListener("click", (e) => {
          // checks if the board we are hitting is us or the other player...
          if(e.target.parentNode.parentNode.id == opponentBoard.id) {
            let cell = e.target; // get the element clicked
            console.log("cell.textContent:", cell.textContent); //display the coordinates in the console

            let xCoord = parseInt(cell.textContent.slice(0, 1));
            let yCoord = parseInt(cell.textContent.slice(2, 3));
            console.log("x coord: " + xCoord);
            console.log("y coord: " + yCoord);


            if (arrayOpponents[i].gameBoard[xCoord][yCoord] === 1) { //check is there a ship on those coord; if hit:
              arrayOpponents[i].shipCount--; //reduce number of ships
              cell.style.background = "purple";
              // switchPlayers();
            } else {
              message = `Miss, better luck next time!`
              cell.style.background = "lightgreen";
              // switchPlayers();
            }

            switchPlayers()
          }

          // cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          // cell.style.background = "purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
        });

        li.appendChild(cell); //adding each cell into the row number x
      }
      arrayPlayerBoards[i].appendChild(li)
      // board_Player1.appendChild(li); //adding each row into the board

    }

  }

};


// while (currentPlayer.shipCount > 0) { //game will run while there are ships left on battlefield of the currentPlayer

//   if (otherPlayer.gameBoard[xCoord][yCoord] === 1) { //check is there a ship on those coord; if hit:
//     otherPlayer.shipCount--; //reduce number of ships
//     otherPlayer.gameBoard[xCoord][yCoord] = 0; //null that field
//     cell.style.background = "purple";
//     if (otherPlayer.shipCount > 0) { //check how many ships are left; if there is more than 0: alert(You Hit it...) and switch players
//       message = `${currentPlayer.name}, You Hit it! ${otherPlayer.name} got ${otherPlayer.shipCount} ships left!`
//     } else { //if none have left, break the loop and congrats to current player!!!
//       message = `${currentPlayer.name}, You Did it! You sunk all ${otherPlayer.name}'s ships!!!`;
//       break;
//     }
//     switchPlayers(); //switch player after try
//   } else {
//     message = `Miss, better luck next time!`
//     cell.style.background = "lightgreen";
//     switchPlayers();
//   }
// }

createBatlleField();


// const battleship = () => {

//   let currentPlayer, otherPlayer;

//   let shipNumber = 4;           //declare number of battlesip on field, so later if there is need to change that number just do it on this line

//   const player_1 = {
//     name: prompt(`Enter player 1 name:`),         //create players
//     shipCount: 0,
//     gameBoard: [[0, 0, 0, 0],
//                 [0, 0, 0, 0],
//                 [0, 0, 0, 0],
//                 [0, 0, 0, 0]]
//   };

//   const player_2 = {
//     name: prompt(`Enter player 2 name:`),
//     shipCount: 0,
//     gameBoard: [[0, 0, 0, 0],
//                 [0, 0, 0, 0],
//                 [0, 0, 0, 0],
//                 [0, 0, 0, 0]]
//   };

//   generateBattlefield = (player) => {
//     while (player.shipCount < shipNumber) {     //shipCount will start from 0 and will increase until reach shipNumber value
//       let x = Math.floor(Math.random() * 4);
//       let y = Math.floor(Math.random() * 4);

//       while (player.gameBoard[x][y] === 1) {    //preventing two or more ships on same coordinates;
//         x = Math.floor(Math.random() * 4);      //while there is a ship on those coordinates, generate new coordinates
//         y = Math.floor(Math.random() * 4);
//       }
//       player.gameBoard[x][y] = 1;               //place ship on specific coord.
//       player.shipCount++;                       //shipCount increased by 1

//     }
//   }

//   generateBattlefield(player_1);            //generate fields for players
//   generateBattlefield(player_2);

//   coinFlip = () => {                        //decide who is going to play first
//     if(Math.random() < 0.50) {
//       currentPlayer = player_1;
//       otherPlayer = player_2;
//   }
//     else {
//       currentPlayer = player_2;
//       otherPlayer = player_1;
//     }
//   }

//   coinFlip();

//   switchPlayers = () => {                   //switch players
//     if (currentPlayer === player_1) {
//       currentPlayer = player_2;
//       otherPlayer = player_1;
//     } else {
//       currentPlayer = player_1;
//       otherPlayer = player_2
//     }
//   }

//   while (currentPlayer.shipCount > 0) {           //game will run while there are ships left on battlefield of the currentPlayer
//     let xCoord = parseInt(prompt(`${currentPlayer.name}, please enter X Coordinate:`));     //pick coord.
//     let yCoord = parseInt(prompt(`${currentPlayer.name}, please enter Y Coordinate:`));
//     if (!isNaN(xCoord) && !isNaN(yCoord) && xCoord < 4 && yCoord < 4 && xCoord > -1 && yCoord >-1) {
//       //coordinates must be numbers and must be between 0 and 3
//       if (otherPlayer.gameBoard[xCoord][yCoord] === 1) {        //check is there a ship on those coord; if hit:
//         otherPlayer.shipCount--;                                //reduce number of ships
//         otherPlayer.gameBoard[xCoord][yCoord] = 0;              //null that field
//         if (otherPlayer.shipCount > 0) {                        //check how many ships are left; if there is more than 0: alert(You Hit it...) and switch players
//           alert(`${currentPlayer.name}, You Hit it! ${otherPlayer.name} got ${otherPlayer.shipCount} ships left!`)
//         }
//         else {          //if none have left, break the loop and congrats to current player!!!
//           alert(`${currentPlayer.name}, You Did it! You sunk all ${otherPlayer.name}'s ships!!!`)
//           break;
//         }
//         switchPlayers();        //switch player after try
//       } else {
//         alert(`Miss, better luck next time!`)
//         switchPlayers();
//       }
//     }
//     else {
//       alert(`Input value must be number and must be between 0 and 3! Please try again!`)
//       //input field condition....
//     }

//   }

//   return `The Winner is ${currentPlayer.name}! CONGRATS!!!!?`
// }
