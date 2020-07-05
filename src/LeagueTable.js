import React from 'react';
import './LeagueTable.css'
import {Table} from 'react-bootstrap';

class LeagueTable extends React.Component {

state = {
        leagueTable: [],
    }


getStandings = async () => {

    try {
        const api_call2 = await fetch(`https://api.football-data.org/v2/competitions/${this.props.leagueIndex}/standings`, {
        headers: {
            'X-Auth-Token': this.props.apiKey
          },
          mode: 'cors'
        });
  
        const standingsData = await api_call2.json();
        console.log(standingsData.standings);
  
        var standings = standingsData.standings[0];
  
        this.setState({
            leagueTable: []
        });
  
        for(var j in standings.table){
           var newStateArray = this.state.leagueTable.slice(); 
           newStateArray.push({
             position: standings.table[j].position,
             index: standings.table[j].team.id,
             name: standings.table[j].team.name,
             crest: standings.table[j].team.crestUrl,
             points: standings.table[j].points,
             played: standings.table[j].playedGames,
             won: standings.table[j].won,
             drew: standings.table[j].draw,
             lost: standings.table[j].lost,
             goalsFor: standings.table[j].goalsFor,
             goalsAgainst: standings.table[j].goalsAgainst,
             goalDifference: standings.table[j].goalDifference
           });
           this.setState({
            leagueTable: newStateArray
          });
        } 
  
        console.log(this.state.leagueTable);
      } catch (error) {
          alert("Exceeded amount of available api calls. Try again in a minute.");
      }
    }
    

render() 
    {
    return (
        <div>
        {this.state.leagueTable.length > 0 && 
            <Table ref = {(childTable) => {this.childTable = childTable}} className="league-table" striped hover size="sm" responsive="xl">
            <thead>
            <tr>
            <th colSpan="10" align="center" class="league-title">League Table</th>
            </tr>
            <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Points</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            </tr>
            </thead>
            <tbody>
            {this.state.leagueTable.map(team => (
            <tr key={team.position}>
            <td width="5%">{team.position}</td>
            <td width="15%" className = "table-team-name"><img src = {team.crest} alt='crest' className="crest"/> {team.name}</td>
            <td width="10%">{team.played}</td>
            <td width="10%">{team.points}</td>
            <td width="10%">{team.won}</td>
            <td width="10%">{team.drew}</td>
            <td width="10%">{team.lost}</td>
            <td width="10%">{team.goalsFor}</td>
            <td width="10%">{team.goalsAgainst}</td>
            <td width="10%">{team.goalDifference}</td>
            </tr>
            ))}
            </tbody>
            </Table>
        }
        </div>
        );

    }
}

export default LeagueTable;