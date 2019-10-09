import React, { useContext, useEffect } from "react";
import PactContext from "../contexts/PactContext";
import { Box, TextField, Grid, Typography, Button } from "@material-ui/core";
import ListView from "./ListView";

import styles from "../styles/home/homeStyle";

const Rules = (props) => {
  const classes = styles();

  const pactContext = useContext(PactContext);

  const textAnimals = [
    [["Simple","bet on one animal"], ["1st position", "another position"]],
    [["Double", "bet on two animals"], ["1st and 2nd position", "2 animals in other positions", "1 winning animal (any position)"]],
    [["Triple", "bet on three animals"], ["1st, 2nd, and 3rd position", "3 animals in other positions", "2 winning animals (any position)", "1 winning animal (any position)"]],
    [["Quadruple", "bet on four animals"], ["1st, 2nd, 3rd, and 4th position", "4 animals in other positions", "3 winning animals (any position)", "2 winning animals (any position)", "1 winning animal (any position)"]],
    [["Full-House", "bet on five animals"], ["All 5 animals right!", "4 winning animals (any position)", "3 winning animals (any position)", "2 winning animals (any position)", "1 winning animal (any position)"]]
  ];

  const textNumbers = [
    [["Tens", "bet on last two digits of numbers in draw"], ["1st position", "another position"]],
    [["Hundreds", "bet on last three digits of numbers in draw"], ["1st position", "another position"]],
    [["Thousands", "guess all of a number in the draw"], ["1st position", "another position"]]
  ]

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  const handleAnimalOdds = (odd, i) => {
      return {
        type:
          <Grid container direction="column">
            <Typography variant="h6" className={classes.leaderboardTypography2} style={{color:'purple'}}>
              {textAnimals[i][0][0]}
            </Typography>
            <Typography variant="h8" className={classes.leaderboardTypography2} style={{color:'grey'}}>
              {textAnimals[i][0][1]}
            </Typography>
          </Grid>,
        draw:
          <Grid container direction="column">
            {textAnimals[i][1].map((text, i) => {
              return (
                <Typography variant="h8" className={classes.leaderboardTypography2} style={{color:'black'}}>
                  {text}
                </Typography>
              )
            })}
          </Grid>,
        payout:
          <Grid container direction="column">
            <Typography variant="h8" className={classes.leaderboardTypography2} style={{color:'red'}}>
              {round(parseInt(odd[0]) * pactContext.currentGameData["odd-multiplier"], 1)}x
            </Typography>
            {odd[1].reverse().map((o, i) => {
              return (
                <Typography variant="h8" className={classes.leaderboardTypography2} style={{color:'red'}}>
                  {round(parseInt(o) * pactContext.currentGameData["odd-multiplier"], 1)}x
                </Typography>
              )
            })}
          </Grid>,
      }
  }

  const handleNumberOdds = (odd, i) => {
      return {
        type:
          <Grid container direction="column">
            <Typography variant="h6" className={classes.leaderboardTypography2} style={{color:'purple'}}>
              {textNumbers[i][0][0]}
            </Typography>
            <Typography variant="h8" className={classes.leaderboardTypography2} style={{color:'grey'}}>
              {textNumbers[i][0][1]}
            </Typography>
          </Grid>,
        draw:
          <Grid container direction="column">
            {textNumbers[i][1].map((text, i) => {
              return (
                <Typography variant="h8" className={classes.leaderboardTypography2} style={{color:'black'}}>
                  {text}
                </Typography>
              )
            })}
          </Grid>,
        payout:
          <Grid container direction="column">
            {odd.map((o, i) => {
              return (
                <Typography variant="h8" className={classes.leaderboardTypography2} style={{color:'red'}}>
                  {round(parseInt(o["int"]) * pactContext.currentGameData["odd-multiplier"], 1)}x
                </Typography>
              )
            })}
          </Grid>,
      }
  }

  return (
    <div
      style={{ width: window.innerWidth }}
    >
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
        <Typography
          style={{ fontWeight: "bold", color: "#19a33c", fontSize: 25, marginTop: 50 }}
        >
          BETS ON ANIMALS
        </Typography>
      </Box>
      <Box style={{ padding: 50 }}>
        <ListView
          isButton={false}
          headerBackgroundColor="#19A33C"
          columns={[
            { key: "type", label: "Bet" },
            { key: "draw", label: "Draw" },
            { key: "payout", label: "Payout" }
          ]}
          items={pactContext.odds.animal.map((odd, i) => {
            return handleAnimalOdds(odd, i);
          })}
        />
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center"}}
      >
      <Button
        variant="contained"
        color="primary"
        className={classes.playRoundButton}
        style={{marginBottom: 60}}
        onClick={() => {
          props.anchorEl(null);
        }}
      >
        GOT IT!
      </Button>
      </Box>
    </div>
  );

}


export default Rules;
