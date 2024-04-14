import React from "react";
import RoutesApp from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <RoutesApp />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
