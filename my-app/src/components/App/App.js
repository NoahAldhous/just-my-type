import { useState, useEffect } from "react";
import "./App.css";

import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import Header from "../Header/Header.js";

function App() {
  //set default state of word, input box, score and high score
  const [word, setWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0)

  //fetch request for random word API
  async function getWord() {
    const response = await fetch(`https://random-word-api.herokuapp.com/word`);
    const data = await response.json();
    console.log(data);
    //'data' returns as an array, so setting the word as the 0 index 
    setWord(data[0]);
  }

  //useEffect hook stops error messages regarding promises being returned
  useEffect(() => {
    getWord();
  },[]);

  // //function that is called onKeyDown in Input component
  // function handleKey(e) {
  //   //if key pressed is the enter key and user inputted word
  //   //matches the random word-
  //   if (e.key === "Enter" && userInput === word) {
  //     //fetch a new word
  //     getWord();
  //     //reset the user input state
  //     setUserInput("");
  //     //increase wordCounter by one
  //     setScore(score + 1);
  //     //and reset the text in the input field
  //     document.querySelector("input").value = "";
  //   }
  // }

  //function that is called whenever input field value changes (i.e as user types)
  function handleChange(e) {
    console.log(e.target.value.toLowerCase())

    var header = document.querySelector(".Header")

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
      //and reset the input state
      setUserInput("");
      header.classList.remove("Header--correct")
    }
  }

  return (
    <main className= "Main">
        <div className = "Timer"></div>
          <div className= "Container">
            <div className= "Word-Container">
              <Header word={word} />
            </div>
            <Input handleChange={handleChange}  />
            <section className = "Score-Container">
              <h3 className = "Score">score: {score}</h3>
              <h3 className = "Highscore">high score: {highScore}</h3>
            </section>
            <span className= "Button-Container">
              <Button text={"reset"} getWord= {getWord} setScore = {setScore} />
            </span>
          </div>
    </main>
  );
}

export default App;
