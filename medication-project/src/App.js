import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import '@fontsource/roboto/300.css';

function App() {
  const [display, setDisplay] = useState("login")
  const [userId, setUserId] = useState()
  const [info, setInfo] = useState({
    username: "",
    password: "",
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

  const submit_signup = async(e) => {
    e.preventDefault()
    console.log(info)

    try {
      const response = await axios.post('http://localhost:5000/signup-form', info);
      console.log(response.data); // Handle backend response
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const submit_login = async(e) => {
    e.preventDefault()
    console.log(info)

    try {
      const response = await axios.post('http://localhost:5000/login-form', info);
      console.log(response.data); // Handle backend response
    } catch (error) {
      console.error('Error:', error);
    }
    setDisplay("login")
  }

  if (display === "login") {
    return (
      <div className="App">
        <div className="main-container">
          <div className="container2">
            <div className="header-container"><h1>Medication Tracker</h1></div>
            <h2>Login</h2>
            <form id="registration-form" onSubmit={submit_login}>
            <label htmlFor="username">Username:</label>
              <input type="text" id="username" onChange={handleChange} name="username" required /><br /><br />

              <label htmlFor="password">Password:</label>
              <input type="text" id="password" onChange={handleChange} name="password" required /><br /><br />
              
              <button id="submit-form" type="submit">Submit</button>
            </form>
            <div className="action-container">
              Don't have an account?
              <button id="signup" onClick={signup}>Signup</button>
            </div>
          </div>
        </div>
      </div>
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
}

export default App;
