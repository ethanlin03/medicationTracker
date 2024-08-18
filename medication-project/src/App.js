import React, { useState } from 'react';
import axios from 'axios';
import Homepage from './Homepage';

import './App.css';
import '@fontsource/roboto/300.css';
import LoginForm from './LoginForm';

function App() {
  const [display, setDisplay] = useState("login")
  const [userId, setUserId] = useState()
  const [info, setInfo] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  })

  const [returned_info, setReturnedInfo] = useState()

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

  const submit_signup = async(e) => {
    e.preventDefault()
    console.log(info)

    try {
      const response = await axios.post('http://localhost:5000/signup-form', info);
      console.log(response.data); // Handle backend response
    } catch (error) {
      console.error('Error:', error);
    }
    setDisplay("login")
  }

  if (display === "login") {
    return (
      <LoginForm returned_info setReturnedInfo={setReturnedInfo} setDisplay={setDisplay}/>
    )
  }
  else if(display === "signup") {
    return (
    <div className="App">
        <div className="main-container">
          <div className="container2">
            <div className="header-container"><h1>Medication Tracker</h1></div>
            <h2>Signup</h2>
            <form id="registration-form" onSubmit={submit_signup}>
              <label htmlFor="first_name">First Name:</label>
              <input type="text" id="first_name" onChange={handleChange} name="first_name" required /><br /><br />

              <label htmlFor="last_name">Last Name:</label>
              <input type="text" id="last_name" onChange={handleChange} name="last_name" required /><br /><br />

              <label htmlFor="username">Username:</label>
              <input type="text" id="username" onChange={handleChange} name="username" required /><br /><br />

              <label htmlFor="password">Password:</label>
              <input type="text" id="password" onChange={handleChange} name="password" required /><br /><br />
              
              <button id="submit-form" type="submit">Submit</button>
            </form>
            <div className="action-container">
              Already have an account?
              <button id="login" onClick={login}>Login</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else if(display === "homepage") {
    return (
      <div className="App">
        <Homepage returned_info={returned_info}/>
      </div>
    )
  }
}

export default App;
