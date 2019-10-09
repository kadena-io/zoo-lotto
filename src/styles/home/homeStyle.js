import { makeStyles } from "@material-ui/styles";
import { greenPrimaryColor, greenSecondaryColor } from "../themeGreen";
const backgroundImageUrl = require("../../assets/images/shelf.png");

const styles = {
  gridStyle: () => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }),

  inputText: () => ({
    backgroundColor: "white",
    borderRadius: 5,
    color: "green",
    borderWidth: 10
  }),
  boxStyleBottom: () => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: 245,
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }),
  leaderboardTypography: () => ({
    color: greenPrimaryColor,
    fontWeight: "bold !important",
    textAlign: "center",
    marginBottom: "20px !important"
  }),
  leaderboardTypography2: () => ({
    color: greenPrimaryColor,
    fontWeight: "bold !important",
    textAlign: "left",
    marginBottom: "20px !important"
  }),
  gridStyleBG: () => ({
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundRepeat: "no-repeat",
    //: "cover",
    width: 500,
    height: 400,
    position: "relative",
    marginTop: 30
  }),
  playRoundButton: () => ({
    fontWeight: "bold !important",
    color: "white",
    padding: "10px 20px !important"
  }),
  buttonHolder: () => ({
    width: "100%"
  }),
};

export default makeStyles(styles);
