
//global variable
let tryNbLeft = 6;
let secretWord ;
const charGuessWord=[];
const memKeyPressed=[];

//startup event
function onloadFunc(){
generateKeypad();
}

//Edit secret Word
function okEdit() {  
   let inputWord = document.getElementById('wordSecret').value.trim();
   secretWord = inputWord.toUpperCase().trim();
   let lenW= secretWord.length
   if (lenW==0) 
      msgTop.innerHTML = "Enter a word please!";//tc
    else if (lenW < 3) 
    msgTop.innerHTML = "Enter a word of at least 3 letters!";//tc
   if (lenW >20) 
     msgTop.innerHTML =  "Maxim 20 letters!";
    let isLetter = /^[a-zA-Z]+$/.test(secretWord);
    if (!isLetter && lenW>0 )
       msgTop.innerHTML =  "Only letter allowed!";
   if (lenW>=3 && lenW<=20 && isLetter==1)
   {
      document.getElementById("btnEdit").style.display ="none";
      document.getElementById("wordSecret").style.display ="none";
      document.getElementById("btnReset").style.display ="none";   
      document.getElementById("btnShow").style.display ="none";
      document.getElementById("btnNew").style.display ="none"; 
      document.getElementById("btnCont").style.display ="none";  
      document.getElementById("btnStop").style.display ="inline";     
      document.getElementById("msgTop").innerHTML=" Game in progress..";
      keypadDisable(false,0);
      if (lenW<=10)
         document.getElementById("wordGuessDiv").style.fontSize ="30px"; 
      else if (lenW<=15)
         document.getElementById("wordGuessDiv").style.fontSize ="25px";
      else     
         document.getElementById("wordGuessDiv").style.fontSize ="15px"
         fillCharToBlanc();
      addCharToGuessWord(secretWord[0]);
      addCharToGuessWord(secretWord[secretWord.length-1]);
   }
}

//Stop game button
function bStop() {
   document.getElementById("btnStop").style.display ="none";    
   document.getElementById("btnCont").style.display ="inline";    
   document.getElementById("btnReset").style.display ="inline";   
   document.getElementById("btnShow").style.display ="inline";
   document.getElementById("btnNew").style.display ="inline";   
   keypadDisable(true,-1); //keep mem pressed
   document.getElementById("msgTop").innerHTML=" Game stopped , choose an option :- Continue / Restart from begin / New game / Show the word and leave game ";
}

//Continue game with the same secret word
function bCont() {
   keypadDisable(false,-1); //restore mem pressed
   document.getElementById("btnStop").style.display ="inline";    
   document.getElementById("btnCont").style.display ="none";    
   document.getElementById("btnReset").style.display ="none";   
   document.getElementById("btnShow").style.display ="none";
   document.getElementById("btnNew").style.display ="none"; 
   document.getElementById("msgTop").innerHTML=" Game in progress..";
}

//Show secret word and escape game 
function bShow() {
   fillCharToGuessWord();
   FillDraw(true);
   tryNbLeft=0;
   tryNb.innerHTML = tryNbLeft;
   document.getElementById("btnReset").style.display ="none";   
   document.getElementById("btnShow").style.display ="none";
   document.getElementById("btnNew").style.display ="inline";   
   document.getElementById("btnCont").style.display ="none";   
   document.getElementById("msgTop").innerHTML=" Game escaped !";  
   keypadDisable(true,0);
}

//New secret word ,new game
function bNew() {
   document.getElementById("btnEdit").style.display ="inline";
   document.getElementById("wordSecret").style.display ="inline";
   document.getElementById("msgTop").innerHTML=" Enter the secret word!";  
   document.getElementById('wordSecret').value="";
   secretWord="_";
   charGuessWord.length=0;
   addCharToGuessWord();
   tryNbLeft=6;
   tryNb.innerHTML = tryNbLeft;
   FillDraw(false);
   keypadDisable(true,0);
   document.getElementById("btnReset").style.display ="none";   
   document.getElementById("btnShow").style.display ="none";
   document.getElementById("btnNew").style.display ="none";   
   document.getElementById("btnStop").style.display ="none"; 
   document.getElementById("btnCont").style.display ="none";    
   document.getElementById("msgFin").innerHTML="" ; 
}

//Restart the game with the same word
function bReset() {
   tryNbLeft=6;
   tryNb.innerHTML = tryNbLeft;
   FillDraw(false);
   fillCharToBlanc();
   addCharToGuessWord(secretWord[0]);
   addCharToGuessWord(secretWord[secretWord.length-1]);
   keypadDisable(false,0);
   document.getElementById("msgTop").innerHTML=" Game in progress..";
   document.getElementById("btnStop").style.display ="inline";    
   document.getElementById("btnCont").style.display ="none";    
   document.getElementById("btnReset").style.display ="none";   
   document.getElementById("btnShow").style.display ="none";
   document.getElementById("btnNew").style.display ="none"; 
}

