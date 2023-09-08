import React, { useState, useEffect, useReducer } from 'react'
import './Chrono.css'
import pause from '../Images/pause.svg'
import play from '../Images/play.svg'
import reset from '../Images/reset.svg'

const Chrono = () => {

    const [sessionTime, setSessionTime] = useState(1500);
    const [sessionTimeFixed, setSessionTimeFixed] = useState(1500);
    const [breakTime,  setBreakTime] = useState(300);
    const [breakTimeFixed, setBreakTimeFixed] = useState(300);
    const [workingChrono, setWorkingChrono] = useState(false);

    const [state, dispatch] = useReducer(reducer);

    function reducer(state, action){
        switch(action.type){
            case 'TICK':
                if(sessionTime >= 0){
                    setSessionTime(sessionTime - 1)
                }else if(breakTime >= 1){
                    setBreakTime(breakTime - 1)
                }else if(breakTime <= 0 && sessionTime <= 0){
                    setSessionTime(sessionTimeFixed)
                    setBreakTime(breakTimeFixed)
                }
                break;
            default:
        }
    }

    const handleButton = () => {
        setWorkingChrono(!workingChrono);
    }

    const handleSession = e => {
        const element = e.target;

        if(element.classList.contains('minus') && !workingChrono ){
            if(sessionTime / 60 > 1){
                setSessionTime(sessionTime - 60)
                setSessionTimeFixed(sessionTime - 60)
            }
        }else if(element.classList.contains('plus') && !workingChrono ){
            if(sessionTime / 60 < 60){
                setSessionTime(sessionTime + 60)
                setSessionTimeFixed(sessionTime + 60)
            }
        }
    }

    const handleBreak = e => {
        const element = e.target;

        if(element.classList.contains('minus') && !workingChrono){
            if(breakTime / 60 > 1){
                setBreakTime(breakTime - 60)
                setBreakTimeFixed(breakTime - 60)
            }
        }else if(element.classList.contains('plus') && !workingChrono){
            if(breakTime / 60 < 60){
                setBreakTime(breakTime + 60)
                setBreakTimeFixed(breakTime + 60)
            }
        }
    }

    const resetTime = () => {
        if(workingChrono){
            setWorkingChrono(!workingChrono);
        }
        setSessionTime(sessionTimeFixed);
        setBreakTime(breakTimeFixed);
    }

    useEffect(()=>{
        let id;
        if(workingChrono){
            id = window.setInterval(()=>{
                dispatch({type: 'TICK'})
            }, 1000)
        }

        return () => {
            window.clearInterval(id);
        }
    }, [workingChrono])

  return (
    <div className={`container-chrono ${workingChrono ? 'anim-glow' : null}`}>
        <div className='container-config'>
            <div className='box-btns session'>
                <button className='minus' onClick={handleSession}> - </button>
                <span>{ sessionTimeFixed / 60 }</span>
                <button className='plus' onClick={handleSession}> + </button>
            </div>
            <div className='box-btns break'>
                <button className='minus' onClick={handleBreak} > - </button>
                <span>{ breakTimeFixed / 60 }</span>
                <button className='plus' onClick={handleBreak} > + </button>
            </div>
        </div>
        <h1> {
            sessionTime >= 0 ? (
                <span>
                    {`${Math.trunc(sessionTime / 60)} 
                    : ${sessionTime % 60 < 10 ? `0${sessionTime % 60}` : `${sessionTime%60}`}`}
                </span>
            ) : <span>
                    {`${Math.trunc(breakTime / 60)} 
                    : ${breakTime % 60 < 10 ? `0${breakTime % 60}` : `${breakTime%60}`}`}
                </span>
        } </h1>
        <div className='container-controllers'>
            <button onClick={handleButton}>
                <img src={workingChrono ? pause : play} alt='' />
            </button>
            <button onClick={resetTime} >
                <img src={reset} alt='' />
            </button>
        </div>
    </div>
  )
}

export default Chrono