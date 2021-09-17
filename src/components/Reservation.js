import React, { useState } from "react";
//import AuthService from "../services/auth.service";
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import ReservationsService from "../services/reservations.service";
import AuthService from "../services/auth.service";


const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(3),
    display:"flex",
    justifyContent:"center"
  },
  childBox: {
    width: '50%',
    "@media (max-width: 48rem)": {
      width: '100%',
    },
  },
  input: {
    width: '50%',
    height: '2rem',
  },
  title: {
    marginBottom: '2rem',
  },
  alert: {
    marginTop: theme.spacing(1),
  },
}));

const Reservation = () => {
    const currentUser = AuthService.getCurrentUser();
    const days = 2;

    const initalizeExpiredDate = (date) => {
        const current = new Date(date);
        current.setDate(current.getDate() + days);
        return current;
    } 

    
    //const classes = useStyles();
    //const currentUser = AuthService.getCurrentUser();
    const [date, setChangeDate] = useState(new Date());
    //const [addedDays, setAddedDays] = useState((new Date().getDate() + 2).toString());
    ///const [addedDate, setAddedDate] = useState((new Date().setDate(new Date().getDate() + days)).toDateString());
    //const [expiredDate, setExpiredDate] = useState((new Date(date)).setDate((new Date(date)).getDate() + 2));
    //const [expiredDate, setExpiredDate] = useState(new Date(date));
    const [expiredDate, setExpiredDate] = useState(initalizeExpiredDate(date));
    const [currentDay, setCurrentDay] = useState(new Date().getDate().toString());
    const [currentMonth, setCurrentMonth] = useState((new Date().getMonth()).toString());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());

    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onDateChange = date => {
        setChangeDate(date);
        setCurrentDay((date.getDate()).toString());
        setCurrentMonth((date.getMonth()).toString());
        setCurrentYear(date.getFullYear().toString());
        //setAddedDays((date.getDate() + 2).toString());
        const current = new Date(date);
        current.setDate(current.getDate() + days);
        //console.log("EXPIRED DATE" + current.toDateString());
        setExpiredDate(current.toDateString());
        
        //const current = new Date();
        //current.setDate(current.getDate() + 2);
        //console.log("to" + current.toDateString());

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

    
        ReservationsService.createReservation(currentUser.id, date.toString(), expiredDate.toString()).then(
            (response) => {
                setLoading(false);
                setMessage(response.data.message);
                setSuccessful(true);
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
            <p>{date.toString()}</p>
            
            <h2>You choose date:</h2>
            <p>{currentDay}</p>
            <p>{getMonthName(currentMonth)}</p>
            <p>{currentYear}</p>
            <p>ADDED DATE</p>
            <p>{date.toString()}</p>
            <p>{expiredDate.toString()}</p>
            <Button onClick={handleMakeReservation}>Make reservation</Button>
        </Box>
    );
};

export default Reservation;