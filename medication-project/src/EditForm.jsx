import { useState, useEffect } from 'react';
import { Button, Box, CssBaseline, ThemeProvider, TextField, InputAdornment, IconButton, Typography, Icon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import FormHelperText from '@mui/material/FormHelperText';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

const EditForm = ({userId, setAddedMedications, setDisplay, currentMed, setCurrentMed}) => {
    const [alert, setAlert] = useState(false);
    const [deleteMed, setDeleteMed] = useState(false);
    const [changedImportanceValue, setChangedImportanceValue] = useState("");
    const [changedParams, setChangedParams] = useState(false);
    const [changedMeds, setChangedMeds] = useState({
        userId: userId,
        medId: currentMed.id,
        amount: currentMed.amount,
        dosage: currentMed.dosage,
        notes: currentMed.notes,
        importance: currentMed.importance
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
        setChangedParams(true);
        console.log(value)
    }

    const clickHome = async(e) => {
        if(changedParams === false)
            setDisplay("homepage")

        else
            setAlert(true)
    }

    const clickHomeTwo = async(e) => {
        setAlert(false)
        setDisplay("homepage")
    }

    const clickCancel = async(e) => {
        setAlert(false)
    }

    const handleDelete = async(e) => {
        setDeleteMed(true)
    }

    const handleCancelDelete = async(e) => {
        setDeleteMed(false)
    }

    const handleConfirmDelete = async(e) => {
        console.log(userId, currentMed.id)
        try {
            const response = await axios.post('http://localhost:5000/medication-delete', {
                  userId: userId,
                  medId: currentMed.id
              })
            console.log(response.data.message)
            if(response.data.message === "Medicine was deleted")
            {
                setAddedMedications((prevMedications) => 
                    prevMedications.filter((medication) => medication.id !== currentMed.id)
                );
                setDeleteMed(false)
                setDisplay("homepage")
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
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
                    medication_name: currentMed.medication_name,
                    amount: changedMeds.amount,
                    dosage: changedMeds.dosage,
                    notes: changedMeds.notes,
                    importance: changedMeds.importance,
                    month: currentMed.month,
                    day: currentMed.day,
                    year: currentMed.year
                }
                console.log(newMedication)
                setAddedMedications(prevMedications => {
                    return prevMedications.map(med => 
                        med.medication_name === currentMed.medication_name && med.person_id === userId
                        ? newMedication
                        : med
                    );
                }); //need to update the old med with the new one

                setDisplay("homepage")
                clickHome()
            }
            else
                console.log(response.data.message)
                //setMessage(response.data.message)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="App">
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#fff',
                }}
            >
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
                { deleteMed && (
                            <Card sx={{ position: 'fixed', 
                                top: '20px', 
                                left: '50%', 
                                transform: 'translateX(-50%)', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                borderWidth: '10px',
                                backgroundColor: '#D3D3D3',
                                width: '20%' }}>
                                <Typography sx={{fontWeight: 'bold'}}>
                                    Are you sure you want to delete {currentMed.medication_name}?
                                </Typography>
                                <Box sx={{ display: 'flex', margin: '10px',
                                flexDirection: 'row', gap: '19px'}}>
                                    <Button variant="contained" onClick={handleConfirmDelete}>Yes</Button>

                                    <Button variant="contained" onClick={handleCancelDelete}>Cancel</Button>
                                </Box>
                            </Card>
                        )}
                {alert && (
                    <Box
                        sx={{
                            width: '50%',
                            padding: '20px',
                            
                        }}
                    >
                        <Alert variant="outlined" severity="warning" sx={{position: 'absolute', 
                                top: 10, 
                                left: '50%', 
                                transform: 'translateX(-50%)', 
                                width: '50%', 
                                marginBottom: '100px'
                                }}>
                            <h1>Leave site?</h1>
                            <Typography sx={{marginBottom: '10px'}}>
                                Changes you made may not be saved.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={clickHomeTwo}>Leave</Button>
                                <Button variant="contained" onClick={clickCancel}>Cancel</Button>
                            </Stack>
                        </Alert>
                    </Box>
                )}
                    <div style={{ width: '30%', margin: '5% auto', marginBottom: '10px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
                        <Tooltip title={`Delete ${currentMed.medication_name}`} sx={{position: 'relative', top: 10, left: -360, fontSize: 30, cursor: 'pointer', marginBottom: '0px'}}> {/*moves when inspect is opened*/}
                            <IconButton>
                                <DeleteIcon sx={{ color: 'red' }} onClick={handleDelete}/>
                            </IconButton>
                        </Tooltip>
                        <h1 style={{ fontFamily: 'Lexend, sans-serif', paddingTop: '10px', marginBottom: '50px', color: '#65b5ff' }}>Edit {currentMed.medication_name}</h1>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                                <form style={{ width: '100%' }} onSubmit={handleNewMedStats}>

                                    <TextField
                                    variant="outlined"
                                    label="Amount Per Day"
                                    type="text"
                                    helperText={"Current amount: " + currentMed.amount}
                                    name="amount"
                                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                                    onChange={handleChange}
                                    />
                                    <TextField
                                    variant="outlined"
                                    label="Dosage (mg)"
                                    type="text"
                                    helperText={"Current dosage: " + currentMed.dosage}
                                    name="dosage"
                                    sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                                    onChange={handleChange}
                                    />
                                    <TextField
                                    variant="outlined"
                                    label="Important Notes/Instructions"
                                    helperText={"Current notes: " + currentMed.notes}
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
                                        <FormHelperText>{"Current importance: " + (currentMed.importance === 2 ? "High" : currentMed.importance === 1 ? "Medium" : "Low")}</FormHelperText>
                                    </FormControl>
                                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#65b5ff', width: '70%', marginBottom: '20px' }}>Submit</Button>

                                </form>
                            </Box>
                    </div>
            </div>
        </div>
    )
}

export default EditForm