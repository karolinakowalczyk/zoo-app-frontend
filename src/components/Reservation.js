import React, { useState } from "react";
//import AuthService from "../services/auth.service";
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";


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
    //const classes = useStyles();
    //const currentUser = AuthService.getCurrentUser();
    const [date, setDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(new Date().getDate().toString());
    const [currentMonth, setCurrentMonth] = useState((new Date().getMonth()).toString());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());

    const onDateChange = date => {
        setDate(date);
        setCurrentDay((date.getDate()).toString());
        setCurrentMonth((date.getMonth()).toString());
        setCurrentYear(date.getFullYear().toString());
        /*if (new Date().getDate().toString() < (date.getDate()).toString()) {
            console.log("inny dzień");
        }
        else {
            console.log("ten sam dzień");
        }*/
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
            <Button>Make reservation</Button>
        </Box>
    );
};

export default Reservation;