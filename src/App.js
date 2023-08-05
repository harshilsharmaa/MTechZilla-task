import React, {useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Body from './components/Body';
import {useSelector, useDispatch} from 'react-redux';
import {setUpAuthObserver} from './utils/userSlice';

import { Outlet, createBrowserRouter } from 'react-router-dom';


function App() {

  const {currentUser, loading} = useSelector((store)=>store.user);

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(setUpAuthObserver());
  },[])


  return (
    <>
    <Header />
    {
      loading?<h1>Loading...</h1>:
      currentUser?<Outlet />:<Login />
    }
    </>    

  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />
      },
    ]
  }
])



export default appRouter;
