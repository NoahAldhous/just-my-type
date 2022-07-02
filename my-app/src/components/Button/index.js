import { useState } from 'react';


function Button({getWord, text, number}){
const [words, setwords] = useState([]);

    async function fetchWord(number) {
        const source = "https://random-word-api.herokuapp.com/word?number="+ number;
        const response = await fetch(source);
        const data = await response.json();
        console.log(data)
        setwords(data)
    }
    return <button
        onClick = {
            function(){
                fetchWord(number)
                console.log(`${number} button clicked`)
            }
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
    {text}{words}</button>
}

export default Button