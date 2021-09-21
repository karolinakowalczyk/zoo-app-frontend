import React, { useState, useEffect } from "react";
//import AuthService from "../services/auth.service";
import { Box, Button, Link, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import ReservationsService from "../services/reservations.service";
import AuthService from "../services/auth.service";
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
    width: "101.25%",
    '&:hover': {
      background: "#777777",
    },
  },
  alert: {
    marginTop: theme.spacing(1),
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
        }
    }
  
}));

const Reservation = (props) => {
    const classes = useStyles();
    const currentUser = AuthService.getCurrentUser();
    const days = 2;

    const initalizeExpiredDate = (date) => {
        const current = new Date(date);
        current.setDate(current.getDate() + days);
        return current;
    } 

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

    const onDateChange = date => {
        setChangeDate(date);
        setCurrentDay((date.getDate()).toString());
        setCurrentMonth((date.getMonth()).toString());
        setCurrentYear(date.getFullYear().toString());
        const current = new Date(date);
        current.setDate(current.getDate() + days);
        setExpiredDate(current.toString());
        
    }

    const getMonthName = (month) => {
        switch (month) {
            case '0':
                return 'January'
            case '1':
                return 'February'
            case '2':
                return 'March'
            case '3':
                return 'April'
            case '4':
                return 'May'
            case '5':
                return 'June'
            case '6':
                return 'July'
            case '7':
                return 'August'
            case '8':
                return 'September'
            case '9':
                return 'October'
            case '10':
                return 'November'
            case '11':
                return 'December'
            default:
                return month + 1;
        }
    }
    const handleMakeReservation = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);
        setSuccessful(false);
    
        ReservationsService.createReservation(currentUser.id, date.toString(), expiredDate.toString(), quantity).then(
            (response) => {
                setLoading(false);
                setMessage(response.data.message);
                setSuccessful(true);
                setCurrentReservation({
                    userId: currentUser.id,
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
            <h2>reservations</h2>
            <Calendar
                onChange={onDateChange}
                value={date}
                minDate={new Date()}
            />
            <h2>You choose date:</h2>
            <p>{currentDay}</p>
            <p>{getMonthName(currentMonth)}</p>
            <p>{currentYear}</p>
            <div>
                <p>
                    Set the quantity
                </p>
                <div className="quantity-input">
                    <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
                    -
                    </button>
                    <input className="quantity-input__screen" type="text" value={quantity} readOnly />
                    <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
                    +
                    </button>  
                </div>  
            </div>
            <Button onClick={handleMakeReservation}>
                {loading && (
                  <CircularProgress color="primary" />
                )}
                <span className={classes.buttonText}>Make reservation</span>
            </Button>
            {message && successful && (
                <div className={classes.alert}>
                <Alert severity="success" >{message}</Alert>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    <Link className={classes.link} href={"/reservations-list"} variant="body2">
                    {"See your reservations"}
                    </Link>
                </Button>
                </div>
            )}
            {message && !successful && (
                <div className={classes.alert}>
                <Alert severity="error" >{message}</Alert>
                </div>
            )}
        </Box>
    );
};

export default Reservation;