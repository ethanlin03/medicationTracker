import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from './Homepage';

import './App.css';
import '@fontsource/roboto/300.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Formpage from './Formpage';
import EditForm from './EditForm';
import TakenForm from './TakenForm';

function App() {
  const [display, setDisplay] = useState("login")
  const [userId, setUserId] = useState(0)
  const [currentMed, setCurrentMed] = useState()
  const [addedMedications, setAddedMedications] = useState([])
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
    console.log(addedMedications)
    return (
      <Homepage returned_info={returned_info} display={display} setDisplay={setDisplay} addedMedications={addedMedications} setAddedMedications={setAddedMedications} userId={userId} currentMed={currentMed} setCurrentMed={setCurrentMed}/>
    )
  }
  else if(display === "formpage") {
    return (
      <Formpage userId={userId} setUserId={setUserId} addedMedications={addedMedications} setAddedMedications={setAddedMedications} setDisplay={setDisplay}/>
    )
  }
  else if(display === "editform") {
    return (
      <EditForm userId={userId} setAddedMedications={setAddedMedications} setDisplay={setDisplay} currentMed={currentMed} setCurrentMed={setCurrentMed}/>
    )
  }
  else if(display === "takenform") {
    return (
      <TakenForm userId={userId} addedMedications={addedMedications} setAddedMedications={setAddedMedications} setDisplay={setDisplay}/>
    )
  }
}

export default App;
