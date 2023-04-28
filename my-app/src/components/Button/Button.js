import "./Button.css";

function Button({ buttonText, setButtonText, getWord, score, setScore, highScore, setHighScore, setSeconds}) {

  var input = document.querySelector(".Input-field")
  var timer = document.querySelector(".the-countdown-component")

    function handleClick(){
      if(score > highScore){
        setHighScore(score)
        
      }
        input.placeholder = "type the word above..."
        setButtonText("reset")
        setSeconds(59)
        setScore(0)
        getWord()
        input.focus()
        input.value = ''
        timer.classList.remove('invisible')
    }

  return (
    <button className="Button" onClick={handleClick}>
      {buttonText}
    </button>
  );
}

export default Button;
