import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service";

import { Link } from "react-router-dom";
import { Button, Popper, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemText, Box, IconButton, AppBar } from '@mui/material/';
import penguin from '../assets/images/penguin.png';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const AppTopBar = () => {

    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showSiteBar, setShowSiteBar] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(window.localStorage.getItem('user')));
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleVisitZooMobileButton = () => {
    setMobileOpen(!mobileOpen);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  
   
  return (
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
            className="paper"
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
                  {mobileOpen ? <ExpandLessIcon className="arrow"/> : <ExpandMoreIcon className="arrow" />}
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
                        <ListItem>
                          <Link to={"/tickets"} className="item-link" onClick={() => setShowSiteBar(false)}>
                            <ListItemText>
                              <span className="item-text nested-text">Tickets</span>
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
            <Button color="inherit" aria-describedby={id} onClick={handleVisitZooButton} sx={{ zIndex: '50000', color: 'primary.white' }}>
              VISIT ZOO
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} style={{zIndex: "1101"}}>
              <List component="div"
                sx={{ backgroundColor: 'secondary.main', marginTop: 1, padding: 1, }}
              >
                <ListItem>
                  <Link to={"/opening-hours"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
                  <ListItemText>
                    Opening hours
                  </ListItemText>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={"/tickets"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
                  <ListItemText>
                    Tickets
                  </ListItemText>
                  </Link>
                </ListItem>
                {currentUser ? (
                  <div>
                    <ListItem>
                      <Link to={"/reservation"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Make Reservation
                      </ListItemText>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"/reservations-list"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Your reservations
                      </ListItemText>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"/plan-trip"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Plan Your Trip
                      </ListItemText>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={"/plans-list"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
                      <ListItemText>
                        Your Trip Plans
                      </ListItemText>
                      </Link>
                    </ListItem>
                  </div>
                ) : (
                    <div>
                      <ListItem>
                        <Link to={"/attractions"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
                        <ListItemText>
                          Attractions
                        </ListItemText>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={"/login-required"} style={{ color: '#FFF', textDecoration: 'none' }} onClick={() => setAnchorEl(null)}>
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
  );
};

export default AppTopBar;