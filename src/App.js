import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DisplayData from './DisplayData.js';


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
