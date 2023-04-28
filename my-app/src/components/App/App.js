import { useState, useEffect } from "react";
import "./App.css";

import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import RandomWord from "../RandomWord/RandomWord.js";
import Timer from "../CountdownTimer/CountdownTimer";

function App() {

  //SETTING INITIAL STATES

  //'word' is initially set as the name of the app (for aesthetic purposes) before being set as the random word fetched from Word API 
  const [word, setWord] = useState("just my type");

  //'score' is the user's score
  const [score, setScore] = useState(0);

  //'highScore' is the user's high score. It is stored in and then taken from local storage to maintain between sessions.
  const [highScore, setHighScore] = useState(localStorage.localScore);

  //'seconds' is used by the CountdownTimer Component
  const [seconds, setSeconds] =  useState(59);

  //'buttonText' will display on the button, either as 'click to begin' or 'click to reset'
  const [buttonText, setButtonText] = useState("click to begin");

  //TODO:find out what this does???
  const [initialRender, setInitialRender] = useState(true);
  
  //Each time the high score of the user is updated, it is also saved to local storage
  //In the case of a first time user, local storage will be set to 0 to avoid type errors.
  useEffect( ()=>{
    localStorage.setItem('localScore', highScore);
    if(localStorage.localScore === 'undefined'){
      setHighScore(0)
    }
  }, [highScore]);

  //fetch request for random word API
  //TODO: refactor so multiple words are fetched initially (100?), then stored in an array that is cycled through- rather than fetching a new word each time
  async function getWord() {
    const response = await fetch(`https://random-word-api.herokuapp.com/word`);
    const data = await response.json();
    //'data' returns as an array, so setting the word as the 0 index 
    setWord(data[0]);
  }

  //function that is called whenever input field value changes (i.e as user types)
  function handleChange(e) {

    var currentWord = document.querySelector(".Random-word");
    var timer = document.querySelector(".the-countdown-component");

    if(initialRender){
      setButtonText("reset");
      setSeconds(59);
      timer.classList.remove('invisible');
      setInitialRender(false);
    }

    //If what is typed in the input field does not match the random word, turns the random word red to indicate a typo.
    if (word.includes(e.target.value.toLowerCase()) === false) {
      currentWord.classList.add("Random-word--incorrect");
    }
    
    //if user corrects this typo, turns the word black to indicate correct spelling.
    if (word.includes(e.target.value.toLowerCase())) {
      currentWord.classList.remove("Random-word--incorrect");
    }
    
    //checks if input field matches the word
    if (e.target.value.toLowerCase() === word) {
      //if they match, get a new random word-
      getWord();
      //reset the text in the input field
      e.target.value = "";
      //increment user's score by one
      setScore(score + 1);
    }
  }

  return (
    <main className= "Main">
          <div className= "Container">

            <div className= "Word-Container">
              <RandomWord word={word} />
            </div>

            <Input handleChange={handleChange} setSeconds = {setSeconds}  getWord= {getWord} initialRender = {initialRender} score = {score} setScore = {setScore} highScore={highScore} setHighScore = {setHighScore}/>

            <section className= "Button-Container">
              <Button buttonText={buttonText} setButtonText = {setButtonText} getWord= {getWord} score = {score} setScore = {setScore} highScore={highScore} setHighScore = {setHighScore} setSeconds = {setSeconds}/>
            </section>

            <section className = "Timer-Container">
              <Timer seconds = {seconds} setSeconds = {setSeconds} score ={score} highScore = {highScore} setHighScore = {setHighScore} setInitialRender = {setInitialRender} />
            </section>

            <section className = "Score-Container">
              <h3 className = "Score">score: {score}</h3>
              {
                localStorage.localScore === 'undefined'
                ? <h3 className = "Highscore">high score: 0</h3>
                : <h3 className = "Highscore">high score: {highScore}</h3>
              }
            </section>

          </div>
    </main>
  );
}

export default App;
