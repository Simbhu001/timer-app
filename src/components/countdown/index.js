import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { boxStyle, containerBox, gridColumn, gridContainer } from './style';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export default function CountDown() {

    const initialTimer = {
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0'
    }

    const [timer, setTimer] = useState(initialTimer)
    const [pause, setPause] = useState(null);
    const [resume, setResume] = useState(null);
    const [countInterval, setCountInterval] = useState();


    const countdownTimer = () => {
        const eventDate = new Date("mar 30,2023").getTime();
        let interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate - now;
            const findDay = Math.floor(distance / (24 * 60 * 60 * 1000));
            const findHour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
            const findMin = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
            const findSec = Math.floor((distance % (60 * 1000)) / 1000);
            if (distance < 0) {
                clearInterval(interval);
            } else {
                setPause(interval);
                setResume(interval)
                setCountInterval(interval)
                setTimer({ days: findDay, hours: findHour, minutes: findMin, seconds: findSec })
            }
        }, 1000)
    }

    const pauseTimer = () => {
        clearInterval(pause)
    }
    const stopTimer = () => {
        setResume(null)
        setTimer(initialTimer);
        clearInterval(countInterval);
    }
    const resumeTimer = () => {
        if (resume) {
            countdownTimer();
        }
    };

    return (
        <Grid container
            bgcolor={'#6c7a89'}
            sx={gridContainer}
        >
            <Grid item xs={1} lg={2}></Grid>
            <Grid item xs={10} lg={8} sx={gridColumn}
            >
                <Typography
                    variant='h4'
                    color={'#f22613'}
                    textAlign='center'
                    fontFamily={'fantasy'}
                    letterSpacing='3px' >COUNTDOWN TIMER APP
                </Typography>
                <Box sx={containerBox} >
                    <Box sx={boxStyle} >
                        <Typography variant='h4'>
                            {timer.days <= 9 ? ('0' + timer.days) : timer.days}
                        </Typography>
                        <Typography variant='p' >Days</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: '900' }} >:</Typography>
                    <Box sx={boxStyle}>
                        <Typography variant='h4' >
                            {timer.hours <= 9 ? ('0' + timer.hours) : timer.hours}
                        </Typography>
                        <Typography variant='p' >Hours</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: '900' }} >:</Typography>
                    <Box sx={boxStyle}>
                        <Typography variant='h4' >
                            {timer.minutes <= 9 ? ('0' + timer.minutes) : timer.minutes}
                        </Typography>
                        <Typography variant='p' >Minutes</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: '900' }} >:</Typography>
                    <Box sx={boxStyle}>
                        <Typography variant='h4' >
                            {timer.seconds <= 9 ? ('0' + timer.seconds) : timer.seconds}
                        </Typography>
                        <Typography variant='p' >Seconds</Typography>
                    </Box>
                </Box>
                <Box mt={1} sx={{
                    display: 'flex',
                    gap: '1%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                    <Button startIcon={<PlayArrowIcon />} variant='contained' onClick={countdownTimer} >start</Button>
                    <Button startIcon={<StopCircleIcon />} variant='contained' onClick={stopTimer} >STOP</Button>
                    <Button startIcon={<PauseIcon />} variant='contained' onClick={pauseTimer} >Pause</Button>
                    <Button startIcon={<PlayCircleFilledIcon />} variant='contained' onClick={resumeTimer} >Resume</Button>{''}
                </Box>
            </Grid>
            <Grid item xs={1} lg={2}></Grid>
        </Grid >
    )
}
