import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Avatar,
  Chip,
  Box,
  Fab,
  IconButton
} from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import ModalContext from "../contexts/ModalContext";
import LoginModal from "./LoginModal";
import Rules from "./Rules";

import { withStyles } from "@material-ui/core/styles";
import styles from "../styles/header/headerStyle";
const StyledMenu = withStyles({
  paper: {
    marginTop: "-15px"
  },
  list: {
    backgroundColor: "white !important",
    paddingTop: "20px",
    width: props => props.width
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));
export default function Header({ title }) {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const [dimension, setDimension] = React.useState(null);
  const modalContext = useContext(ModalContext);
  //const authContext = useContext(AuthContext);
  const ref = useRef(null);
  function handleToggle(e) {
    setAnchorEl(isOpen ? null : e.currentTarget);
    setOpen(!isOpen);
    console.log("ref", ref.current.offsetWidth);
    setDimension(ref.current.offsetWidth < 170 ? 170 : ref.current.offsetWidth);
    console.log("dim", dimension);
  }
  let kadenaLogo = require("../assets/images/logo_green.png");
  /*
 function logoutFunction(logout) {
   // param is the argument you passed to the function
   return function() {
     // e is the event object that returned
     logout;
   };
 }*/
  //console.log('keyset', authContext);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
          <div onClick={() => window.location.href = "http://testnet.chainweb.com"} style={{color:"green"}}>
            <img className={classes.kadena} alt="kadena" src={kadenaLogo} />
          </div>
          </Link>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Box className={classes.textTitle}>{title}</Box>
          </Typography>
          <Box className={classes.loginIconButton}>
            <Fab
              variant="extended"
              size="small"
              className={classes.fab}
              onClick={() => modalContext.setModalOpen(<LoginModal />)}
            >
              <Typography
                color="primary"
                style={{
                  fontSize: "13px",
                  textTransform: "capitalize"
                }}
              >
                Choose Account
              </Typography>
            </Fab>
          </Box>
          <Box className={classes.loginIconButton} style={{marginLeft: 10}}>
          <Fab
            aria-describedby={id}
            variant="extended"
            size="small"

            className={classes.fab}
            onClick={handleClick}
          >
            <Typography
              color="primary"
              style={{
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              Rules and Current Odds
            </Typography>
          </Fab>
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl2}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Rules anchorEl={setAnchorEl}/>
          </Popover>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
