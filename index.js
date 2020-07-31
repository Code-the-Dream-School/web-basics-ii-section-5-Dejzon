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

const player_1 = {
  name:'Mido', //prompt(`Enter player 1 name:`), create players
  shipCount: 0,
  gameBoard: []
};

const player_2 = {
  name:'Skela',//prompt(`Enter player 2 name:`),
  shipCount: 0,
  gameBoard: []
};

generateBattlefield = (player) => {
  player.gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  while (player.shipCount < 4) {
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
  console.log(player.name, player.gameBoard)
};

const boardPlayer_1 = document.getElementById("board_player1");
const boardPlayer_2 = document.getElementById("board_player2");
const turnPlayer = document.getElementById("turn_player");
const namePlayer_1 = document.getElementById("name_player1");
const namePlayer_2 = document.getElementById("name_player2");
const shipsPlayer_1 = document.getElementById("ships_player1");
const shipsPlayer_2 = document.getElementById("ships_player2");
const button = document.getElementById("buttons");

namePlayer_1.textContent = player_1.name;
namePlayer_2.textContent = player_2.name;
turnPlayer.textContent; // current player name

let activeBoard; // Represent which player making fire

coinFlip = () => {
  //decide who is going to play first
  if (Math.random() < 0.5) {
    turnPlayer.textContent = player_2.name;
    activeBoard = "board_player1";
  } else {
    turnPlayer.textContent = player_1.name;
    activeBoard = "board_player2";
  }
};

coinFlip();

switchPlayers = () => {
  //function switch active player
  if (activeBoard === "board_player1") {
    activeBoard = "board_player2";
    turnPlayer.textContent = player_1.name;
  } else if (activeBoard === "board_player2") {
    activeBoard = "board_player1";
    turnPlayer.textContent = player_2.name;
  }
}

// final msg function

finalMessage = (player) => {
  activeBoard = "";
  turnPlayer.textContent = `Congratulations ${player.name}!!!`;
}

//***** */
//// Function which crete board on a page
//***** */
function boardCreation(player, board) {
  for (var x = 0; x < 4; x++) {
    const li = document.createElement("li"); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement("div");
      cell.className = "square"; // adding css properties to make it looks like a square
      // cell.textContent = `${x},${y} `; // saves the coordinates as a string value 'x,y'
      cell.value = player.gameBoard[x][y]; //state of the cell
      //this function adds the click event to each cell
      cell.addEventListener("click", (e) => {
        let cell = e.target; // get the element clicked
        let oppenentBoard = cell.parentNode.parentNode.className; // get class name of clicked element
        //console.log( cell.value) //display the coordinates in the console
        if (activeBoard === oppenentBoard) {
          console.log(cell.value)
          if (cell.value === 1) {       //if hit:
            cell.style.background = "rgb(183, 50, 57)"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
            cell.value = "";
            player.shipCount--;
            shipsPlayer_1.textContent = player_1.shipCount; //update lives on display
            shipsPlayer_2.textContent = player_2.shipCount;
            if (player.shipCount === 0) {         //check how many ships are left, if zero:
              if (player === player_1) {      //declare a winner
                finalMessage(player_2);
              } else {
                finalMessage(player_1);
              }
            }
            switchPlayers();
          } else if (cell.value === 0) {
            cell.style.visibility = "hidden"; // this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
            switchPlayers();
          }

        }
      });
      li.appendChild(cell); //adding each cell into the row number x
    }
    board.appendChild(li); //adding each row into the board
  }
}

//   Function add buttons on a page

function addButtons() {
  let resetButton = document.createElement("BUTTON"); // create new buttons
  let newGameButton = document.createElement("BUTTON");
  resetButton.innerHTML = "reset";
  resetButton.style.marginRight = "5px";
  newGameButton.textContent = "New Game";
  button.appendChild(resetButton);
  button.appendChild(newGameButton);
  resetButton.addEventListener("click", resetGame);
  newGameButton.addEventListener("click", newGame);
}

function resetGame() {
  console.log("reset game");
  player_1.shipCount = 0;
  player_2.shipCount = 0;
  generateBattlefield(player_1); //reset boats position
  generateBattlefield(player_2);
  boardPlayer_1.innerHTML = ""; //clear game fields
  boardPlayer_2.innerHTML = "";
  boardCreation(player_1, boardPlayer_1); //set up new game fields
  boardCreation(player_2, boardPlayer_2);
  shipsPlayer_1.textContent = player_1.shipCount; // add lives amount on a page
  shipsPlayer_2.textContent = player_2.shipCount;
  turnPlayer.textContent; //set up curent player
  activeBoard; // Represent which player making fire
  coinFlip();
}
/*Function which create new game*/
function newGame() {
  console.log("new game");
  location.reload(); // refresh page
}
generateBattlefield(player_1); //reset boats position
generateBattlefield(player_2);
boardCreation(player_1, boardPlayer_1); // create players field
boardCreation(player_2, boardPlayer_2);
shipsPlayer_1.textContent = player_1.shipCount; // add lives amount on a page
shipsPlayer_2.textContent = player_2.shipCount;
addButtons(); // create reset and new game buttons