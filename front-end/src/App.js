import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useState } from "react";
import { ApplicantsModal } from "./Modals/ApplicantsModal";
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
  const [jobApplicantsModalOpen, setJobApplicantsModalOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Typography variant="h3" fontWeight="bold" color="primary">
            Server Trust
          </Typography>
        </header>
        <ApplicantsModal
          open={jobApplicantsModalOpen}
          handleClose={() => setJobApplicantsModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
