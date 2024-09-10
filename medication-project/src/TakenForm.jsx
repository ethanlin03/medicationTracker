import { Button, Box, IconButton, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import HomeIcon from '@mui/icons-material/Home';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react"
import axios from "axios"

function currentDate() {
    var d = new Date();
    const currentDate = dayjs(d).format('MM/DD/YY');
    
    return currentDate;
}

function currentTime() {
    var t = new Date();
    const currentTime = dayjs(t).format('h:mm A');

    return currentTime;
}

const TakenForm = ({userId, addedMedications, setAddedMedications, setDisplay}) => {
    const [value, setValue] = useState([]);
    const [message, setMessage] = useState("");
    const [date, setDate] = useState(currentDate());
    const [time, setTime] = useState(currentTime());
    const [chosenMeds, setChosenMeds] = useState({
        userId: userId,
        medications: [],
        dateTaken: currentDate(),
        timeTaken: currentTime()
    });

    const handleTimeChange = (newTime) => {
        const formattedDate = newTime.format('MM/DD/YY'); // Example: September 04, 2024 8:05 PM
        const formattedTime = newTime.format('h:mm A');
        setDate(formattedDate)
        setTime(formattedTime)
        setChosenMeds((prev) => {
            return {...prev, timeTaken: formattedTime, dateTaken: formattedDate}
        })
    };

    const clickHome = async(e) => {
        setChosenMeds({
            userId: userId,
            medications: [],
            dateTaken: currentDate(),
            timeTaken: currentTime()
        });
        setDisplay("homepage")
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/medication-taken', chosenMeds);
            console.log(response.data)

            if(response.data.message !== "Medicine wasn't updated with date/time taken")
            {
                setAddedMedications((prevAddedMedications) =>
                prevAddedMedications.map((addedMed) => {
                    const chosenMed = chosenMeds.medications.find(
                        (med) => med.medications === addedMed.medication_name
                    );
                    if (chosenMed) {
                        // Update the date and time if medication names match
                        return {
                            ...addedMed,
                            date: chosenMed.dateTaken,
                            time: chosenMed.timeTaken,
                        };
                    }
                    return addedMed; // Return the original medication if no match is found
                })
            );
                setDisplay("homepage")
            }
            else
                setMessage(response.data.message)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <div style={{
                    width: '40%',
                    margin: '5% auto',
                    marginBottom: '10px',
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center'
                }}>
                    <IconButton
                        onClick={clickHome}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            fontSize: 70,
                        }}
                    >
                        <HomeIcon sx={{ fontSize: 38 }} />
                    </IconButton>

                    <h1 style={{ fontFamily: 'Lexend, sans-serif', paddingTop: '40px', marginBottom: '50px', color: '#65b5ff' }}>
                        Taken medications
                    </h1>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px'}}>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <Autocomplete
                                    
                                    multiple
                                    value={value}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    setChosenMeds((prev) => ({
                                        ...prev,
                                        medications: newValue,
                                    }));
                                    }}
                                    id="Chosen_meds"
                                    options={addedMedications.map((option) => option.medication_name)}
                                    renderInput={(params) => <TextField {...params} label="Medications" name="medication_name" />}
                                    sx={{ width: '60%', backgroundColor: 'white', marginBottom: '20px' }} // Reduced width for row alignment
                                />
                                <DemoContainer components={['TimePicker']} sx={{ width: '28%', marginBottom: '20px'}}>
                                    <DemoItem>
                                        <TimePicker label="Taken at:" value={dayjs()} onChange={(newValue) => handleTimeChange(newValue)} />
                                    </DemoItem>
                                </DemoContainer>
                            </Box>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#65b5ff', width: '20%', marginBottom: '20px' }}>
                                Submit
                            </Button>
                        </form>
                    </Box>
                </div>
                <Typography style={{color: 'red'}}>{message}</Typography>
            </div>
        </LocalizationProvider>
    )
};

export default TakenForm;