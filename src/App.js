import React, { Component } from 'react';
import Movie from './components/movie';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="container">
        <Movie />
      </main>
    );
  }
}

export default App;
