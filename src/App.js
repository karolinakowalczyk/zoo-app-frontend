import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { createTheme, Button, Popper, ThemeProvider, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemText, Box, IconButton, AppBar } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from "@material-ui/core/styles";
import penguin from './assets/images/penguin.png';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/HomePage/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdminPage/BoardAdmin";
import OpeningHours from "./components/OpeningHours";
import Attractions from "./components/Attractions";
import RequestResetPassword from "./components/RequestResetPassword";
import ResetPassword from "./components/ResetPassword";
import Reservation from "./components/Reservation";
import LoginRequired from "./components/LoginRequired";
import ReservationsList from "./components/ReservationsList";
import PlanTrip from "./components/PlanTrip";
import PlansList from "./components/PlansList";
import RenderMap from "./components/RenderMap";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute"
import AuthenticatedRoute from "./components/AuthenticatedRoute"
import AuthenticatedRouteWithProps from "./components/AuthenticatedRouteWithProps"
import AuthenticatedAdminRoute from "./components/AuthenticatedAdminRoute"
import NotFound from "./components/NotFound"

const theme = createTheme({
  palette: {
    primary: {
      main: '#81B214'
    }
  }
})

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 350
  },
  popper: {
    backgroundColor: '#777777',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  popperLink: {
    color: '#FFF',
    textDecoration: 'none',
    '&:hover': {
      color: '#81B214',
    },
  }
}));

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showSiteBar, setShowSiteBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ , setAppReservation] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(window.localStorage.getItem('user')));
  const classes = useStyles();

  const changeReservation = (value) => {
    setAppReservation(value);
  }

  useEffect(() => {

    const onLoad = async () => {
      const user = await AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        setIsAuthenticated(true);
      }
      else {
        setIsAuthenticated(false);
      }
    }
    onLoad();
 
  }, [isAuthenticated]);


  const logOut = () => {
    AuthService.logout();
  };

  const mobileLogOut = () => {
    AuthService.logout();
    setShowSiteBar(false);
  }

  const handleVisitZooButton = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleVisitZooMobileButton = (event) => {
    setMobileOpen(!mobileOpen);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" className="app-bar-class" elevation={0}>
        <Toolbar>
          <Box display='flex' flexGrow={0.9}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            className="menu-btn"
            onClick={() => setShowSiteBar(!showSiteBar)}
          >
            <MenuIcon className="menu-icon"/>
          </IconButton>
          <Typography>
            <Link to={"/"} className="logo-link">
              Z
              <img src={penguin} alt="penguin_icon" />
              <img src={penguin} alt="penguin_icon" />
            </Link>
          </Typography>
          </Box>
          <Drawer
            variant="persistent"
            anchor="left"
            open={showSiteBar}
            classes={{ paper: classes.paper }}
          >
            <div>
              <IconButton onClick={() => setShowSiteBar(false)}>
                <ChevronLeftIcon className="back-icon"/>
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem>
                <Link to={"/"}  className="item-link" onClick={() => setShowSiteBar(false)}>
                  <ListItemText>
                    <span className="item-text">Main Site</span>
                  </ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={"/home"} className="item-link" onClick={() => setShowSiteBar(false)}>
                  <ListItemText>
                    <span className="item-text">Home</span>
                  </ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                  <Link to={"/help-animals"} className="item-link" onClick={() => setShowSiteBar(false)}>
                    <ListItemText>
                      <span className="item-text">How to help animals?</span>
                    </ListItemText>
                  </Link>
              </ListItem>
              {showAdminBoard && (
                <ListItem>
                  <Link to={"/admin"} className="item-link" onClick={() => setShowSiteBar(false)}>
                    <ListItemText>
                      <span className="item-text">Admin Board</span>
                    </ListItemText>
                  </Link>
                </ListItem>
              )}
              {currentUser && (
                <ListItem>
                  <Link to={"/user"} className="item-link" onClick={() => setShowSiteBar(false)}>
                    <ListItemText>
                      <span className="item-text">User</span>
                    </ListItemText>
                  </Link>
                </ListItem>
              )}
              {currentUser ? (
                  <div>
                  <ListItem>
                    <Link to={"/profile"} className="item-link" onClick={() => setShowSiteBar(false)}>
                      <ListItemText>
                        <span className="item-text">{currentUser.username}</span>
                      </ListItemText>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <a href="/login" className="item-link" onClick={mobileLogOut}>
                      <ListItemText>
                        <span className="item-text">Log out</span>
                      </ListItemText>
                    </a>
                  </ListItem>
                </div>
              ) : (
                <div>
                  <ListItem>
                    <Link to={"/login"} className="item-link" onClick={() => setShowSiteBar(false)}> 
                      <ListItemText>
                        <span className="item-text">Login</span>
                      </ListItemText>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to={"/register"} className="item-link" onClick={() => setShowSiteBar(false)}>
                      <ListItemText>
                        <span className="item-text">Sign up</span>
                      </ListItemText>
                    </Link>
                  </ListItem>
                </div>
              )}
              <ListItem button className="item-link" onClick={handleVisitZooMobileButton}>
                  <ListItemText>
                    <span className="item-text">Visit Zoo</span>
                  </ListItemText>
                  {mobileOpen ? <ExpandLess className="arrow"/> : <ExpandMore className="arrow" />}
                  </ListItem>
                    {mobileOpen && (
                      <List component="div" disablePadding>
                        <ListItem>
                          <Link to={"/opening-hours"} className="item-link" onClick={() => setShowSiteBar(false)}>
                            <ListItemText>
                              <span className="item-text nested-text">Opening hours</span>
                            </ListItemText>
                          </Link>
                        </ListItem>
                      {currentUser ? (
                        <div>
                          <ListItem>
                            <Link to={"/reservation"} className="item-link" onClick={() => setShowSiteBar(false)}>
                              <ListItemText>
                                <span className="item-text nested-text">Make Reservation</span>
                              </ListItemText>
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link to={"/reservations-list"} className="item-link" onClick={() => setShowSiteBar(false)}>
                              <ListItemText>
                                <span className="item-text nested-text">Your reservations</span>
                              </ListItemText>
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link to={"/plan-trip"} className="item-link" onClick={() => setShowSiteBar(false)}>
                              <ListItemText>
                                <span className="item-text nested-text">Plan your trip</span>
                              </ListItemText>
                            </Link>
                      </ListItem>
                      <ListItem>
                            <Link to={"/plans-list"} className="item-link" onClick={() => setShowSiteBar(false)}>
                              <ListItemText>
                                <span className="item-text nested-text">Your Trip Plans</span>
                              </ListItemText>
                            </Link>
                      </ListItem>
                    </div>
                  ) : (
                      <div>
                        <ListItem>
                            <Link to={"/attractions"} className="item-link" onClick={() => setShowSiteBar(false)}>
                              <ListItemText>
                                <span className="item-text nested-text">Attracions</span>
                              </ListItemText>
                            </Link>
                        </ListItem>
                        <ListItem>
                          <Link to={"/login-required"} className="item-link" onClick={() => setShowSiteBar(false)}>
                            <ListItemText>
                              <span className="item-text nested-text">Make Reservation</span>
                            </ListItemText>
                          </Link>
                        </ListItem>
                      </div>
                      )}
                      </List> 
                  )}
              </List>
          </Drawer>
          
          <Typography className="typography-links">
            <Link to={"/"} className="nav-link">
              MAIN SITE
            </Link>
          </Typography>
            
          <Typography className="typography-links">
            <Link to={"/home"} className="nav-link">
              HOME
            </Link>
          </Typography>
          <Typography className="typography-links">
            <Link to={"/help-animals"} className="nav-link">
              HOW TO HELP ANIMALS?
            </Link>
          </Typography>

          {showAdminBoard && (
            <Typography className="typography-links">
              <Link to={"/admin"} className="nav-link">
                ADMIN BOARD
              </Link>
            </Typography>
          )}

          {currentUser && (
            <Typography className="typography-links">
              <Link to={"/user"} className="nav-link">
                USER
              </Link>
            </Typography>
          )}

          {currentUser ? (
            <Toolbar className="typography-links">
              <Typography>
                <Link to={"/profile"} className="nav-link dependent-link" style={{ textTransform: 'uppercase'}}>
                  {currentUser.username}
                </Link>
              </Typography>
              <Typography>
                <a href="/login" className="nav-link" onClick={logOut}>
                  LOG OUT
                </a>
              </Typography>
            </Toolbar>
          ) : (
            <Toolbar className="typography-links">
              <Typography>
                <Link to={"/login"} className="nav-link dependent-link"> 
                  LOGIN
                </Link>
              </Typography>
              <Typography>
                <Link to={"/register"} className="nav-link">
                  SIGN UP
                </Link>
              </Typography>
            </Toolbar>
          )}
          <Typography className="typography-links">
            <Button  aria-describedby={id} type="button" onClick={handleVisitZooButton}>
              VISIT ZOO
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} style={{zIndex: "1101"}}>
              <List component="div" className={classes.popper}>
                <ListItem>
                  <Link to={"/opening-hours"} className={classes.popperLink} onClick={() => setAnchorEl(null)}>
                  <ListItemText>
                    Opening hours
                  </ListItemText>
                  </Link>
                </ListItem>
                {currentUser ? (
                  <div>
                    <ListItem>
                      <Link to={"/reservation"} className={classes.popperLink} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Make Reservation
                      </ListItemText>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"/reservations-list"} className={classes.popperLink} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Your reservations
                      </ListItemText>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"/plan-trip"} className={classes.popperLink} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Plan Your Trip
                      </ListItemText>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"/plans-list"} className={classes.popperLink} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Your Trip Plans
                      </ListItemText>
                      </Link>
                    </ListItem>
                  </div>
                ) : (
                    <div>
                      <ListItem>
                        <Link to={"/attractions"} className={classes.popperLink} onClick={() => setAnchorEl(null)}>
                        <ListItemText>
                          Attractions
                        </ListItemText>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={"/login-required"} className={classes.popperLink} onClick={() => setAnchorEl(null)}>
                        <ListItemText>
                          Make Reservation
                        </ListItemText>
                        </Link>
                      </ListItem>
                    </div>
                  )}
              </List>
            </Popper>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className="main-container">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/opening-hours" component={OpeningHours} />
          <Route exact path="/attractions" component={Attractions}></Route>
          <Route exact path="/help-animals" component={RenderMap}></Route>

          <UnauthenticatedRoute
            path="/login"
            component={Login}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/register"
            component={Register}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/request-reset-password"
            component={RequestResetPassword}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/reset-password/:hash"
            component={ResetPassword}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/login-required"
            component={LoginRequired}
            appProps={{ isAuthenticated }}
          />   


          <AuthenticatedRoute
            path="/profile"
            component={Profile}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/user"
            component={BoardUser}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRouteWithProps
            path="/reservation"
            element={Reservation}
            appProps={{ isAuthenticated, changeReservation }}
          />
          <AuthenticatedRoute
            path="/reservations-list"
            component={ReservationsList}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/plan-trip"
            component={PlanTrip}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/plans-list"
            component={PlansList}
            appProps={{ isAuthenticated }}
          />

          <AuthenticatedAdminRoute
            path="/admin"
            component={BoardAdmin}
            appProps={{ isAuthenticated }}
          />

          <Route component={NotFound} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
};

export default App;