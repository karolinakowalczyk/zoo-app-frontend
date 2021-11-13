import React, { useState, useEffect } from "react";
import PlansService from "../services/plans.service";
import AuthService from "../services/auth.service";
import { Alert, Card, CardContent, Typography, List, ListItem, ListItemText, TextField, InputAdornment, Box, Button, Grid, Container } from '@mui/material/';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import createUUID from "../helpers/createUUID";
import SearchIcon from '@mui/icons-material/Search';
import convertMinsToTime from "../helpers/convertMinsToTime";
import getMonthName from "../helpers/getMonthName";
import CloseIcon from '@mui/icons-material/Close';
import displayDate from "../helpers/displayDate";
import useInfoStyles from "../styles/useInfoStyles";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CommuteIcon from '@mui/icons-material/Commute';
import AttractionsIcon from '@mui/icons-material/Attractions';

const searchPlans = (array) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

const PlanList = () => {
  const [plansData, setPlansData] = useState([]);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const [search, setSearch] = useState({ searchFun: items => { return items; } });
  const [dateValue, setDateValue] = useState([null, null]);
  const [longTransport, setLongTransport] = useState("");
  const [shortTransport, setShortTransport] = useState("");
  const [attractions, setAttractions] = useState("");

  const classes = useInfoStyles();

    useEffect(() => {
    PlansService.getUserPlans(currentUser.id).then(
      (response) => {
        setPlansData(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage);
          setSuccessful(false); 
      }
    );
    }, [currentUser.id]);
  
  const handeSearchReservations = (newValue) => {
    setLongTransport("");
    setShortTransport("");
    setAttractions("");
    setSearch({
      searchFun: items => {
        if (newValue[0] === null || newValue[1] === null) {
          return items;
        }

        else if (items.filter(x => (new Date(newValue[0]) <= new Date(x.reservation.date)) && (new Date(newValue[1]) >= new Date(x.reservation.date))).length > 0) {
          return items.filter(x => (new Date(newValue[0]) <= new Date(x.reservation.date)) && (new Date(newValue[1]) >= new Date(x.reservation.date)));
        }
        else {
          return [];
        }
        }
    })
  }
  const clearFilters = () => {
    setDateValue([null, null]);
    setLongTransport('');
    setShortTransport('');
    setAttractions('');
    setSearch({
      searchFun: items => {
        return items;
        }
    })
  }

  const handeSearchLongTransport = (e) => {
    setDateValue([null, null]);
    setShortTransport("");
    setAttractions("");
    const currentValue = e.target.value;
    setSearch({
      searchFun: items => {
        if (currentValue === "") {
          return items;
        }
        else {
          return items.filter(x => x.transport.longTransport.toString().toLowerCase().includes(currentValue.toString().toLowerCase()));
        }
      }
    })
  }

  const handeSearchShortTransport = (e) => {
    setDateValue([null, null]);
    setLongTransport("");
    setAttractions("");
    const currentValue = e.target.value;
    setSearch({
      searchFun: items => {
        if (currentValue === "") {
          return items;
        }
        else {
          return items.filter(x => x.transport.shortTransport.toString().toLowerCase().includes(currentValue.toString().toLowerCase()));
        }
      }
    })
  }

  const handeSearchAttractions = (e) => {
    setDateValue([null, null]);
    setLongTransport("");
    setShortTransport("");
    
    const currentValue = e.target.value;
    setSearch({
      searchFun: items => {
        if (currentValue === "") {
          return items;
        }
        else {        
          let filtered = [];
          for(let i = 0; i < items.length; i++){

            var obj = items[i];
            let attr = obj.attractions;
            for (let j = 0; j < attr.length; j++){
              if (attr[j].name.toString().toLowerCase().includes(currentValue.toString().toLowerCase())){
                filtered.push(items[i]);
              }
            }
          }
          return filtered;
        }
      }
    })
  }

  return (
    <Container maxWidth="xl">
      {!successful && (
        <div>
            <Alert severity="error" >{message}</Alert>
        </div>
       )}
     <h1 className={classes.greyTitle}>Your trip plans</h1>     
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: '2rem' }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Start date"
            endText="End date"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
              handeSearchReservations(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} sx={{ ml: 2}}/>
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} sx={{ mr: 2}} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <TextField
          id="search-long-transport"
          label="Search plan with long transport type"
          variant="outlined"
          value={longTransport}
          onChange={(newValue) => {
            setLongTransport(newValue.target.value);
            handeSearchLongTransport(newValue);
          }}
          sx={{
              m: '1rem'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
        }}
        />
        <TextField
          id="search-short-transport"
          label="Search plan with short transport type"
          variant="outlined"
          value={shortTransport}
          onChange={(newValue) => {
              setShortTransport(newValue.target.value);
              handeSearchShortTransport(newValue);
          }}
          sx={{
              m: '1rem'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="search-attractions"
          label="Search Attractions by name"
          variant="outlined"
          value={attractions}
          onChange={(newValue) => {
              setAttractions(newValue.target.value);
              handeSearchAttractions(newValue);
            }}
          sx={{
              m: '1rem'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
        }}
        />
        <Button onClick={clearFilters} sx={{ border: '1px solid', borderColor: 'secondary.light', m: '1rem', height: '3.5rem'}}>
            <CloseIcon/>
        </Button>
        
      </Grid>
      {plansData.length > 0 ? 
        <div>
          {searchPlans(search.searchFun(plansData))
            .map((plan, index) => {
              let reservationDate = new Date(plan.reservation['date']);
              let reservationDay = reservationDate.getDate().toString();
              let reservationMonth = reservationDate.getMonth().toString();
              let reservationYear = reservationDate.getFullYear().toString();
          return (
              <Card key={index} sx={{my: '2rem', p: '2rem'}} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Plan {reservationDay} {getMonthName(reservationMonth)} {reservationYear}
                </Typography>
                <div style={{ display: 'flex', margin: '1.5rem 0'}}>
                  <CalendarTodayIcon sx={{ color: 'secondary.main'}}/>
                  <Typography sx={{ color: 'secondary.main', ml: 1.5, display: 'inline-block', fontSize: '1.25rem'}} color="text.secondary">
                  Reservation: {plan.reservation.name}
                  </Typography>
                </div>
                <List sx={{m: 0, p: 0}}>
                    <ListItem key={createUUID(plan.reservation.date)}>
                      <ListItemText >
                        <span style={{fontWeight: 'bold'}}>Date: </span> {displayDate.dateDay(plan.reservation.date)} {displayDate.dateMonth(plan.reservation.date)} {displayDate.dateYear(plan.reservation.date) }
                      </ListItemText>
                    </ListItem>
                    <ListItem key={createUUID(plan.reservation.expirationDate)}>
                      <ListItemText>
                        <span style={{fontWeight: 'bold'}}>Expiration date: </span> {displayDate.dateDay(plan.reservation.expirationDate)} {displayDate.dateMonth(plan.reservation.expirationDate)} {displayDate.dateYear(plan.reservation.expirationDate) }
                      </ListItemText>
                    </ListItem>
                </List>
                <div style={{ display: 'flex', margin: '1.5rem 0'}}>
                  <CommuteIcon sx={{ color: 'secondary.main'}}/>
                  <Typography sx={{ color: 'secondary.main', ml: 1.5, display: 'inline-block', fontSize: '1.25rem'}} color="text.secondary">
                    Transport
                  </Typography>
                </div>
                  <List sx={{m: 0, p: 0}}>
                    {plan.transport.shortTransport && <ListItem key={createUUID(plan.transport.shortTransport)}>
                      <ListItemText >
                        {plan.transport.shortTransport}
                      </ListItemText>
                    </ListItem>}
                    {plan.transport.longTransport && <ListItem key={createUUID(plan.transport.longTransport)}>
                      <ListItemText>
                        {plan.transport.longTransport}
                      </ListItemText>
                    </ListItem>}
                  </List>
                  <div style={{ display: 'flex', margin: '1.5rem 0'}}>
                  <AttractionsIcon sx={{ color: 'secondary.main'}}/>
                  <Typography sx={{ color: 'secondary.main', ml: 1.5, display: 'inline-block', fontSize: '1.25rem'}} color="text.secondary">
                    Attractions
                  </Typography>
                </div>
                  {Object.keys(plan.attractions).map((key, index) => (
                    <List
                      key={key}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        m: 0,
                        p: 0,
                        "@media (max-width: 24rem)": {
                          flexDirection: "column",
                        },
                      }}>
                      <ListItem key={createUUID(plan.attractions[key].name)}>
                        <ListItemText>
                          {plan.attractions[key].name}
                        </ListItemText>
                      </ListItem>
                      <ListItem key={createUUID(plan.attractions[key].hour)}>
                        <ListItemText>
                          Start time: {convertMinsToTime(plan.attractions[key].hour)}
                        </ListItemText>
                      </ListItem>
                      <ListItem key={createUUID(plan.attractions[key].duration)}>
                        <ListItemText>
                          Duration: {plan.attractions[key].duration} minutes
                        </ListItemText>
                      </ListItem>
                    </List>
                  ))}
                </CardContent>
              </Card>
            );
          })}
      
        </div>  
        : <Alert severity="info" >You haven't made your plans yet</Alert>
}
    </Container>
  );
};

export default PlanList;