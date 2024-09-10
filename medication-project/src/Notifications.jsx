import axios from "axios";
import { useState } from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const Notifications = ({addedMedications}) => {
    return (
        <div>
            {addedMedications.map((med) => (
                // Check if the medication's amount_taken_today is not today
                med.amount_today !== med.amount && (
                    <MenuItem key={med.id}>
                        <ListItemIcon>
                            <PriorityHighIcon/>
                        </ListItemIcon>
                        <ListItemText>{med.medication_name}: {med.amount - med.amount_today} pills remaining today</ListItemText>
                    </MenuItem>
                )
            ))}
        </div>
    )
}

export default Notifications