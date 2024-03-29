import { useEffect } from 'react'
import './CountdownTimer.css';


const Timer = (props) => {
    var input = document.querySelector(".Input-field")
    var currentWord = document.querySelector(".Random-word")
    const {seconds, setSeconds, score, highScore, setHighScore, setInitialRender} = props;


    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval)
                if(score > highScore){
                        setHighScore(score)
                        console.log(`new highscore!`)
                        localStorage.setItem('localScore', highScore)
                    }
                currentWord.classList.remove("Random-word--incorrect")
                input.blur()
                input.value = '';
                input.placeholder = "..."
                setInitialRender(true)
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div className={['the-countdown-component' , 'invisible'].join(' ')}>
        { seconds <= 0
            ? <div className='time-up-text'>1:00</div>
            : <div className='countdown-prog-container'>
            <p className='the-countdown-text' > 0:{seconds < 10 ?  `0${seconds}` : seconds}</p>
            </div>
        }
        </div>
    )



    
}

export default Timer;