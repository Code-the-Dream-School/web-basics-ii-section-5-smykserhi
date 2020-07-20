
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
let player1 = {
  name: prompt("Enter Player 1 name "),
  boats : 0,
  board : []  
}
let player2 = {
  name: prompt("Enter Player 2 name "),
  boats : 0,
  board : []  
}
const board_Player1 = document.getElementById('board_player1');
const board_player2 = document.getElementById('board_player2');
const turnNow = document.getElementById('turn_player')
const name_player1 = document.getElementById('name_player1');
const name_player2 = document.getElementById('name_player2');
const ships_player1 = document.getElementById('ships_player1');
const ships_player2 = document.getElementById('ships_player2');
const button = document.getElementById('buttons')

name_player1.textContent = player1.name
name_player2.textContent = player2.name
turnNow.textContent = player2.name; // current player name
let activeBoard = 'board_player1';// Represent which player making fire
//***** */
//// Function which crete board on a page
//***** */
function boardCreation(player, playerPath){
  for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y} `;  // saves the coordinates as a string value 'x,y'
      cell.value = player.board[x][y];//state of the cell
      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
          let cell = e.target; // get the element clicked
          let playerClassName = cell.parentNode.parentNode.className; // get class name of clicked element          
          function switchPlayers() {//function switch active player
            if(activeBoard === 'board_player1'){
              activeBoard = 'board_player2'
              turnNow.textContent = player1.name;
            }else if(activeBoard === 'board_player2'){
              activeBoard = 'board_player1'
              turnNow.textContent = player2.name;
            }     
          }
          //console.log( cell.value) //display the coordinates in the console
          if(cell.value === 0 && activeBoard === playerClassName){
            cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
            switchPlayers()
          }else if (cell.value === 1  && activeBoard === playerClassName){
             cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
             cell.value = 3;
             player.boats --;
             ships_player1.textContent = player1.boats //update lives on display
             ships_player2.textContent = player2.boats
             if(player.boats === 0){
               if(player === player1) gameOwer(player2)
               else gameOwer(player1)
               
             }
          }                   
      });
      li.appendChild(cell); //adding each cell into the row number x
    }
    playerPath.appendChild(li); //adding each row into the board    
  }
}
/***
Function create board and set Up random boats
//*/
function boatsSetUp(player){
  player.board = new Array(4); //create board in player object
  for (let i = 0; i < player.board.length; i++) {
    player.board[i] = new Array(4);
    player.board[i].fill(0); // fill it with 0
   }      
  while(player.boats < 4){ //fill with 4 boats
    let x = Math.floor(Math.random()*4)
    let y = Math.floor(Math.random()*4)
    //console.log(x,y)
    if(player.board[y][x] === 0){
      player.board[y][x] = 1;
      player.boats ++;
    }
  }
}
/*
Function which end the game
*/
function gameOwer(player){
  activeBoard = "" // deactivate all fields 
  turnNow.textContent = `Congratulations ${player.name}!!! you win` ;
}
/*
  Function add buttons on a page
*/
function addButtons() {
  let resetButton = document.createElement("BUTTON"); // create new buttons
  let newGameButton = document.createElement('BUTTON')
  resetButton.innerHTML = "reset"
  resetButton.style.marginRight = '5px'
  newGameButton.textContent = "New Game"
  button.appendChild(resetButton)
  button.appendChild(newGameButton)
  resetButton.addEventListener('click', resetGame)
  newGameButton.addEventListener("click" , newGame)

}
function resetGame(){
  console.log("reset game")
  player1.boats = 0;
  player2.boats = 0;
  boatsSetUp(player1);//reset boats position
  boatsSetUp(player2);
  board_Player1.innerHTML = "" //clear game fields
  board_player2.innerHTML = ""
  boardCreation(player1, board_Player1); //set up new game fields
  boardCreation(player2, board_player2);
  ships_player1.textContent = player1.boats // update lives numbers to 4
  ships_player2.textContent = player2.boats
  turnNow.textContent = player1.name; //set up curent player
  activeBoard = 'board_player1';// Represent which player making fire
  
}
/*Function which create new game*/
function newGame() {
  console.log("new game")
  location.reload(); // refresh page
}
boatsSetUp(player1); // set up random boats
boatsSetUp(player2);
boardCreation(player1, board_Player1); // create players field
boardCreation(player2, board_player2);
ships_player1.textContent = player1.boats // add lives amount on a page
ships_player2.textContent = player2.boats
addButtons(); // create reset and new game buttons


