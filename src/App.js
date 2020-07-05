import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DisplayData from './DisplayData.js';
import backgroundImage from './img/bg-1.jpg';



class App extends React.Component {

  render() {
    return (
           <div className="app">
            <DisplayData />    
           </div>
    );
  }
}

export default App;
