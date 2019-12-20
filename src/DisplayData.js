import React from 'react';
import SearchBar from './SearchBar.js';
import LeagueTable from './LeagueTable.js'
import Fixtures from './Fixtures.js'
import './DisplayData.css';
import {Row, Col} from 'react-bootstrap';


const API_KEY = 'd4a9110b90c6415bb3d252836a4bf034';


class DisplayData extends React.Component {



    state = {
        leagueCode: " ",
        leagueIndex: 0,
      }

    getData = async (leagueCode) => {
      try {
        const api_call = await fetch(`https://api.football-data.org/v2/competitions`, {
            headers: {
              'X-Auth-Token': API_KEY
            },
            mode: 'cors'
          });
          const competitionsData = await api_call.json();
          console.log(competitionsData);

          for (var i in competitionsData.competitions){
            if (competitionsData.competitions[i].code === leagueCode){
              this.setState({
                leagueCode: competitionsData.competitions[i].code,
                leagueIndex: competitionsData.competitions[i].id
              })
              console.log(competitionsData.competitions[i].code);
            }
        }
        
      } catch (error) {
        alert("Exceeded amount of available api calls. Try again in a minute.");
      }  

      this.LeagueTable.getStandings();
      this.Fixtures.getCurrentWeekFixtures();
      }


  

render() {
    return (
    <div>
      <SearchBar selectLeague={this.getData}/>
      <div className = "league-info">
        <Row className = "row">
          <Col>
            <LeagueTable ref = {(table) => this.LeagueTable = table} leagueIndex = {this.state.leagueIndex} apiKey = {API_KEY}/>
          </Col>
          <Col>
            <Fixtures ref = {(fixtures) => this.Fixtures = fixtures} leagueIndex = {this.state.leagueIndex} apiKey = {API_KEY}/>
          </Col>
        </Row>
        </div>  
    </div>
     );
    }
}

export default DisplayData;