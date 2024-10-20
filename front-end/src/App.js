import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostsPage from "./components/PostPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
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
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<></>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
