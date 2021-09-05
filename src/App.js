import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { Container, createTheme, ThemeProvider, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemText, Box, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from "@material-ui/core/styles";
import penguin from './assets/images/penguin.png';

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import { AppBar } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: '#81B214'
    }
  }
})

const useStyles = makeStyles({
  paper: {
    width: 350
  }
});

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showSiteBar, setShowSiteBar] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const mobileLogOut = () => {
    AuthService.logout();
    setShowSiteBar(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" className="app-bar-class">
        <Toolbar>
          <Box display='flex' flexGrow={1}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className="menu-btn"
            onClick={() => setShowSiteBar(!showSiteBar)}
          >
            <MenuIcon className="menu-icon"/>
          </IconButton>
          <Typography>
            <Link to={"/"} className="logo-link">
              Z
              <img src={penguin} alt="angular_icon" />
              <img src={penguin} alt="angular_icon" />
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
                <ChevronLeftIcon/>
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem>
                <Link to={"/"}  className="item-link" onClick={() => setShowSiteBar(false)}>
                  <ListItemText secondary={"Main site"} />
                </Link>
              </ListItem>
              <ListItem>
                <Link to={"/home"} className="item-link" onClick={() => setShowSiteBar(false)}>
                  <ListItemText secondary={"Home"} />
                </Link>
              </ListItem>
              {showAdminBoard && (
                <ListItem>
                  <Link to={"/admin"} className="item-link" onClick={() => setShowSiteBar(false)}>
                    <ListItemText secondary={"Admin board"} />
                  </Link>
                </ListItem>
              )}
              {currentUser && (
                <ListItem>
                  <Link to={"/user"} className="item-link" onClick={() => setShowSiteBar(false)}>
                    <ListItemText secondary={"User"} />
                  </Link>
                </ListItem>
              )}
              {currentUser ? (
                  <div>
                  <ListItem>
                    <Link to={"/profile"} className="item-link" onClick={() => setShowSiteBar(false)}>
                      <ListItemText secondary={currentUser.username} />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <a href="/login" className="item-link" onClick={mobileLogOut}>
                      <ListItemText secondary={"Log out"} />
                    </a>
                  </ListItem>
                </div>
              ) : (
                <div>
                  <ListItem>
                    <Link to={"/login"} className="item-link" onClick={() => setShowSiteBar(false)}> 
                      <ListItemText secondary={"Login"} />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to={"/register"} className="item-link" onClick={() => setShowSiteBar(false)}>
                      <ListItemText secondary={"Sign up"} />
                    </Link>
                  </ListItem>
                </div>
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
        </Toolbar>
        </AppBar>
        <Container>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;