import React from 'react';
import logo from './logo.svg';
import './App.css';
import CatFacts from './components/CatFacts/CatFacts'
import CatFactsForm from './components/CatFactsForm/CatFactsForm'

function App() {
  return (
    <div className="App">
      <h1>Cat Facts</h1>
      <CatFactsForm />
      <CatFacts />
    </div>
  )
}

export default App;
