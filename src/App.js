import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { greenTheme } from "./styles/themeGreen";
import {AppRouter} from "./router/router";
import { PactStore } from "./contexts/PactContext";
import { ModalStore } from "./contexts/ModalContext";
import { AnimalStore } from "./contexts/AnimalContext";

function App() {
  return (
    <MuiThemeProvider theme={greenTheme}>
      <CssBaseline />
      <PactStore>
        <AnimalStore>
          <ModalStore>
            <AppRouter />
          </ModalStore>
        </AnimalStore>
      </PactStore>
    </MuiThemeProvider>
  );
}
export default App;
