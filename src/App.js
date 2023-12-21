import React from 'react';
import './App.css';
// @ts-ignore
import Login from './components/Login';
// @ts-ignore
import Search from './components/Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/search' element={<Search />} />
          {/* <div className="App">
            <header className="App-header">
              <Login />
            </header>
          </div>
        </Route> */}
        {/* <Route path='/search'>
          <Search />
        </Route> */}
    </Routes>
    </Router>
    
  );
}

export default App;
