import React from 'react';
import NBASearch from './NBASearch'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import logo from './nba-logo.png'

function App() {
  return (
    <CssBaseline>
    <Container className="App">
      <div className="logo">
        <img className="logo" src={logo} width="90px" alt="NBA Logo" />
      </div>
      <NBASearch />
    </Container>
    </CssBaseline>
  );
}

export default App;
