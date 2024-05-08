import logo from './logo.svg';
import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import Login from './LogIn/Login';
import Layout from './Layout/Layout.jsx';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import useAxiosFetch from './hooks/useAxiosFetch'
import LoginSignup from './LoginSignUp/LoginSignUp'
import Home from './Home/Home.jsx';
function App() {
  const [isLogInSuccess, setLogInSuccess] = useState(false)
  const [isLogIn, setIsLogin] = useState(false)
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='' element ={<Home></Home>}/>
            <Route path='/home' element ={<Home></Home>}/>
          </Route>
          <Route path='/login'
          element={<Login/>}/>
          <Route path='/register'
          element={<LoginSignup/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
