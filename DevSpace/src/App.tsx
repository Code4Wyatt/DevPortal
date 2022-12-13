import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import './App.css';
import Auth from '../src/pages/Auth/Auth'
import Dashboard from '../src/pages/Dashboard/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
