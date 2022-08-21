import './Input.css'

function Input({ handleChange, setSeconds, getWord, initialRender, score, setScore, highScore, setHighScore}) {
  var input = document.querySelector(".Input-field")

  function handleFocus(){
    if(initialRender){
      if(score > highScore){
        setHighScore(score)
      }
    setScore(0);
    getWord();
    input.placeholder = "type the word above...";
    setSeconds(-1)
  }
  console.log(initialRender)
  }

  return (
    <input
      className="Input-field"
      type="text"
      onChange={handleChange}
      placeholder="..."
      onFocus = {handleFocus}
    />
  );
}

export default Input;
