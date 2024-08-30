import { useState, useEffect } from 'react';
import { Button, Box, CssBaseline, ThemeProvider, TextField, InputAdornment, IconButton, Typography, Modal } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

const EditForm = ({showEditForm, setShowEditForm, selectedMed}) => {

    const handleChange = () => {
        console.log("hey")
    }

    const handleMedStats = () => {
        console.log("hey")
    }

    const closeEditModal = () => {
        setShowEditForm(false)
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
        >
            <Modal
                        open={showEditForm}
                        onClose={closeEditModal}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
            >
                <div>
                    <h1 style={{ fontFamily: 'Lexend, sans-serif', paddingTop: '40px', marginBottom: '50px', color: '#65b5ff' }}>Edit medication</h1>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                            <form style={{ width: '100%' }} onSubmit={handleMedStats}>

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
                                {/* <FormControl sx={{ width: '100%', backgroundColor: 'white', marginBottom: '40px', display: 'flex', alignItems: 'center'}}>
                                    <FormLabel id="medication-importance" sx={{fontSize: '20px', fontWeight: 'bold'}}>Importance</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="medication-importance-radio-buttons"
                                        name="medication-importance-radio-buttons"
                                        value={importanceValue}
                                        onChange={importanceChange}
                                    >
                                        <FormControlLabel value="Most Important" control={<Radio />} sx={{color: 'red'}} label="High!!!" />
                                        <FormControlLabel value="Somewhat Important" control={<Radio />} sx={{color: 'red'}} label="Medium!!" />
                                        <FormControlLabel value="Least Important" control={<Radio />} sx={{color: 'red'}} label="Low!" />
                                    </RadioGroup>
                                </FormControl> */}
                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#65b5ff', width: '70%', marginBottom: '20px' }}>Submit</Button>

                            </form>
                        </Box>
                </div>
            </Modal>
        </div>
    )
}

export default EditForm