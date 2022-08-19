import { useEffect } from 'react'
import './CountdownTimer.css';


const Timer = (props) => {
    var input = document.querySelector(".Input-field")
    var header = document.querySelector(".Header")
    const {seconds, setSeconds, score, highScore, setHighScore} = props;


    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval)
                if(score > highScore){
                        setHighScore(score)
                        localStorage.setItem('localScore', highScore)
                    }
                header.classList.remove("Header--incorrect")
                input.disabled = true;
                input.value = '';

            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });


    return (
        <div className='the-countdown-component'>
        { seconds === 0
            ? <div className='time-up-text'>try again?</div>
            : <div className='countdown-prog-container'>
            <p className='the-countdown-text' > 0:{seconds < 10 ?  `0${seconds}` : seconds}</p>
            </div>
        }
        </div>
    )
}

export default Timer;