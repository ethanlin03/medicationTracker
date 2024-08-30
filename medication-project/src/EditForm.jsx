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

const EditForm = ({showEditForm, setShowEditForm, selectedMed, userId, setAddedMedications}) => {
    const [changedImportanceValue, setChangedImportanceValue] = useState("");
    const [changedMeds, setChangedMeds] = useState({
        userId: userId,
        medId: selectedMed.id,
        amount: selectedMed.amount,
        dosage: selectedMed.dosage,
        notes: selectedMed.notes,
        importance: selectedMed.importance
    })

    const changedImportanceChange = (event) => {
        const newImportanceValue =  event.target.value === 'Most Important' ? 2 : (event.target.value === 'Somewhat Important' ? 1 : 0);

        setChangedImportanceValue(event.target.value);
        setChangedMeds((prev) => {
            return {
                ...prev,
                importance: newImportanceValue
            }
        })
        console.log(changedImportanceValue)
        console.log(changedMeds.importance)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangedMeds((prev) => {
            return { ...prev, [name]: value}
        })
        console.log(value)
    }

    const handleNewMedStats = async(e) => {
        console.log(changedMeds)
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/medication-update', changedMeds);
            console.log(response.data)

            if(response.data.message !== "Medicine wasn't updated")
            {
                const newMedication = {
                    person_id: userId,
                    medication_name: selectedMed.medication_name,
                    amount: changedMeds.amount,
                    dosage: changedMeds.dosage,
                    notes: changedMeds.notes,
                    importance: changedMeds.importance,
                    month: selectedMed.month,
                    day: selectedMed.day,
                    year: selectedMed.year
                }
                console.log(newMedication)
                setAddedMedications(prevMedications => {
                    const updatedMedications = prevMedications.map(med => 
                        med.medication_name === selectedMed.medication_name && 
                        med.person_id === userId
                        ? newMedication
                        : med
                    );
                    return updatedMedications;
                }); //need to update the old med with the new one
                closeEditModal(false) //need to show the updated med once the modal closes
            }
            else
                console.log(response.data.message)
                //setMessage(response.data.message)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const closeEditModal = () => {
        console.log(changedMeds)
        console.log(selectedMed)
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
                <div style={{ width: '30%', margin: '5% auto', marginBottom: '10px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'Lexend, sans-serif', paddingTop: '40px', marginBottom: '50px', color: '#65b5ff' }}>Edit medication</h1>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                            <form style={{ width: '100%' }} onSubmit={handleNewMedStats}>

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
                                <FormControl sx={{ width: '100%', backgroundColor: 'white', marginBottom: '40px', display: 'flex', alignItems: 'center'}}>
                                    <FormLabel id="medication-importance" sx={{fontSize: '20px', fontWeight: 'bold'}}>Importance</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="medication-importance-radio-buttons"
                                        name="medication-importance-radio-buttons"
                                        value={changedImportanceValue}
                                        onChange={changedImportanceChange}
                                    >
                                        <FormControlLabel value="Most Important" control={<Radio />} sx={{color: 'red'}} label="High!!!" />
                                        <FormControlLabel value="Somewhat Important" control={<Radio />} sx={{color: 'red'}} label="Medium!!" />
                                        <FormControlLabel value="Least Important" control={<Radio />} sx={{color: 'red'}} label="Low!" />
                                    </RadioGroup>
                                </FormControl>
                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#65b5ff', width: '70%', marginBottom: '20px' }}>Submit</Button>

                            </form>
                        </Box>
                </div>
            </Modal>
        </div>
    )
}

export default EditForm