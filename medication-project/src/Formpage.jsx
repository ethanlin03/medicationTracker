import React, { useState, useEffect } from 'react';
import { Button, Box, CssBaseline, ThemeProvider, TextField, InputAdornment, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const Formpage = ({setDisplay}) => {
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [medications, setMedications] = useState([]); 
    const [medicationStats, setMedicationStats] = useState({
        medication_name: "",
        amount: "",
        dosage: "",
        notes: "",
    })
    //might need to add current date

    const retrieveMeds = async() => {
        try {
            const response = await axios.get('http://localhost:5000/medications');
            console.log(response.data)
            const transformedMedications = response.data.map((name, index) => ({
                id: index + 1,
                value: name
            }));
            setMedications(transformedMedications)
            console.log(transformedMedications)
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicationStats((prev) => {
            return { ...prev, medication_name: value ? value.id : ""}
        })
        console.log(value)
    }

    useEffect(() => {
        retrieveMeds();
      }, []);
  
    const clickHome = async(e) => {
        setDisplay("homepage");
    };

    const handleMedStats = async(e) => {
        console.log(medicationStats)
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/medications", medicationStats)
            console.log(response.data)
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
                        id="Medications"
                        freeSolo
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log(value)
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        console.log(inputValue)
                        }}
                        options={medications.map((option) => option.value)}
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