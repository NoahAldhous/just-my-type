import "./Button.css";

function Button({ text, getWord}) {
    function handleClick(){
        getWord()
    }

  return (
    <button className="Button" onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
