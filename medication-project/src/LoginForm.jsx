import React, { useState } from 'react'
import axios from 'axios';

const LoginForm = ({setReturnedInfo, setDisplay}) => {
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

    const handleClick = () => {
        setDisplay("signup")
    }

    const submit_login = async(e) => {
        e.preventDefault()
        console.log(info)
    
        try {
          const response = await axios.post('http://localhost:5000/login-form', info);
          console.log(response.data); // Handle backend response
          setReturnedInfo(response.data.message)
        } catch (error) {
          console.error('Error:', error);
        }
        setDisplay("homepage")
    }

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
                <button id="signup" onClick={handleClick}>Signup</button>
              </div>
            </div>
          </div>
        </div>
      )
}

export default LoginForm