import React from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsPage from './components/PostPage';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useState } from "react";
import { ApplicantsModal } from "./Modals/ApplicantsModal";
import "./App.css";

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
      {/* <div className="App">
        <header className="App-header">
          <Typography variant="h3" fontWeight="bold" color="primary">
            Server Trust
          </Typography>
        </header>
        <ApplicantsModal
          open={jobApplicantsModalOpen}
          handleClose={() => setJobApplicantsModalOpen(false)}
        />
      </div> */}

      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </Router>

    </ThemeProvider>
  );
}

export default App;
