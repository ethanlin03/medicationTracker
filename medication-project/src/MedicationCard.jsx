import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, CardActions, IconButton, Typography } from '@mui/material';

const MedicationCard = ({addedMedications, setAddedMedications}) => {
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
                        <EditIcon/>
                    </CardActions>
                    <CardActions style={{ position: 'absolute', top: '0', right: '0', padding: '8px' }}>
                        <InfoOutlinedIcon/>
                    </CardActions>
                    <CardContent>
                        <Typography variant="h5" component="div" color="text.primary" fontWeight='bold' sx={{ textTransform: 'capitalize' }}>
                            {med.medication_name}
                        </Typography>
                        <Box sx={{
                                color: med.importance === 2 ? 'red' :
                                    med.importance === 1 ? 'skyblue' : 'gray', 

                                marginBottom: '20px'
                                }}
                        >
                            {med.importance === 2 ? "Most Important" : (med.importance === 1 ? "Somewhat Important" : "Least Important")}
                        </Box>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {med.dosage}mg with {med.amount} per day
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Last Taken: {med.month}/{med.day}/{med.year}
                        </Typography>
                    </CardContent>
                </Card>
                </div>
            ))}
        </div>
    )
}

export default MedicationCard