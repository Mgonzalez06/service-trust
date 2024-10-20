import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#000000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Typography variant="h3" fontWeight="bold" color="primary">
            Server Trust
          </Typography>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
