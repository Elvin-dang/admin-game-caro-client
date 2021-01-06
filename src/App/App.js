import React, { useState, useEffect } from 'react';
import { Router, Route, Link, useHistory,Switch } from 'react-router-dom';
import  PrivateRoute  from '../Components/PrivateRoute';
import  Layout  from '../Pages/Layout/Layout';
import  LoginPage  from '../Pages/LoginPage/Login';
import  RegistrationPage from '../Pages/RegistrationPage/Registration';
import  authenticationService  from '../Services/Authentication_service';
import {Button} from '@material-ui/core'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Drawer,CssBaseline,AppBar,Toolbar,List,Typography,Divider,IconButton,ListItem,ListItemText,ListItemIcon} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Dashboard from '../Pages/DashboardPage/Dashboard';
import Games from '../Pages/GamesPage/Games';
import Users from '../Pages/UsersPage/Users';
import DetailUser from '../Pages/UsersPage/DetailUser'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function App () {
    const [isLogined,setIsLogined] = useState(null);
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setIsLogined(x));
    },[]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = () => {
        authenticationService.logout();
        history.push('/login');
    }
    return (
        <div>
            {isLogined &&     
            <div>
                 <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Caro Game Admin
          </Typography>
            <div style={{width:'80%'}}>
                <Button onClick={logout} color="inherit" style={{float:'right'}}>Logout</Button>
                <Button onClick={()=>{history.push('/')}} color="inherit" style={{float:'right'}}>Home</Button>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={()=>{ history.push('/'); handleDrawerClose(); }}>
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={()=> { history.push('/users'); handleDrawerClose(); }}>
              <ListItemIcon><PersonIcon/></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={()=> { history.push('/games'); handleDrawerClose(); }}>
              <ListItemIcon><SportsEsportsIcon/></ListItemIcon>
              <ListItemText primary="Games" />
            </ListItem>
        </List>

      </Drawer>
      </div>}
      <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}>
            <Route>
                <div className="jumbotron" style={{background:'white'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 ">
                                    <Switch>
                                        <PrivateRoute exact path="/" component={Dashboard} />
                                        <Route path="/login" component={LoginPage} />
                                        <PrivateRoute path="/register" component={RegistrationPage} />
                                        <PrivateRoute path="/users" component={Users} />
                                        <PrivateRoute path="/games" component={Games} />
                                        <PrivateRoute exact path="/user/:id" component={DetailUser}/>
                                    </Switch>    
                            </div>
                        </div>
                    </div>
                </div>
            </Route>
        </main>
            
        </div>
    ) 
}

export default App;