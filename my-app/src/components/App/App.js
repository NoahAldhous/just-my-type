import { useState, useEffect } from "react";
import "./App.css";

import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import Header from "../Header/Header.js";
import Timer from "../CountdownTimer/CountdownTimer";

function App() {
  //set default states
  const [word, setWord] = useState("just my type");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.localScore)
  const [seconds, setSeconds] =  useState(59);
  const [buttonText, setButtonText] = useState("click to begin")
  const [initialRender, setInitialRender] = useState(true)
  
  useEffect( ()=>{
    localStorage.setItem('localScore', highScore)
    if(localStorage.localScore === 'undefined'){
      setHighScore(0)
    }
  }, [highScore])

  //fetch request for random word API
  async function getWord() {
    const response = await fetch(`https://random-word-api.herokuapp.com/word`);
    const data = await response.json();
    //'data' returns as an array, so setting the word as the 0 index 
    setWord(data[0]);
  }

  //function that is called whenever input field value changes (i.e as user types)
  function handleChange(e) {

    var header = document.querySelector(".Header")
    var timer = document.querySelector(".the-countdown-component")

    if(initialRender){
      setButtonText("reset");
      setSeconds(59);
      timer.classList.remove('invisible');
      setInitialRender(false)
    }


    //If user types a string that is not included in the word, turns the word red
    //to tell user they have made a mistake
    if (word.includes(e.target.value.toLowerCase()) === false) {
      header.classList.add("Header--incorrect");
    }
    
    //if user corrects this mistake, turns the word black to show they are back on track.
    if (word.includes(e.target.value.toLowerCase())) {
      header.classList.remove("Header--incorrect")
    }
    
    //checks if input field matches the word
    if (e.target.value.toLowerCase() === word) {
      //if they match, get a new random word-
      getWord();
      //reset the text in the input field
      e.target.value = "";
      //increase wordCounter by one
      setScore(score + 1);
      header.classList.remove("Header--correct")
    }
  }

  return (
    <main className= "Main">
          <div className= "Container">

            <div className= "Word-Container">
              <Header word={word} />
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
