import React, { useState, useEffect } from 'react';
import { Button, Box, CssBaseline, ThemeProvider, TextField, InputAdornment, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const Formpage = ({userId, addedMedications, setAddedMedications, setDisplay}) => {
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [medications, setMedications] = useState([]);
    const [medicationStats, setMedicationStats] = useState({
        person_id: "",
        medication_name: "",
        amount: "",
        dosage: "",
        notes: "",
        month: 0,
        day: 0,
        year: 0,
    })

    const retrieveMeds = async() => {
        try {
            const response = await axios.get('http://localhost:5000/medications');
            console.log(response.data)
            setMedications(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const day = () => {
        var today = new Date();
        var m = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
        var d = parseInt(String(today.getDate()).padStart(2, '0'));
        var y = today.getFullYear();
        setMedicationStats((prev) => {
            return {
                ...prev,
                month: m,
                day: d,
                year: y,
                person_id: userId
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicationStats((prev) => {
            return { ...prev, [name]: value}
        })
        console.log(value)
    }

    useEffect(() => {
        retrieveMeds(); 
        day();
      }, []);
  
    const clickHome = async(e) => {
        setDisplay("homepage");
    };

    const handleMedStats = async(e) => {
        console.log(medicationStats)
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/medication-insert', medicationStats);
            console.log(response.data)

            if(response.data.message === "User's medication has been inserted")
            {
                const newMedication = medicationStats
                console.log(newMedication)
                setAddedMedications(prevMedications => [...prevMedications, newMedication]);
                setDisplay("homepage")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <div style={{ width: '30%', margin: '5% auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
            <>
            <IconButton
                onClick={clickHome}
                sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                fontSize: 70,
                }}
            >
                <HomeIcon sx={{fontSize: 38}} />
            </IconButton>
                <h1 style={{ fontFamily: 'Lexend, sans-serif', paddingTop: '40px', marginBottom: '50px', color: '#65b5ff' }}>Add medication</h1>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                <form style={{ width: '100%' }} onSubmit={handleMedStats}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue)
                            setMedicationStats((prev) => {
                                return {
                                    ...prev,
                                medication_name: newValue
                                }
                            })
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue)
                            setMedicationStats((prev) => {
                                return {
                                    ...prev,
                                medication_name: newInputValue
                                }
                            })
                        }}
                        id="Medications"
                        freeSolo
                        options={medications.map((option) => option)}
                        renderInput={(params) => <TextField {...params} label="Medications" name="medication_name"/>}
                        sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                        
                    />
                    <TextField
                    variant="outlined"
                    label="Amount Per Day"
                    type="text"
                    name="amount"
                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                    onChange={handleChange}
                    />
                    <TextField
                    variant="outlined"
                    label="Dosage (mg)"
                    type="text"
                    name="dosage"
                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                    onChange={handleChange}
                    />
                    <TextField
                    variant="outlined"
                    label="Important Notes/Instructions"
                    type="text"
                    name="notes"
                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '40px' }}
                    onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#65b5ff', width: '70%', marginBottom: '20px' }}>Submit</Button>
                </form>
                </Box>
            </>
            </div>
        </div>
    )
}

export default Formpage