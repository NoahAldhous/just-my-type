import './Input.css'

function Input({ handleChange, handleKey }) {
  return (
    <input
      className="Input-field"
      type="text"
      onChange={handleChange}
      onKeyDown={handleKey}
      placeholder="..."
      disabled
    />
  );
}

export default Input;
