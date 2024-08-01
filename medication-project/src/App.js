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

    useEffect(() => {
      // Function to dynamically load the script
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
          document.body.appendChild(script);
        });
      };
  
      // Load the confetti script
      loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js')
        .then(() => {
          console.log('Confetti script loaded successfully');
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  const handleConfettiClick = () => {
    if (window.confetti) {
      window.confetti();
    } else {
      console.error('Confetti script not loaded');
    }
  };

  if (display === "login" || display === "signup") {
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
              
              <button id="submit-form" type="submit">Submit</button>
            </form>
            <div className="action-container">
              <button id="confetti-button" onClick={handleConfettiClick}>Click For Confetti</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
