import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "../src/pages/Auth/Auth";
import Register from "../src/components/Register/Register";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Developers from '../src/pages/Developers/Developers';
import Developer from '../src/pages/Developer/Developer';
import EditProfile from './pages/AddProject/AddProject';
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
          <Route path="/register" element={<Register />} />
          <Route path="/editProfile/:currentUserId" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/developer/:id" element={<Developer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
