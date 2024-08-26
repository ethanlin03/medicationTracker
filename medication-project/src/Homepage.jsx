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
import Formpage from './Formpage';
import axios from 'axios';

const Homepage = ({returned_info, display, setDisplay, addedMedications, setAddedMedications, userId}) => {
    const [anchorEl, setAnchorEl] = useState(null);
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
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
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
                <AccountCircleOutlinedIcon sx={{fontSize: 38}} />
            </IconButton>
            <h1 style={{color:'gray'}}>
                Welcome {returned_info.first_name} {returned_info.last_name}!
            </h1>
            {display === "homepage" && addedMedications.length > 0 && (
               
                <div style={{ width: '80%', margin: '5% auto', marginTop: '20px', backgroundColor: '#fff', borderRadius: '20px', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Lexend, sans-serif', margin: '20px', color: '#65b5ff' }}>Added Medications</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {addedMedications.map((med, index) => (
                            <div
                            key={index}
                            style={{
                                flex: '1 1 calc(50% - 20px)', // Adjust width of each item
                                marginLeft: index % 2 === 0 ? '0' : '10px', // Add space to the left of odd items
                                marginRight: index % 2 === 0 ? '10px' : '0', // Add space to the right of even items
                                marginBottom: '0px',
                                display: 'flex',
                                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' // Align based on index
                            }}
                            >
                            <Card style={{ width: '100%' }}>
                                <CardContent>
                                <Typography variant="h5" component="div" fontWeight='bold'>
                                    {med.medication_name}
                                </Typography>
                                {med.amount} per day, {med.dosage}mg
                                </CardContent>
                            </Card>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {display === "homepage" && addedMedications.length === 0 && (
                <div style={{padding: '10px'}}>
                    <Typography style={{color: 'gray'}}>
                        No medications
                    </Typography>
                </div>
            )}
            <IconButton 
            onClick={handleAddMedicine}
                    sx={{
                    fontSize: 20}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',  // Centers horizontally
                            alignItems: 'center',      // Centers vertically
                            height: 100,           // Full viewport height
                            width: 500,
                        }}>
                        <Box component="section" 
                            sx={{   
                                p: 2,
                                border: '2px dashed grey', 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',  // Centers horizontally
                                alignItems: 'center',      // Centers vertically
                                width: 500,
                            }}>
                            <Typography sx={{color:'gray'}}>Add medicine</Typography>
                            <AddBoxOutlinedIcon style={{ height: 30, width: 200 }}/>
                        </Box>
                    </Box>
            </IconButton>
 
            </div>
        </div>
    )
}

export default Homepage