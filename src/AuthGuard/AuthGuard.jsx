import React from 'react'
import { Navigate } from 'react-router-dom'
const AuthGuard = ({element}) => {
    const user = localStorage.getItem('user')
    // test: user mặc dịnh cho true
    // thực tế: user
  if(!user){
    return <Navigate to="/login" replace/>
        
        
    }
    return element
}

export default AuthGuard