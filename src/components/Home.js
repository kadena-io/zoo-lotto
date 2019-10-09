import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/home/homeStyle";
import { Box, TextField, Button, Grid, Typography, Tabs, Tab } from "@material-ui/core";
import ListView from "./ListView";
import PactContext from "../contexts/PactContext";
import AnimalContext from "../contexts/AnimalContext";

const HomePage = () => {
  const classes = styles();

  const pactContext = useContext(PactContext);
  const animalContext = useContext(AnimalContext);

  const [betAmount, setBetAmount] = useState("");
  const [currRound, setCurrRound] = useState(true);
  const [timer, setTimer] = useState("......");

  useEffect(() => {
    async function getData() {
      await pactContext.getWorkingHosts();
      await pactContext.getHistory();
      await pactContext.getAllPlayerTables()
      await pactContext.getPlayerTable();
      await pactContext.getLastGameData();
      await pactContext.getCurentGameData();
      await pactContext.getOdds();
      if (pactContext.pendingTxs.length > 0) {
        pactContext.pendingTxs.slice().map((tx, i) => {
          pactContext.trackTx(tx[3]);
        })
      }
      console.log(pactContext.lastGameData);

    }
    getData();

  }, [])

  const sortPlayersByScore = (playersData, players) => {
    const playersNew = playersData.slice();
    playersNew.map((usr, i) => {
      usr['user'] = players[i];
    })
    const sorted = playersNew.sort(function(x, y) {
      const x1 = x["coins-won"] - x["coins-bet"];
      const y1 = y["coins-won"] - y["coins-bet"];
      if (x1 > y1) { return -1 }
      if (x1 < y1) { return 1 }
      return 0;
    });
    return sorted;
  }

  const prepAllBets = (playersData, players) => {
    const playersNew = playersData.slice();
    const playerBet = []
    playersNew.map((usr, i) => {
      usr["placed-bets"].map((bet, j) => {
        if (bet[2] === pactContext.gameId) {
          playerBet.push([players[i], bet[0], bet[1]]);
        }
      })
    })
    return playerBet;
  }

  const prepAllPrevBets = (playersData, players) => {
    const playersNew = playersData.slice();
    const playerBet = []
    playersNew.map((usr, i) => {
      usr["placed-bets"].map((bet, j) => {
        if (bet[2] === pactContext.prevGameId) {
          playerBet.push([players[i], bet[0], bet[1]]);
        }
      })
    })
    return playerBet;
  }

  const filterCurrentRoundBets = (playerData) => {
    //add the pendingtxs here?
    if (playerData) {
      const betsArr = (playerData.length !== 0) ? playerData["placed-bets"] : [];
      const retArr = [];
      betsArr.map((bet, i) => {
        if (bet[2] === pactContext.gameId) {
          retArr.push(bet)
        }
      })
      return retArr;
    } else {
      return [];
    }
  }

  const filterPrevRoundBets = (playerData) => {
      if (playerData) {
        const betsArr = (playerData.length !== 0) ? playerData["placed-bets"] : [];
        const retArr = [];
        betsArr.map((bet, i) => {
          if (bet[2] === pactContext.prevGameId) {
            retArr.push(bet)
          }
        })
        return retArr;
      } else {
        return [];
      }
  }


  const handleBetTable = (bet) => {
    //is an animal bet
    let status = bet[3] ? <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'grey'}}>
      pending
    </Typography> : <Typography variant="h8" className={classes.leaderboardTypography}>
      confirmed
    </Typography>;
    if (Array.isArray(bet[0])) {
      let images = [];
      bet[0].map((animal, index) => {
        const url = animalContext.twoDigToAnimalUrl(animal[0]);
        images.push(<img src={url} style={{ width: 30 }} />);
      })
      return {
        bet: images,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'black'}}>
            {bet[1]}
          </Typography>,
        status: status,
        potential:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'red'}}>
            {pactContext.odds.animal.length > 0 ? maxPayout(bet) : ""}
          </Typography>
      }
    } else {
      return {
        bet:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'blue'}}>
            {bet[0]}
          </Typography>,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'black'}}>
            {bet[1]}
          </Typography>,
        status: status,
        potential:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'red'}}>
            {pactContext.odds.animal.length > 0 ? maxPayout(bet) : ""}
          </Typography>
      }
    }
  }

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  const maxPayout = (bet) => {
    const multiplier = pactContext.currentGameData["odd-multiplier"]
    if (Array.isArray(bet[0])) {
      const type = bet[0].length;
      const payout = pactContext.odds.animal[type - 1][0]
      return round(parseInt(bet[1]) * payout * multiplier, 1);
    } else {
      const type = bet[0].length;
      const payout = pactContext.odds.numbers[type - 2][0]["int"]
      return round(parseInt(bet[1]) * payout * multiplier, 1);
    }
  }

  const handleAllBetsTable = (bet) => {
    if (Array.isArray(bet[1])) {
      let images = [];
      bet[1].map((animal, index) => {
        const url = animalContext.twoDigToAnimalUrl(animal[0]);
        images.push(<img src={url} style={{ width: 30 }} />);
      })
      return {
        user:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'black'}}>
            {bet[0]}
          </Typography>,
        bet: images,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'red'}}>
            {bet[2]}
          </Typography>,
      }
    } else {
      return {
        user: bet[0],
        bet:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'blue'}}>
            {bet[1]}
          </Typography>,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'red'}}>
            {bet[2]}
          </Typography>,
      }
    }
  }

  const handleAllPrevBetsTable = (bet) => {
    if (Array.isArray(bet[1])) {
      let images = [];
      bet[1].map((animal, index) => {
        const url = animalContext.twoDigToAnimalUrl(animal[0]);
        images.push(<img src={url} style={{ width: 30 }} />);
      })
      return {
        user:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'black'}}>
            {bet[0]}
          </Typography>,
        bet: images,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'grey'}}>
            {bet[2]}
          </Typography>,
        payout:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:didBetWin(bet[0]) ? "green": "red"}}>
            {didBetWin(bet[0]) ? "WON": "lost"}
          </Typography>
      }
    } else {
      return {
        user: bet[0],
        bet:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'blue'}}>
            {bet[1]}
          </Typography>,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'red'}}>
            {bet[2]}
          </Typography>,
      }
    }
  }


  const didBetWin = (bet) => {
    //animal bet
    if (Array.isArray(bet)) {
      let twoDig = [];
      let bool = false;
      pactContext.lastDraw.map((d) => {
        twoDig.push(d.slice(-2));
      })
      bet.map((b, i) => {
        if (b.some(r => twoDig.includes(r))) {
          bool = true
        }
      })
      return bool;
    } else {
      let modDraw = [];
      let bool = false;
      let charCount = bet.length * -1
      pactContext.lastDraw.map((d) => {
        modDraw.push(d.slice(charCount));
      })
      if (modDraw.includes(bet)) {
        bool = true
      }
      return bool;
    }
  }

  const handlePrevBetTable = (bet) => {
    //is an animal bet
    let status = bet[3] ? <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'grey'}}>
      pending
    </Typography> : <Typography variant="h8" className={classes.leaderboardTypography}>
      confirmed
    </Typography>;
    if (Array.isArray(bet[0])) {
      let images = [];
      bet[0].map((animal, index) => {
        const url = animalContext.twoDigToAnimalUrl(animal[0]);
        images.push(<img src={url} style={{ width: 30 }} />);
      })
      return {
        bet: images,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'grey'}}>
            {bet[1]}
          </Typography>,
        payout:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:didBetWin(bet[0]) ? "green": "red"}}>
            {didBetWin(bet[0]) ? "WON": "lost"}
          </Typography>,
      }
    } else {
      return {
        bet:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'blue'}}>
            {bet[0]}
          </Typography>,
        amount:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'grey'}}>
            {bet[1]}
          </Typography>,
        payout:
          <Typography variant="h8" className={classes.leaderboardTypography} style={{color:didBetWin(bet[0]) ? "green": "red"}}>
            {didBetWin(bet[0]) ? "WON": "lost"}
          </Typography>,
      }
    }
  }

  const handleButton = () => {
    if (isNaN(betAmount) || betAmount === "") return true;
    if (animalContext.bets.length === 0 ) return true;
    // if (numberBet === "") return false;
    return false;
  }

  const handleButtonAni = () => {
    if (isNaN(betAmount) || betAmount === "") return true;
    if (animalContext.bets.length === 0) return true;
    return false;
  }

  const getBetItems = (pt, pending) => {
    const filtered = filterCurrentRoundBets(pactContext.playerTable);
    if (pactContext.pendingTxs.length > 0) {
      // filtered.push(pactContext.pendingTxs)
      pending.map((tx, i) => {
        filtered.push(tx);
      })
    }
    return (
      filtered.map((bet, i) => {
          return handleBetTable(bet)
        }));
  }

  const getLastGameInfo = (lastGameData) => {
    if (lastGameData) {
      return [
        ["coins bet", lastGameData["coins-in"].toString().substring(0, 8)],
        ["coins paid", (lastGameData["coins-out"] * lastGameData["odd-multiplier"]).toString().substring(0, 8)],
        ["total bets", lastGameData["total-bets"]["int"]],
        ["multiplier", lastGameData["odd-multiplier"]],
        ["draw time", new Date (lastGameData["draw-time"]["timep"]).toLocaleTimeString("en-US") ]
        ]
    } else {
      return [];
    }
  }

  const countDown = () => {
    let startTime = new Date (pactContext.lastGameData["draw-time"]["timep"]);
    let endTime = startTime.setHours(startTime.getHours() + 1);
    let currTime = new Date();
    let diff = Math.floor((endTime / 1000 ) - (currTime / 1000));
    var minutes = Math.floor(diff / 60);
    var seconds = diff - minutes * 60;
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds
    var ret = minutes + ":" + seconds
    setTimer(ret);
    //attempt to force a refresh here...
    if (ret === "00:00") {
      window.location.reload();
    }
  }

  const showCurrPrev = () => {
    if (currRound) {
      return (
        <div>
          <Box
            style={{ display: "flex", justifyContent: "center"}}
          >
            <Typography
              style={{ fontWeight: "bold", color: "#19a33c", fontSize: 25 }}
            >
              YOUR CURRENT ROUND BETS
            </Typography>
          </Box>
          <Box style={{ padding: 20 }}>
            <ListView
              isButton={false}
              headerBackgroundColor="#19A33C"
              columns={[
                { key: "bet", label: "Bet" },
                { key: "amount", label: "Amount" },
                { key: "potential", label: "Max Payout" },
                { key: "status", label: "Status"},
              ]}
              items={getBetItems(pactContext.playerTable, pactContext.pendingTxs)}
            />
          </Box>
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 10}}
          >
            <Typography
              style={{ fontWeight: "bold", color: "#19a33c", fontSize: 25 }}
            >
              ALL PLAYER CURRENT BETS
            </Typography>
          </Box>
          <Box style={{ padding: 20 }}>
            <ListView
              isButton={false}
              headerBackgroundColor="#19A33C"
              columns={[
                { key: "user", label: "Account"},
                { key: "bet", label: "Bet" },
                { key: "amount", label: "Amount" },

              ]}
              items={
                prepAllBets(pactContext.playersData, pactContext.players).map((bet, i) => {
                    return handleAllBetsTable(bet);
                })}
            />
          </Box>
        </div>
      );
    } else {
      return (
        <div>
        <Box
          style={{ display: "flex", justifyContent: "center"}}
        >
          <Typography
            style={{ fontWeight: "bold", color: "#19a33c", fontSize: 25 }}
          >
            YOUR PREVIOUS ROUND BETS
          </Typography>
        </Box>
        {filterPrevRoundBets(pactContext.playerTable).length > 0 ?
          <Box style={{ padding: 20 }}>
            <ListView
              isButton={false}
              headerBackgroundColor="#19A33C"
              columns={[
                { key: "bet", label: "Bet" },
                { key: "amount", label: "Amount" },
                { key: "payout", label: "Outcome"}
              ]}
              items={
                filterPrevRoundBets(pactContext.playerTable).map((bet, i) => {
                    return handlePrevBetTable(bet);
                })}
            />
          </Box>
          :
          <Typography variant="h6" className={classes.leaderboardTypography} style={{ marginTop: 3 }}>
            you had no bets
          </Typography>
          }
        <Grid container style={{ paddingRight: 15, paddingLeft: 15 }}>
          <Grid item style={{ flex: 1, margin: "0 15px" }}>
            <Typography
              style={{
                fontWeight: "bold",
                color: "#19a33c",
                fontSize: 20,
                textAlign: "center",
                margin: 10
              }}
            >
              TOP 5 SCORES
            </Typography>
            <Box>
              <ListView
                isButton={false}
                headerBackgroundColor="#19A33C"
                columns={[
                  { key: "pos", label: "Rank" },
                  { key: "account", label: "Account" },
                  { key: "score", label: "Score" }
                ]}
                items={
                sortPlayersByScore(pactContext.playersData, pactContext.players).slice(0,5).map((usr, i) => (
                  {
                  account:
                  <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'black'}}>
                    {usr["user"].slice(0,10)}
                  </Typography>,
                  score:
                  <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'orange'}}>
                    {(usr["coins-won"] - (usr["coins-bet"]["decimal"] ? usr["coins-bet"]["decimal"] : usr["coins-bet"])).toString().slice(0, 10)}
                  </Typography>,
                  pos:
                    <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'black'}}>
                      {i + 1}°
                    </Typography>,
                }))}
              />

            </Box>

          </Grid>
          <Grid item style={{ flex: 1, margin: "0 15px" }}>
            <Typography
              style={{
                fontWeight: "bold",
                color: "#19a33c",
                fontSize: 20,
                textAlign: "center",
                margin: 10
              }}
            >
              PREVIOUS GAME INFO
            </Typography>
            <Box>
              <ListView
                isButton={false}
                headerBackgroundColor="#19A33C"
                columns={[
                  { key: "info", label: "Info" },
                  { key: "amount", label: "Amount" }

                ]}
                items={getLastGameInfo(pactContext.lastGameData).map((data, i) => ({
                  info:
                      <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'black'}}>
                        {data[0]}
                      </Typography>,
                  amount:
                      <Typography variant="h8" className={classes.leaderboardTypography} style={{color:'blue'}}>
                        {data[1]}
                      </Typography>,
                }))}
              />
            </Box>
          </Grid>


        </Grid>

          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 20}}
          >
            <Typography
              style={{ fontWeight: "bold", color: "#19a33c", fontSize: 25 }}
            >
              ALL PREVIOUS ROUND BETS
            </Typography>
          </Box>
          {prepAllPrevBets(pactContext.playersData, pactContext.players).length > 0 ?
          <Box style={{ padding: 20 }}>
            <ListView
              isButton={false}
              headerBackgroundColor="#19A33C"
              columns={[
                { key: "user", label: "Account"},
                { key: "bet", label: "Bet" },
                { key: "amount", label: "Amount" },
                { key:"payout", label: "Outcome" }

              ]}
              items={
                prepAllPrevBets(pactContext.playersData, pactContext.players).map((bet, i) => {
                    return handleAllPrevBetsTable(bet);
                })}
            />
          </Box>
          :
          <Typography variant="h6" className={classes.leaderboardTypography} style={{ marginTop: 3 }}>
            there were no previous round bets
          </Typography>
          }
        </div>
      );
    }
  }

  return (
    <Grid container>
      <Grid item style={{ flex: 1 }}>
        <Grid container justify="center">
          <Box>
            <Grid
              container
              justify="space-around"
              style={{
                backgroundColor: "#72b900",
                padding: 5,
                paddingTop: 7
              }}
            >
              <Box style={{ marginRight: 15, justifyContent: "center" }} >

              <Typography
                style={{
                  marginTop: 7,
                  fontFamily: "Weston Free",
                  fontSize: 35,
                  color: "white"
                }}
              >
                ENTER BET AMOUNT:
              </Typography>
              </Box>
              <Box style={{ marginRight: 15, justifyContent: "center" }} >
                <TextField
                  error={(isNaN(betAmount) || betAmount === "")}
                  id="amount"
                  className={classes.inputText}
                  variant="outlined"
                  value={betAmount}
                  onChange={async (e) => {
                    await setBetAmount(e.target.value)
                  }}
                />
                <Button
                  variant="contained"
                  disabled={(handleButtonAni())}
                  style={{
                    backgroundColor: (handleButtonAni()) ? '#edeeee' : "white",
                    color: (handleButtonAni()) ? 'grey' : "#19a33c",
                    fontWeight: (handleButtonAni()) ? '' : "bold",
                    height: "95%",
                    marginLeft: 10,
                    marginBottom: 3
                  }}
                  onClick={() => {
                    if (animalContext.bets.length > 0) {
                      pactContext.betAnimal(animalContext.bets, betAmount);
                      animalContext.clearBetsUrls();
                      setBetAmount("");
                    } else {
                      alert("please select at least one animal")
                    }

                  }}
                >
                  PLACE BET
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>

        <Box className={classes.gridStyle}>

          <Grid container alignItems="center" direction="column" style={{marginBottom: 20}}>
          <Box style={{ marginTop: 20, marginBottom: 10, borderWidth: 5, borderColor:"#19a33c" }}>
          <Grid container alignItems="center" direction="column">
            <Typography
              style={{
                fontFamily: "Weston Free",
                fontSize: 30,
                color: "#19a33c"
              }}
            >
              NEXT ROUND IN:
            </Typography>
            <Typography
              style={{
                fontFamily: "Weston Free",
                fontSize: 50,
                color: "#19a33c"
              }}
            >
              {timer}
            </Typography>
            </Grid>
            </Box>
            <Box style={{marginBotton: 20}}>
            <Typography
              style={{ color: "white", marginBottom: 20, fontSize: 25 }}
            >
              Select up to 5 animals
            </Typography>
            </Box>
          </Grid>


        </Box>
        <Grid container justify="center" style={{ marginTop: 30 }}>
          <Grid item className={classes.gridStyleBG}>
            {animalContext.animals.map(animal => {
              let src = animal.image
              if (animal.selected) {
                src = animal.imageDark
              }
              return (
                <div
                >
                  <img
                    src={src}
                    alt={animal.name}
                    style={{
                      top: animal.top,
                      left: animal.left,
                      position: "absolute"
                    }}
                    onClick={() => {
                      animalContext.toggleSelection(animal.index)
                    }}
                  />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          flex: 0.7,
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        {pactContext.currentGameData !== "" ?

        <div
          style={{overflow: "scroll",
          height: window.innerHeight}}
        >
        <Grid container justify="center">
          <div style={{visibility: "hidden"}}>
            {setTimeout(countDown, 1000)}
          </div>

          <Box>
          {pactContext.playerId ?
            <Typography variant="h6" className={classes.leaderboardTypography} style={{ marginTop: 3 }}>
              account: {pactContext.playerId}
            </Typography>
            :
            <Typography variant="h6" className={classes.leaderboardTypography} style={{ marginTop: 3 }}>
              no account!
            </Typography>
          }
            <Grid container alignItems="center">
              <Typography
                style={{ color: "#ff0000", fontSize: 30, fontWeight: "bold", marginLeft: 20, marginBottom: 5  }}
              >
                Payout Multiplier: {pactContext.currentGameData !== "" ? pactContext.currentGameData["odd-multiplier"] : ""}
              </Typography>
            <Typography
              style={{ color: "blue", fontSize: 30, fontWeight: "bold", marginLeft: 20, marginBottom: 5  }}
            >
              Status: {pactContext.currentGameData !== "" ? pactContext.currentGameData["status"].toUpperCase() : ""}
            </Typography>
            </Grid>
          </Box>

        </Grid>
        <Box
          style={{ display: "flex", justifyContent: "center"}}
        >
          <Typography
            style={{ fontWeight: "bold", color: "#19a33c", fontSize: 25 }}
          >
            LAST DRAW
          </Typography>
        </Box>
        <Box style={{ padding: 20 }}>
          <ListView
            isButton={false}
            headerBackgroundColor="#19A33C"
            columns={[
              { key: "one", label: "1st" },
              { key: "two", label: "2nd" },
              { key: "three", label: "3rd" },
              { key: "four", label: "4th" },
              { key: "five", label: "5th" }

            ]}
            items={pactContext.lastDraw.length > 0 ? [pactContext.lastDraw.slice().reverse()].map((draw, i) => ({
                one: <img src={animalContext.twoDigToAnimalUrl(draw[0].slice(-2))} style={{ width: 30 }} />,
                two: <img src={animalContext.twoDigToAnimalUrl(draw[1].slice(-2))} style={{ width: 30 }} />,
                three: <img src={animalContext.twoDigToAnimalUrl(draw[2].slice(-2))} style={{ width: 30 }} />,
                four: <img src={animalContext.twoDigToAnimalUrl(draw[3].slice(-2))} style={{ width: 30 }} />,
                five: <img src={animalContext.twoDigToAnimalUrl(draw[4].slice(-2))} style={{ width: 30 }} />,
            })) : []}
          />
        </Box>
        <Box style={{ marginBottom: 20 }}>
          <Grid direction="row" justify="center" style={{ padding: 20 }}>
              <Button
                variant="contained"
                fullWidth={true}
                style={{ width: "50%" }}
                color={!currRound ? "grey" : "primary"}
                className={classes.playRoundButton}
                // disabled={startDis}
                onClick={() => {
                  if (!currRound) {
                    setCurrRound(true)
                  }
                }}
              >
                <Typography
                  style={{ fontWeight: "bold", color: !currRound ? "grey" : "white", fontSize: 15 }}
                >
                  CURRENT GAME BETS
                </Typography>
              </Button>
              <Button
                variant="contained"
                fullWidth={true}
                style={{ width: "50%" }}
                color={currRound ? "grey" : "primary"}
                // disabled={continueDis}
                className={classes.playRoundButton}
                onClick={() => {
                  if (currRound) {
                    setCurrRound(false)
                  }

                }}
              >
              <Typography
                style={{ fontWeight: "bold", color: currRound ? "grey" : "white", fontSize: 15 }}
              >
                PAST GAME RESULTS
              </Typography>
              </Button>
          </Grid>
        </Box>
        {showCurrPrev()}
        </div>
          :
          <Box
            style={{ display: "flex", justifyContent: "center"}}
          >
          <Typography
            style={{ color: "black", fontSize: 30, fontWeight: "bold", marginTop: 30 }}
          >
            <div>connecting to an available node...</div>
          </Typography>
          </Box>
        }
      </Grid>

    </Grid>
  );
};
export default HomePage;
