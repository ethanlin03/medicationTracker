import React, { useState } from 'react';
import { Button, Box, CssBaseline, ThemeProvider, TextField, InputAdornment } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const Formpage = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState('');
  
    const options = [
      { value: 'aspirin', label: 'Aspirin' },
      { value: 'ibuprofen', label: 'Ibuprofen' },
      { value: 'acetaminophen', label: 'Acetaminophen' },
    ];
  
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    return (
        <div className="App">
            <div style={{ width: '30%', margin: '5% auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
            <>
                <h1 style={{ fontFamily: 'Lexend, sans-serif', paddingTop: '40px', marginBottom: '50px', color: '#65b5ff' }}>Add medication</h1>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                <form style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        label="Medication"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <TextField
                                select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                sx={{ minWidth: 120, marginRight: '8px' }}
                                >
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </InputAdornment>
                            ),
                        }}
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
                    label="Dosage"
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