import './index.css'

function Input({ handleChange, handleKey }) {
  return (
    <input
      className="Input field"
      type="text"
      onChange={handleChange}
      onKeyDown={handleKey}
      placeholder="type away..."
      style={{
        marginTop: "5%",
        marginRight: "5%",
        outline: "transparent",
        border: "none",
        backgroundColor: "transparent",
        color: "#F9C80E",
        fontFamily: "inherit",
        fontSize: "20px",
        borderBottom: "1px solid #03012C",
      }}
    />
  );
}

export default Input;
