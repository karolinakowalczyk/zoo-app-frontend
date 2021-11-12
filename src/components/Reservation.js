import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Alert, Grid, TextField,} from '@mui/material/';
import Calendar from 'react-calendar';
import ReservationsService from "../services/reservations.service";
import AuthService from "../services/auth.service";
import useInfoStyles from "../styles/useInfoStyles";
import useFormStyles from "../styles/useFormStyles";
import getMonthName from "../helpers/getMonthName";


const Reservation = (props) => {
    const infoclasses = useInfoStyles();
    const formclasses = useFormStyles();
    const currentUser = AuthService.getCurrentUser();
    const days = 2;

    const initalizeExpiredDate = (date) => {
        const current = new Date(date);
        current.setDate(current.getDate() + days);
        return current;
    } 
    const [name, setName] = useState('');
    const [date, setChangeDate] = useState(new Date());
    const [expiredDate, setExpiredDate] = useState(initalizeExpiredDate(date));
    const [currentDay, setCurrentDay] = useState(new Date().getDate().toString());
    const [currentMonth, setCurrentMonth] = useState((new Date().getMonth()).toString());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());

    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [currentReservation, setCurrentReservation] = useState([]);

    useEffect(() => {
        props.changeReservation(currentReservation);
    }, [currentReservation, props]);

    const increment = () => {
        setQuantity(quantity + 1);
    }
    const decrement = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
        
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onDateChange = date => {
        setChangeDate(date);
        setCurrentDay((date.getDate()).toString());
        setCurrentMonth((date.getMonth()).toString());
        setCurrentYear(date.getFullYear().toString());
        const current = new Date(date);
        current.setDate(current.getDate() + days);
        setExpiredDate(current.toString());
        
    }

    const handleMakeReservation = (e) => {
        e.preventDefault();

        if (!name) {
            setMessage("Type your reservation name!");
            return
        }
        setMessage("");
        setLoading(true);
        setSuccessful(false);
    
        ReservationsService.createReservation(currentUser.id, name, date.toString(), expiredDate.toString(), quantity).then(
            (response) => {
                setLoading(false);
                setMessage(response.data.message);
                setSuccessful(true);
                setCurrentReservation({
                    userId: currentUser.id,
                    name: name,
                    date: date.toString(),
                    expirationDate: expiredDate.toString()
                })
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
                setSuccessful(false);
            }
        );
  };

    return (
        <Box>
            <h1 className={infoclasses.greyTitle}>Make reservation</h1>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                sx={{mb: '2rem'}}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Grid
                    container
                        justifyContent="center"
                        sx={{mt: '0.25rem', mb: '2rem'}}
                    >
                    <Calendar
                        onChange={onDateChange}
                        value={date}
                        minDate={new Date()}
                    />
                </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                <div style={{ textAlign: 'center' }}>
                    <TextField
                        id="reservationName"
                        label="Your reservation name"
                        variant="outlined"
                        onChange={onNameChange}
                        value={name}
                    />
                    <h2>You choose date:</h2>
                    <p>{currentDay} {getMonthName(currentMonth)} {currentYear}</p>
                    <p>
                        Set the quantity
                    </p> 
                    <div>
                        <Button sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.white',
                            fontSize: '2rem',
                            borderRadius: '50%',
                                '&:hover': {
                                backgroundColor: 'primary.main',
                                },
                                marginRight: '0.5rem',
                                "@media (max-width: 24rem)": {
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                            },
                        }}
                        onClick={decrement}>
                            -
                        </Button>
                            <TextField value={quantity} disabled variant="outlined" sx={ { mt: '0.5rem'}}/>
                        <Button sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.white',
                            fontSize: '2rem',
                            borderRadius: '50%',
                                '&:hover': {
                            backgroundColor: 'primary.main',
                                },
                                marginLeft: '0.5rem',
                            "@media (max-width: 24rem)": {
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: '0.5rem'
                            },
                            }}
                            onClick={increment}>
                                
                            +
    
                        </Button>  
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <Button onClick={handleMakeReservation} className={formclasses.submit}>
                            {loading && (
                            <CircularProgress color="primary" />
                            )}
                            <span className={formclasses.buttonText}>Make reservation</span>
                        </Button>
                    </div>
                </div>
            </Grid> 
            </Grid>
            {message && successful && (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    >
                    <div className={formclasses.alert}>
                        <Alert severity="success" >{message}</Alert>
                    </div>
                </Grid>
            )}
            {message && !successful && (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    >
                    <div className={formclasses.alert}>
                        <Alert severity="error" >{message}</Alert>
                    </div>
                </Grid>
            )}
        </Box>
    );
};

export default Reservation;