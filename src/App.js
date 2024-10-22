import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import EmployDetails from './components/EmployDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Praveen's React JS WebApp.
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/employDetails" element={<EmployDetails />} />
            </Routes>
        </Router>
       
      </header>
    </div>
  );
}

export default App;