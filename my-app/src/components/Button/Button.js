import "./Button.css";

function Button({ text, getWord, score, setScore, highScore, setHighScore}) {

    function handleClick(){
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
