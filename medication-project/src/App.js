import React, { useState } from 'react';
import axios from 'axios';
import Homepage from './Homepage';

import './App.css';
import '@fontsource/roboto/300.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Formpage from './Formpage';

function App() {
  const [display, setDisplay] = useState("login")
  const [userId, setUserId] = useState()
  const [info, setInfo] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  })

  const [returned_info, setReturnedInfo] = useState({
      first_name: "",
      last_name: "",
    })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
        return { ...prev, [name]: value }
    })
  }

  /**const logout = () => {
    setDisplay("login")
  }*/

  const signup = () => {
    setDisplay("signup")
  }

  const login = () => {
    setDisplay("login")
  }

  if (display === "login") {
    return (
      <LoginForm info={info} setInfo={setInfo} userId={userId} setUserId={setUserId} setReturnedInfo={setReturnedInfo} setDisplay={setDisplay}/>
    )
  }
  else if(display === "signup") {
    return (
      <SignupForm info={info} setInfo={setInfo} setDisplay={setDisplay}/>
    )
  }
  else if(display === "homepage") {
    return (
      <Homepage returned_info={returned_info} setDisplay={setDisplay}/>
    )
  }
  else if(display === "formpage") {
    return (
      <Formpage setDisplay={setDisplay}/>
    )
  }
}

export default App;
