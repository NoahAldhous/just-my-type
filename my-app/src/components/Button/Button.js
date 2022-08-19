import "./Button.css";

function Button({ buttonText, setButtonText, getWord, score, setScore, highScore, setHighScore, setSeconds, setPaused}) {

  var input = document.querySelector(".Input-field")

    function handleClick(){
      if(score > highScore){
        setHighScore(score)
        localStorage.setItem('localScore', highScore)
      }
        input.placeholder = "type the word above..."
        input.disabled = false
        setButtonText("reset")
        setSeconds(59)
        setScore(0)
        getWord()
    }

  return (
    <button className="Button" onClick={handleClick}>
      {buttonText}
    </button>
  );
}

export default Button;
