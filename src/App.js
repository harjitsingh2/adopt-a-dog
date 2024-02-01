import React, {useState} from 'react';
import './App.css';
// @ts-ignore
import Login from './components/Login';
// @ts-ignore
import Search from './components/Search';
import Match from './components/Match';
import { MatchContext } from './context/MatchContext';
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
