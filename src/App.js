import React from "react";
import "./App.css";
import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import ExamManager from "./components/admin/exam_manager/examManager";
import UserManager from "./components/admin/user_manager/userManager";
import AddExam from "./components/admin/add_exam/add_exam";
// import Chatbot from "./components/chat_bot/chatBot";

function App() {
  const [isLogInSuccess, setLogInSuccess] = useState(false);
  const [isLogIn, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/exam_manager" element={<ExamManager />} />
          <Route path="/user_manager" element={<UserManager />} />
          <Route path="/add_exam" element={<AddExam />} />
          {/* <Route path="/student_manager" element={} /> */}
        </Route>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<LoginSignup />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
