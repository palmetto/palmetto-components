
import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Heading from './components/Heading/Heading';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <span className="font-color-primary">Hello</span>
          <Heading color="primary">Dude!</Heading>
          Edit
          <code>src/App.js</code>
          and save to reloady
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
