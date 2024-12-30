import React from 'react'
import SortingAlgorithms from "./SortingAlgorithms/sortingAlgo";
import "./App.css";
import "./SortingAlgorithms/styles.css";

function Navigation() {
  return (
    <div className="navbar">
      <div className="title">
        <h1 className="buttonName">SORTING VISUALIZER</h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Navigation />
      <SortingAlgorithms></SortingAlgorithms>
    </div>
  );
}

export default App;
