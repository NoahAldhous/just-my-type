import "./Button.css";

function Button({ text, getWord, score, setScore, highScore, setHighScore, setSeconds}) {

  var input = document.querySelector(".Input-field")

    function handleClick(){
      if(score > highScore){
        setHighScore(score)
        localStorage.setItem('localScore', highScore)
      }
        input.disabled = false
        setSeconds(59)
        setScore(0)
        getWord()
        
    }

  return (
    <button className="Button" onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
