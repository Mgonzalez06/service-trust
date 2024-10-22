import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PostsPage } from "./components/Posts/PostPage";
import { JobPostForm } from "./components/Posts/CreatePost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { ProfilePage } from "./components/Profile/ProfilePage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          backgroundColor: "#00244a",
          "&:active": {
            boxShadow: "none",
          },
        },
        outlined: {
          borderColor: "#00244a",
          color: "#00244a",
        },
        text: {
          color: "blue",
          mt: 1,
          "&:hover": {
            textDecoration: "underline",
            backgroundColor: "transparent",
          },
        },
      },
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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create_post" element={<JobPostForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
