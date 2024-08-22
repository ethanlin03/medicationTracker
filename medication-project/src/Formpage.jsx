import React, { useState, useEffect } from 'react';
import { Button, Box, CssBaseline, ThemeProvider, TextField, InputAdornment, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const Formpage = ({setDisplay}) => {
    const [medications, setMedications] = useState([]); 

    const retrieveMeds = async() => {
        try {
            const response = await axios.get('http://localhost:5000/medications');
            console.log(response.data)
            setMedications(response.data)
          } catch (error) {
            console.error('Error:', error);
          }
    }

    useEffect(() => {
        retrieveMeds();
      }, []);
  
    const clickHome = async(e) => {
        setDisplay("homepage");
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
                <form style={{ width: '100%' }}>
                    <Autocomplete
                        id="Medications"
                        freeSolo
                        options={medications.map((option) => option)}
                        renderInput={(params) => <TextField {...params} label="Medications" />}
                        sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                    />
                    <TextField
                    variant="outlined"
                    label="Amount Per Day"
                    type="text"
                    name="Amount Per Day"
                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                    />
                    <TextField
                    variant="outlined"
                    label="Dosage (mg)"
                    type="text"
                    name="Dosage"
                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                    />
                    <TextField
                    variant="outlined"
                    label="Important Notes/Instructions"
                    type="text"
                    name="Important Notes/Instructions"
                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '40px' }}
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