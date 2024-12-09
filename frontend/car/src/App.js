// File: src/App.js
import React, { useState } from 'react';
import './App.css';
import Search from './Components/Search/search';
import BasicExample from './Components/Navbar/navbar'; 
// import Search from './Components/Search/Search';       
import Grid from './Components/Grid';             

function App() {
  const [carData, setCarData] = useState([]); 

  
  const handleSearchResults = (data) => {
    setCarData(data);
  };

  return (
    <div>
  
      <BasicExample />
  
      <Search onSearchResults={handleSearchResults} /> 
      
      <Grid carData={carData} />
    </div>
  );
}

export default App;
