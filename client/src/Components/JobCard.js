import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


export default function JobCard({ jobSingle, onClick }) {

    return (
        <Paper onClick={onClick} className={'job'}>
            <div>
                <Typography variant='h5'>{jobSingle.title}</Typography>
                <Typography variant='h6'>{jobSingle.company}</Typography>
                <Typography>{jobSingle.location}</Typography>
            </div>
            <div>
                <Typography>{jobSingle.created_at.split(' ').slice(0, 3).join(' ')}</Typography>
            </div>
        </Paper>
    )
}