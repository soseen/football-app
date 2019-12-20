import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DisplayData from './DisplayData.js';
import backgroundImage from './img/bg-1.jpg';


var sectionStyle = {
  width: "88%%",
  height: "1200px",
  background: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

class App extends React.Component {

  render() {
    return (
       
        <section style={ sectionStyle }>
           <div>
            <DisplayData />    
           </div>
        </section>
    );
  }
}

export default App;
