import React, { useState, useEffect } from "react";
import PlansService from "../services/plans.service";
import AuthService from "../services/auth.service";
import { Alert, Card, CardContent, Typography, List, ListItem, ListItemText, TextField, InputAdornment, Box, Button, Grid } from '@mui/material/';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import createUUID from "../helpers/createUUID";
import SearchIcon from '@mui/icons-material/Search';
import convertMinsToTime from "../helpers/convertMinsToTime";
import getMonthName from "../helpers/getMonthName";
import CloseIcon from '@mui/icons-material/Close';


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
    console.log(newValue);
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
  const clearReservationFilters = () => {
    setDateValue([null, null]);
    setSearch({
      searchFun: items => {
        return items;
        }
    })
  }

  const handeSearchLongTransport = (e) => {
    const currentValue = e.target.value;
    setSearch({
      searchFun: items => {
        if (currentValue === "") {
          return items;
        }
        else {
          return items.filter(x => x.transport.longTransport.toLowerCase().includes(currentValue));
        }
      }
    })
  }

  const handeSearchShortTransport = (e) => {
    const currentValue = e.target.value;
    setSearch({
      searchFun: items => {
        if (currentValue === "") {
          return items;
        }
        else {
          console.log(items.filter(x => x.transport.shortTransport.toLowerCase().includes(currentValue)));
          return items.filter(x => x.transport.shortTransport.toLowerCase().includes(currentValue));
        }
      }
    })
  }

  const handeSearchAttractions = (e) => {
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
              if (attr[j].name.toLowerCase().includes(currentValue)){
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
    <div>
      {!successful && (
        <div>
            <Alert severity="error" >{message}</Alert>
        </div>
       )}
     <Typography variant="h2">
        Your Trip Plans
      </Typography>
      
        <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{mb: '2rem'}}>
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
              <Button onClick={clearReservationFilters} sx={{ border: '1px solid', borderColor: 'secondary.light', m: '1rem'}}>
              <CloseIcon/>
        </Button>
        <TextField
        id="search-long-transport"
        label="Search plan with long transport type"
        variant="outlined"
          onChange={handeSearchLongTransport}
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
        onChange={handeSearchShortTransport}
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
        onChange={handeSearchAttractions}
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
              <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Plan {reservationDay} {getMonthName(reservationMonth)} {reservationYear}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Reservation
                  </Typography>
                  <List>
                    <ListItem key={createUUID(plan.reservation['date'])}>
                      <ListItemText >
                        Date: {plan.reservation['date']}
                      </ListItemText>
                    </ListItem>
                    <ListItem key={createUUID(plan.reservation['expirationDate'])}>
                      <ListItemText>
                        Expiration date: {plan.reservation['expirationDate']}
                      </ListItemText>
                    </ListItem>
                  </List>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Transport
                  </Typography>
                  <List>
                    {plan.transport['shortTransport'] && <ListItem key={createUUID(plan.transport['shortTransport'])}>
                      <ListItemText >
                        {plan.transport['shortTransport']}
                      </ListItemText>
                    </ListItem>}
                    {plan.transport['longTransport'] && <ListItem key={createUUID(plan.transport['longTransport'])}>
                      <ListItemText>
                        {plan.transport['longTransport']}
                      </ListItemText>
                    </ListItem>}
                  </List>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Attractions
                  </Typography>
                  {Object.keys(plan.attractions).map((key, index) => (
                    <List key={key} sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
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
    </div>
  );
};

export default PlanList;