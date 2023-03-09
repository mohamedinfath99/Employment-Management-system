import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardActions';

const Details = () => {
    return (
        <div className='container mt-3'>
            <h1 style={{ fontWeight: 400 }}>Wel Come Mohamed Infath</h1>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className='left_view'>
                        <h3 className='mt-3'>Name: <span style={{ fontWeight: 400 }}>Mohamed Infath</span> </h3>
                        <h3 className='mt-3'>Age: <span style={{ fontWeight: 400 }}>23</span></h3>

                    </div>

                    <div className='right_view'>
                        <h3 className='mt-3'>email: <span style={{ fontWeight: 400 }}>mohamedinfath99@gmail.com</span> </h3>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details
