import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CardActions, Typography, Box, IconButton, Modal } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditForm from './EditForm';
import dayjs from 'dayjs';

const getCurrentDay = () => {
    const date = new Date();
    const currentDate = dayjs(date).format('MM/DD/YY');
    return currentDate
}

const MedicationCard = ({addedMedications, setAddedMedications, userId, setDisplay, setUpdatedCard, currentMed, setCurrentMed}) => {
    const [showInfoCard, setShowInfoCard] = useState(false);
    const [selectedMed, setSelectedMed] = useState();
    const [currentDay, setCurrentDay] = useState(getCurrentDay())

    const handleInfoClick = (med) => {
        setSelectedMed(med)
        console.log(med)
        setShowInfoCard(true)
    }

    const handleEditClick = (med) => {
        setCurrentMed(med)
        console.log(med)
        setDisplay("editform")
    }

    const closeInfoModal = () => {
        setShowInfoCard(false)
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {addedMedications.map((med, index) => (
                <div
                key={index}
                style={
                    index === addedMedications.length - 1 && index % 2 === 0
                        ? {
                              flex: '100%', // Full width for the last odd item
                              marginLeft: '0', // No margin adjustments for full width
                              marginRight: '0',
                              marginBottom: '0px',
                              display: 'flex',
                              justifyContent: 'flex-end', // Align to the end for the last odd item
                          }
                        : {
                              flex: '1 1 calc(50% - 20px)', // Adjust width of each item
                              marginLeft: index % 2 === 0 ? '0' : '10px', // Add space to the left of odd items
                              marginRight: index % 2 === 0 ? '10px' : '0', // Add space to the right of even items
                              marginBottom: '10px',
                              display: 'flex',
                              justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end', // Align based on index
                          }
                }
                >
                    <Card style={{ width: '100%', position: 'relative' }}>
                        <CardActions style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Tooltip title="Edit medication">
                                <IconButton onClick={() => handleEditClick(med)}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                        <CardActions style={{ position: 'absolute', top: '0', right: '0', padding: '8px' }}>
                            <Tooltip title="Medication Info">
                                <IconButton onClick={() => handleInfoClick(med)}>
                                    <InfoOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                        <CardContent>
                            <Typography variant="h5" component="div" color="text.primary" fontWeight='bold' sx={{ textTransform: 'capitalize' }}>
                                {med.medication_name}
                            </Typography>
                            <Typography sx={{
                                    color: med.importance === 2 ? 'red' :
                                        med.importance === 1 ? 'skyblue' : 'gray', 

                                    fontWeight: med.importance === 2 ? '900' :
                                        med.importance === 1 ? '600' : '400',
                                    marginBottom: '20px'
                                    }}
                            >
                                {med.importance === 2 ? "Most Important" : (med.importance === 1 ? "Somewhat Important" : "Least Important")}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {med.dosage}mg with {med.amount} per day
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Quantity: {med.quantity - med.total_taken} out of {med.quantity} pills left
                            </Typography>
                            {
                                med.amount_today === 0 || med.amount_today === med.amount ? (
                                    <Typography sx={{ mb: 0.1 }} color="text.secondary">
                                        You have {med.amount - med.amount_today} pill(s) to take
                                    </Typography>
                                ) : (
                                    <Typography sx={{ mb: 0.1 }} color="text.secondary">
                                        You still have {med.amount - med.amount_today} pill(s) to take
                                    </Typography>
                                )
                            }
                            {
                                med.date === null && med.time === null ? (
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Last time and date taken hasn't been added
                                    </Typography>
                                ) : ( med.date === currentDay ) ? (
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Last Taken: Today @ {med.time}
                                    </Typography>
                                ) : (
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Last Taken: {med.date} @ {med.time}
                                    </Typography>
                                )
                            }
                        </CardContent>
                    </Card>
                </div>
            ))}

            {showInfoCard && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    />
                    <Modal
                        open={showInfoCard}
                        onClose={closeInfoModal}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Card sx={{ width: '50%', padding: '20px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <Typography variant="h5" component="div" color="text.primary" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                                    {selectedMed.medication_name}
                                </Typography>
                                <Typography sx={{ alignSelf: 'flex-start', fontSize: '16px', color: 'text.secondary' }}>
                                    Notes: {selectedMed.notes}
                                </Typography>
                            </Box>
                            <Typography sx={{ mb: 0.5 }} color="text.secondary">
                                Dosage: {selectedMed.dosage}mg
                            </Typography>
                            <Typography sx={{ mb: 0.5 }} color="text.secondary">
                                Quantity Left: {selectedMed.quantity - selectedMed.total_taken} pills
                            </Typography>
                            <Typography sx={{ mb: 0.5 }} color="text.secondary">
                                Amount Per Day: {selectedMed.amount} pills
                            </Typography>
                            <Typography sx={{ mb: 0.5 }} color="text.secondary">
                                Amount Remaining for Today: {selectedMed.amount - selectedMed.amount_today} pills
                            </Typography>
                            {
                                selectedMed.date === null && selectedMed.time === null ? (
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Last time and date taken hasn't been added
                                    </Typography>
                                ) : ( selectedMed.date === currentDay ) ? (
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Last Taken: Today @ {selectedMed.time}
                                    </Typography>
                                ) : (
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Last Taken: {selectedMed.date} @ {selectedMed.time}
                                    </Typography>
                                )
                            }
                            <Box sx={{
                                color: selectedMed.importance === 2 ? 'red' :
                                    selectedMed.importance === 1 ? 'skyblue' : 'gray'
                            }}>
                                Importance: {selectedMed.importance === 2 ? "Most Important" : (selectedMed.importance === 1 ? "Somewhat Important" : "Least Important")}
                            </Box>
                        </Card>
                    </Modal>
                </>
            )}

        </div>
    )
}

export default MedicationCard