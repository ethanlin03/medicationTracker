import React, { useState, useEffect } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Formpage from './Formpage';
import axios from 'axios';
import MedicationCard from './MedicationCard';

const Homepage = ({returned_info, display, setDisplay, addedMedications, setAddedMedications, userId, currentMed, setCurrentMed}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [updatedCard, setUpdatedCard] = useState(true);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickLogout = (event) => {
        setDisplay("login")
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTaken = (event) => {
        setDisplay("takenform")
    }

    const handleClick = () => {
        console.log('Icon clicked!');
    };

    const checkForAnyMeds = async() => {
        try {
            console.log(userId)
            const response = await axios.get('http://localhost:5000/added-medications', {
                params: {
                  userId: userId
                }
              });
            console.log(response.data)
            setAddedMedications(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        checkForAnyMeds()
        console.log(addedMedications)
    }, []);
  

    const handleAddMedicine = async(e) => {
        setDisplay("formpage");
    };
    return (
        <div className="App">
            <div>
                <Tooltip title="Menu">
                    <IconButton
                        id="Menu"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickMenu}
                        sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        fontSize: 70,
                        }}
                    >
                        <MenuIcon sx={{fontSize: 38}}/>
                    </IconButton>
                </Tooltip>
                
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleAddMedicine}>Add Medication</MenuItem>
                    <MenuItem onClick={handleTaken}>Taken Medications</MenuItem>
                    <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                </Menu>

                <IconButton
                    onClick={handleClick}
                    sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    fontSize: 70,
                    }}
                >
                    <Tooltip title="Account">
                        <AccountCircleOutlinedIcon sx={{fontSize: 38}} />
                    </Tooltip>
                </IconButton>

                <h1 style={{color:'gray'}}>
                    Welcome {returned_info.first_name} {returned_info.last_name}!
                </h1>
                {display === "homepage" && addedMedications.length > 0 && (
                
                    <div style={{ width: '80%', margin: '5% auto', marginTop: '20px', marginBottom: '10px', backgroundColor: 'transparent', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontFamily: 'Lexend, sans-serif', margin: '20px', color: '#65b5ff' }}>Added Medications</h2>
                            <MedicationCard addedMedications={addedMedications} setAddedMedications={setAddedMedications} userId={userId} setDisplay={setDisplay} setUpdatedCard={setUpdatedCard} currentMed={currentMed} setCurrentMed={setCurrentMed}/>
                    </div>
                )}
                {display === "homepage" && addedMedications.length === 0 && updatedCard && (
                    <div style={{padding: '10px'}}>
                        <Typography style={{color: 'gray'}}>
                            No medications
                        </Typography>
                    </div>
                )}

                <IconButton 
                onClick={handleAddMedicine}
                        sx={{
                            width: '80%',
                            padding: 0,
                            borderRadius: 0,
                            marginTop: '10px',
                            marginBottom: '50px'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',  // Centers horizontally
                                alignItems: 'center',      // Centers vertically
                                height: 100,           // Full viewport height
                                width: '120%',
                            }}>
                            <Box component="section" 
                                sx={{   
                                    p: 2,
                                    border: '2px dashed grey', 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',  // Centers horizontally
                                    alignItems: 'center',      // Centers vertically
                                    width: '120%',
                                }}>
                                <Typography sx={{color:'gray', fontSize: 20}}>Add medicine</Typography>
                                <AddBoxOutlinedIcon style={{ height: 30, width: '200' }}/>
                            </Box>
                        </Box>
                </IconButton>
 
            </div>
        </div>
    )
}

export default Homepage