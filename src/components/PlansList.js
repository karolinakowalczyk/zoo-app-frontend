import React, { useState, useEffect } from "react";
import PlansService from "../services/plans.service";
import AuthService from "../services/auth.service";
import { Alert, Card, CardContent, Typography, List, ListItem, ListItemText, TextField, InputAdornment, Toolbar} from '@mui/material/';
import createUUID from "../helpers/createUUID";
import SearchIcon from '@mui/icons-material/Search';
import convertMinsToTime from "../helpers/convertMinsToTime";
//import getComparator from "../helpers/getComparator";
//import stableSort from "../helpers/stableSort";


const searchPlans = (array) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

const PlanList = () => {
  const [plansData, setPlansData] = useState([]);
  const [plansReservationData, setPlansReservationData] = useState([]);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const [search, setSearch] = useState({ searchFun: items => { return items; } })

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

  const displayPlans = plansData.map((plan, index) =>
  
     <Card sx={{ minWidth: 275 }} key={index}>
      <CardContent>
        <Typography variant="h5" component="div">
          Plan {index}
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
            <List key={key} sx={{ display: "flex", flexDirection: "row", padding: 0}}>
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
  const handeSearchReservations = (e) => {
    const currentValue = e.target.value;
    setSearch({
      searchFun: items => {
        if (currentValue === "") {
          return items;
        }
        else {
          return items.filter(x => x.reservation.date.toLowerCase().includes(currentValue));
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
      <Toolbar>
        <TextField
        id="search-reservations"
          label="Search Plan with Reservation by date"
          onChange={handeSearchReservations}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Toolbar>
      {plansData.length > 0 ? 
        <div>
          {searchPlans(search.searchFun(plansData))
          .map((plan, index) => {
          return (
              <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Plan {index}
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