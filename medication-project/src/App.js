import { useEffect } from 'react';
import React, { useState } from 'react'
import './App.css';
import '@fontsource/roboto/300.css';

function App() {
  const [display, setDisplay] = useState("login")
  const [userId, setUserId] = useState()

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
      <div className="App">
        <div className="main-container">
          <div className="container2">
            <div className="header-container"><h1>Medication Tracker</h1></div>
            <h2>Login</h2>
            <form id="registration-form">
            <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required /><br /><br />

              <label htmlFor="password">Password:</label>
              <input type="text" id="password" name="password" required /><br /><br />
              
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
            <form id="registration-form">
              <label htmlFor="first_name">First Name:</label>
              <input type="text" id="first_name" name="first_name" required /><br /><br />

              <label htmlFor="last_name">Last Name:</label>
              <input type="text" id="last_name" name="last_name" required /><br /><br />

              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required /><br /><br />

              <label htmlFor="password">Password:</label>
              <input type="text" id="password" name="password" required /><br /><br />
              
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
