import React from "react";
import Pact from "pact-lang-api";

const Context = React.createContext();

const hosts = ["us1","us2","eu1","eu2","ap1","ap2"]
const chainIds = ["0","1",'2',"3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet02/chain/${chainId}/pact`
const dumKeyPair = Pact.crypto.genKeyPair();

const id = localStorage.getItem('id');
// localStorage.setItem('pendingTxs', JSON.stringify([]));
let pendingTxs = JSON.parse(localStorage.getItem('pendingTxs'));
//one time thing for new users
if (!pendingTxs) {
  pendingTxs = [];
  localStorage.setItem('pendingTxs', JSON.stringify([]));
}

export class PactStore extends React.Component {

  state = {
    playerId: id,
    gameId: "",
    prevGameId: "",
    currentReqKey: "",
    history: "",
    players: [],
    playersData: [],
    playerTable: [],
    lastGameData: "",
    currentGameData: "",
    lastDraw: [],
    pendingTxs: pendingTxs,
    odds: {
      animal: [],
      numbers: []
    },
    workingHosts: []
  }

  getWorkingHosts = async () => {
    const hosts = await Pact.network.host();
    console.log(hosts)
    this.setState({ workingHosts: hosts });
    if (hosts.length === 0) {
      alert("All nodes currently unavailable")
      window.location.reload();
    }
  }

  trackTx = async (requestKey) => {
    console.log(requestKey);
    Pact.fetch.listen({ listen: requestKey }, createAPIHost(this.state.workingHosts[0],"0"))
      .then(res => {
        if (res.status === "success") {
          console.log("success");
          this.removeTx(requestKey);
          this.getPlayerTable();
        } else if (res.status === "failure") {
          console.log("failed");
          alert(`your requested bet tx failed with error: ${res.error.message}`);
          this.removeTx(requestKey);
        }
      })
  }

  addTx = async (tx) => {
    //expecting tx to be a list [bet, amount, game-id, reqKey]
    const added = this.state.pendingTxs.slice();
    added.push(tx)
    await this.setState({ pendingTxs: added })
    await localStorage.setItem('pendingTxs', JSON.stringify(added));
  }

  removeTx = async (reqKey) => {
    const current = this.state.pendingTxs.slice();
    let removed = []
    current.map((req, i) => {
      if (!(req[3] === reqKey)) {
        removed.push(req);
      }
    });
    await this.setState({ pendingTxs: removed });
    await localStorage.setItem('pendingTxs', JSON.stringify(removed));
  }

  //helper for JSON parsing in pact calls
  convertDecimal = (decimal) => {
    decimal = decimal.toString();
    if (decimal.includes('.')) { return decimal }
    if ((decimal / Math.floor(decimal)) === 1) {
      decimal = decimal + ".0"
    }
    return decimal
  }

  betAnimal = async (bet, amount) => {
    amount = this.convertDecimal(amount);
    if (this.state.playerId !== "" && this.state.playerId) {
      try {
        // console.log('in bet animal')
        const cmd = await Pact.wallet.sign(
          //code
          `(zoo-lotto.bet-animal ${JSON.stringify(bet)} ${JSON.stringify(this.state.gameId)} ${JSON.stringify(this.state.playerId)} ${amount})`,
          //envData
          {[this.state.playerId]: []},
          this.state.playerId,
          "0",
          100000,
          //nonce too
        )
        console.log(cmd)
        const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost(this.state.workingHosts[0],"0"))
        console.log(reqKey.requestKeys[0]);
        // await this.setState({ currentReqKey: reqKey.requestKeys[0] })
        // this.setReqKey(reqKey.requestKeys[0])
        this.addTx([bet, amount, this.state.gameId, reqKey.requestKeys[0]]);
        this.trackTx(reqKey.requestKeys[0])
      } catch(err){
        alert("you cancelled the TX or you did not have the wallet app open")
        window.location.reload();
      }

    }
    else {
      alert("Please Log-in!")
      window.location.reload()
    }
  }

  betNumber = async (bet, amount) => {
    amount = this.convertDecimal(amount);
    if (this.state.playerId !== "" && this.state.playerId) {
      try {
        // console.log('in bet animal')
        const cmd = await Pact.wallet.sign(
          //code
          `(zoo-lotto.bet-number ${JSON.stringify(bet)} ${JSON.stringify(this.state.gameId)} ${JSON.stringify(this.state.playerId)} ${amount})`,
          //envData
          {[this.state.playerId]: []},
          this.state.playerId,
          "0",
          100000,
          //nonce too
        )
        console.log(cmd)
        const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost(this.state.workingHosts[0],"0"))
        // await this.setState({ currentReqKey: reqKey.requestKeys[0] })
        // this.setReqKey(reqKey.requestKeys[0])
        this.addTx([bet, amount, this.state.gameId, reqKey.requestKeys[0]]);
        this.trackTx(reqKey.requestKeys[0])
      } catch(err){
        alert("you cancelled the TX or you did not have the wallet app open")
        window.location.reload();
      }

    }
    else {
      alert("Please Log-in!")
      window.location.reload()
    }
  }

  setPlayerId = async (id) => {
    localStorage.setItem('id', id);
    await this.setState({ playerId: id })
    console.log(this.state.playerId)
  }

  getHistory = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(zoo-lotto.get-history)`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    console.log(data);
    const numGames = data["games"].length;
    const currentGame = (numGames >= 1) ? data["games"][numGames - 1] : ""
    const prevGame = (numGames >= 2) ? data["games"][numGames - 2] : ""
    console.log(prevGame);
    console.log(currentGame);
    await this.setState({ history: data, gameId: currentGame, prevGameId: prevGame });
    // return data;
  }

  getPlayerTable = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(zoo-lotto.get-player ${JSON.stringify(this.state.playerId)})`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    console.log(cmd);
    await this.setState({ playerTable: data });
  }

  getAllPlayers = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(zoo-lotto.get-players)`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    await this.setState({ players: data });
    return data;
  }

  getAllPlayerTables = async () => {
    const l = await this.getAllPlayers();
    const cmd = await Pact.fetch.local({
      pactCode: `(map (zoo-lotto.get-player) ${JSON.stringify(l)})`,
        keyPairs: dumKeyPair,
      }, createAPIHost(this.state.workingHosts[0],"0"))
      const data = await cmd.data;
      await this.setState({ playersData: data })
  }

  getLastGameData = async () => {
    // console.log(this.state.prevGameId);
    const cmd = await Pact.fetch.local({
      pactCode: `(zoo-lotto.get-games-table ${JSON.stringify(this.state.prevGameId)})`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    const draw = data ? data["draw"] : [];
    await this.setState({ lastGameData: data, lastDraw: draw });
    console.log(data);
    return data;
  }

  getCurentGameData = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(zoo-lotto.get-games-table ${JSON.stringify(this.state.gameId)})`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    const draw = data ? data["draw"] : [];
    await this.setState({ currentGameData: data});
    return data;
  }

  getOdds = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(zoo-lotto.get-odds)`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    await this.setState({ odds: data });
  }


  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setPlayerId: this.setPlayerId,
          betAnimal: this.betAnimal,
          betNumber: this.betNumber,
          getReqKey: this.getReqKey,
          setReqKey: this.setReqKey,
          getHistory: this.getHistory,
          getAllPlayerTables: this.getAllPlayerTables,
          getPlayerTable: this.getPlayerTable,
          getLastGameData: this.getLastGameData,
          getCurentGameData: this.getCurentGameData,
          trackTx: this.trackTx,
          getOdds: this.getOdds,
          getWorkingHosts: this.getWorkingHosts
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
