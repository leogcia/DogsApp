import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/Landing/Landing';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import DogDetail from './components/DogDetail/dogDetail';



function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/createDog" element={<CreateDog/>} />
        <Route exact path="/detail/:id" element={<DogDetail/>} />
      </Routes>
    </React.Fragment>
    
  );
}


export default App;
