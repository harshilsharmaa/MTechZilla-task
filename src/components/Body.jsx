import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../utils/userSlice';

const Body = () => {

    const {currentUser} = useSelector((store)=>store.user);

    const dispatch = useDispatch();

    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [breakTime, setBreakTime] = useState(false);

    const timerRef = useRef(null);

    const startTimer = () => {
        const timer = setInterval(() => {
            setSeconds((prev)=>prev-1);
        }, 1000);

        timerRef.current = timer;
    }

    useEffect(() => {
    if(seconds <= 0) {
        setMinutes((prev)=>prev-1);
        setSeconds(59);
    }
    if(minutes <= 0 && seconds <= 0) {
        stopTimer();
    }
    }, [seconds]);

    useEffect(() => {
      if(breakTime){
        setMinutes(5);
        setSeconds(60);
      }
      else{
        setMinutes(25);
        setSeconds(0);
      }
    },[breakTime]);

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setMinutes(0);
        setSeconds(0);
        if(breakTime){
          setBreakTime(false);
        }
        else{
          setBreakTime(true);
        }
    }

    const pauseTimer = () => {
      clearInterval(timerRef.current);
    }

    const resetTimer = () => {
      clearInterval(timerRef.current);
      setMinutes(25);
      setSeconds(0);
    }

    useEffect(() => {
      return () => {
        clearInterval(timerRef.current);
      }
    }, []);
  

  return (
    <div className='p-4'>
      <h2 className='font-bold text-xl '>Hello, {currentUser?.displayName}</h2>
      <button onClick={()=>dispatch(logout())} className='px-4 py-2 mt-2 bg-red-300 rounded-xl hover:bg-red-400'>Logout</button>

      <div className='mt-7'>
        {
          breakTime ? <h1 className='text-4xl text-center'>It's Break Time</h1>:null
        }
        <div className='m-auto w-5/12 px-6 py-4 rounded-xl shadow-md text-center bg-purple-200'>
            <div>
              <h1 className='font-bold text-9xl text-purple-900'>{`${minutes===0?'00':minutes/10<1?`0${minutes}`:minutes} : ${seconds===0?'00':seconds/10<1?`0${seconds}`:seconds} `}</h1>
            </div>

            <div className='mt-5 flex justify-evenly'>

              {
                breakTime ?<button onClick={()=>startTimer()} className='px-4 py-2 bg-purple-400 rounded-xl text-xl'>Take Break</button>
                :<>
                  <button onClick={()=>startTimer()} className='px-4 py-2 bg-purple-400 rounded-xl text-xl'>Start</button>
                  <button onClick={()=>pauseTimer()} className='px-4 py-2 bg-purple-400 rounded-xl text-xl'>Pause</button>
                </>
              }
              <button onClick={()=>resetTimer()} className='px-4 py-2 bg-purple-400 rounded-xl text-xl'>Reset</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Body