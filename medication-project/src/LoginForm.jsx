import React, { useState, useEffect } from 'react'
import axios from 'axios';

const LoginForm = ({info, setInfo, userId, setUserId, setReturnedInfo, setDisplay}) => {
    useEffect(() => {
      if (userId) {
        console.log(userId);
      }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleClick = () => {
        setDisplay("signup")
    }

    const getUserPass = async(username, password) => {  
      try {
        const response = await axios.get('http://localhost:5000/homepage', {
          params: {
            username: username,
            password: password,
          }
        });
        console.log(response.data)
        setReturnedInfo({
          first_name: response.data.first,
          last_name: response.data.last,
        });
        setUserId(response.data.user_id)

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
          if(response.data.message === "Login successful.")
          {
            await getUserPass(response.data.username, response.data.password)
          }
          setDisplay("homepage")
        } catch (error) {
          console.error('Error:', error);
        }
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