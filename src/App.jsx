
import React from 'react'
import './App.css';
import Login from './LogIn/Login.jsx';
import Layout from './Layout/Layout.jsx';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LoginSignup from './LoginSignUp/LoginSignUp.js'
import Home from './Home/Home.jsx';
import History from './History/History.jsx';
import MyQuizz from './MyQuizz/MyQuizz.jsx';
import Exam from './Exam/Exam.jsx';
import Result from './Result/Result.jsx';
function App() {
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='' element ={<Home
            ></Home>}/>
            <Route path='/home' element ={<Home></Home>}/>
            <Route path='/register-quizz' element={<MyQuizz></MyQuizz>}/>
            <Route path='/history' element={<History></History>}/>
            <Route path='/exam-taking' element={<Exam></Exam>}/>
            <Route path='/result' element={<Result></Result>}/>
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
