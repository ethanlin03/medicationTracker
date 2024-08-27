import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, IconButton, Typography } from '@mui/material';

const MedicationCard = ({addedMedications, setAddedMedications}) => {
    return (
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
                    Date Added: {med.month}/{med.day}/{med.year}
                    </CardContent>
                </Card>
                </div>
            ))}
        </div>
    )
}

export default MedicationCard