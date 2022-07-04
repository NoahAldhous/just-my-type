

function Button({ text, number, setWordNumber}){

    function handleClick(){
        setWordNumber(number)
        console.log(`wordNumber set to ${number}`)
    }

    return <button
        onClick = {
            handleClick
            }
        style = {{
            border: 'none',
            margin: '5%',
            width: '30%',
            fontFamily: "inherit",
            fontSize: '20px',
            padding: '1%',
            borderRadius: "5%",
            backgroundColor : '#DED6D6'
        }}
    >
    {text}</button>
}

export default Button