//Add a char to guess word if it match the secret word
function addCharToGuessWord(ch) {
   let lengthSecretWord = secretWord.length;
   for (let i = 0; i < lengthSecretWord ; ++i) {
      if (secretWord[i] === ch) {
         charGuessWord[i] = ch;   
      }
   }
   wordGuess.innerHTML = charGuessWord.join(' ');
}

//Fill the guess word with the secret word letters remained and escape game
function fillCharToGuessWord() {
   let lengthSecretWord = secretWord.length; 
   for (let i = 0; i < lengthSecretWord ; ++i) {
      if (secretWord[i] != charGuessWord[i]) {
         charGuessWord[i] = secretWord[i].toLowerCase();
      }
   }
   wordGuess.innerHTML = charGuessWord.join(' ');
}

//Fill the guess word with "_"
function fillCharToBlanc() {
   let lengthSecretWord = secretWord.length; 
   for (let i = 0; i < lengthSecretWord ; ++i) {
         charGuessWord[i] = '_';
      }
}


//generate keypad letter buttons
function generateKeypad() {
  document.getElementById("keypadDiv").style.display ="block";
   for (let i = 0; i < 26; ++i) {
      let createButton = document.createElement("button");
      createButton.innerHTML =String.fromCharCode(65+i);// keyboard[i];
      createButton.setAttribute("id",String.fromCharCode(65+i));// keyboard[i]);
      createButton.setAttribute("class", "keyStyle");
      keypadBtn.appendChild(createButton);
      memKeyPressed[0];
      createButton.onclick = function pushLetterCall() {
      pushLetter(i);
     } 
   }
   keypadDisable(true,0);
}

//Function to analyse a letter pushed on keypad
function pushLetter(i) {
   let keyboardC=String.fromCharCode(65+i);
   document.getElementById(keyboardC).disabled = true;
   document.getElementById(keyboardC).style.backgroundColor="gray";
   let leng = charGuessWord.length - 1;
   let gameWon = false;
    let findLetter = false;
   for (let j = 1; j <= leng; ++j) {
      if (keyboardC === secretWord[j]) {      
         findLetter = true;
      }
   }
   if (findLetter === true) {
      addCharToGuessWord(keyboardC);
   }
   if (findLetter === false) {
       if (tryNbLeft>0)
      --tryNbLeft;
      tryNb.innerHTML = tryNbLeft;
      const drawingPiece = document.getElementsByClassName('menParts');
      drawingPiece[6-tryNbLeft-1].style.display = 'block';   
   } 
   gameEndAnalyse();   
}

//Game over analyse
function gameEndAnalyse() {
  let gameOver=! charGuessWord.includes("_");
   if (tryNbLeft == 0) { 
         document.getElementById("msgTop").innerHTML="+++Loser+++ ";
         document.getElementById("msgFin").innerHTML="+++ Loser +++ ";
         document.getElementById("msgFin").style.backgroundColor="red";
         document.getElementById("btnReset").style.display ="inline";   
         document.getElementById("btnShow").style.display ="inline";
         document.getElementById("btnNew").style.display ="inline";   
         document.getElementById("btnCont").style.display ="none"; 
         document.getElementById("btnStop").style.display ="none";   
   } else if (gameOver) {
         document.getElementById("msgTop").innerHTML=">>> Winner<<<";
         document.getElementById("msgFin").innerHTML=">>>  Winner <<<";
         document.getElementById("msgFin").style.backgroundColor="green";
         document.getElementById("btnReset").style.display ="none";   
         document.getElementById("btnShow").style.display ="none";
         document.getElementById("btnNew").style.display ="inline";   
         document.getElementById("btnStop").style.display ="none";   
         document.getElementById("btnCont").style.display ="none";     
   }
   if (gameOver || tryNbLeft == 0) {
         keypadDisable(true,0);
   }
}

// Enable or disable the keypad. Initialize the key pressed memory 
function keypadDisable(disable,memKeyInit){ 
   for (let i = 0; i <= 25; ++i) {
      let keyboardC=String.fromCharCode(65+i);
      document.getElementById(keyboardC).disabled = disable;
      if (memKeyInit>=0)
         document.getElementById(keyboardC).style.backgroundColor="green";
      if (memKeyInit==0)
         memKeyPressed[i]=0;
   }
}

//Fill the drawing of hangman with the full or empty men components
function FillDraw(action){
   const drawingPiece = document.getElementsByClassName('menParts');  
   for (let i = 0; i <= 5; ++i) {
      if (action==true)
       drawingPiece[i].style.display = 'block';
   else
      drawingPiece[i].style.display = 'none';
   }
}
