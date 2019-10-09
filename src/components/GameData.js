import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/home/homeStyle";
import { Box, TextField, Button, Grid, Typography, Tabs, Tab } from "@material-ui/core";
import ListView from "./ListView";
import PactContext from "../contexts/PactContext";
import AnimalContext from "../contexts/AnimalContext";

const GameData = () => {
  const classes = styles();

  const pactContext = useContext(PactContext);
  const animalContext = useContext(AnimalContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  )
}
export default GameData;
