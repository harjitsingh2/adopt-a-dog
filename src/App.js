import React, {useState} from 'react';
import './App.css';
import Login from './components/login.js';
import Search from './components/search.js';
import Match from './components/Match.js';
import { MatchContext } from './context/MatchContext.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  
  const [match, setMatch] = useState(null);
  
  return (
    <MatchContext.Provider value={{match, setMatch}}>
      <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/match' element={<Match />} />

      </Routes>
      </Router>
    </MatchContext.Provider>
    
    
  );
}

export default App;
