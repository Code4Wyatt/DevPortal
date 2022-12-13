import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "../src/pages/Auth/Auth";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {

  const theme = createTheme({
  typography: {
    fontFamily: [
      'Source Code Pro'
    ].join(','),
  },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
