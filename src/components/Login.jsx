import React from 'react'
import { useDispatch } from 'react-redux';
import { signInwithGoogle } from '../utils/userSlice';

const Login = () => {

  const dispatch = useDispatch();

  return (
    <div className="p-4 flex flex-col items-center justify-center">
    <div className="mt-4 bg-white p-8 rounded-lg shadow-md w-96 text-center">
    <button onClick={()=>dispatch(signInwithGoogle())} className='px-3 py-2 bg-purple-300 rounded-lg font-bold hover:bg-purple-400'>Continue with Google</button>
      </div>

  </div>
  )
}

export default Login