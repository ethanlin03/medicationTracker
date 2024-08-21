import React, { useState } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Formpage from './Formpage';

const Homepage = ({returned_info, setDisplay}) => {
    const handleClick = () => {
        console.log('Icon clicked!');
        // Add your click handler logic here
      };

    const handleAddMedicine = async(e) => {
        setDisplay("formpage");
    };
    return (
        <div className="App">
            <div>
            <IconButton
                onClick={handleClick}
                sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                fontSize: 70,
                }}
            >
                <MenuIcon sx={{fontSize: 38}}/>
            </IconButton>
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

            <IconButton 
            onClick={handleAddMedicine}
                    sx={{
                    fontSize: 20}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',  // Centers horizontally
                            alignItems: 'center',      // Centers vertically
                            height: '100vh',           // Full viewport height
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