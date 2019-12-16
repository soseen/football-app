import React from 'react';
import SearchBar from './SearchBar.js';
import {Table, Row, Col, Button} from 'react-bootstrap';
import {MDBIcon} from 'mdbreact';
import './DisplayData.css';


const API_KEY = 'd4a9110b90c6415bb3d252836a4bf034';


class DisplayData extends React.Component {



    state = {
        leagueCode: " ",
        leagueIndex: 0,
        leagueTable: [],
        leagueFixtures: [],
        leagueResults: [],
        currentWeek: 0,
        matchInfo: [],
        collapseID: ""
      }

    getData = async (leagueCode) => {
        // e.preventDefault();
        const api_call = await fetch(`https://api.football-data.org/v2/competitions`, {
            headers: {
              'X-Auth-Token': API_KEY
            },
            mode: 'cors'
          });

          const competitionsData = await api_call.json();
          
          for (var i in competitionsData.competitions){
              if (competitionsData.competitions[i].code === leagueCode){
                this.setState({
                  leagueCode: competitionsData.competitions[i].code,
                  leagueIndex: competitionsData.competitions[i].id
                })
              }
          }
      
          this.getStandings();
          this.getCurrentWeekFixtures();

      }

    getStandings = async () => {
      
      const api_call2 = await fetch(`https://api.football-data.org/v2/competitions/${this.state.leagueIndex}/standings`, {
        headers: {
          'X-Auth-Token': API_KEY
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
        // leagueTable.push(standings.table[j].team.name)
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
    }

    getCurrentWeekFixtures = async () => {
      
      const api_call3 = await fetch(`https://api.football-data.org/v2/competitions/${this.state.leagueIndex}/matches?status=SCHEDULED`, {
            headers: {
              'X-Auth-Token': API_KEY
            },
            mode: 'cors'
          });

          const matchesScheduledData = await api_call3.json();
          console.log(matchesScheduledData);


          this.setState({
            leagueFixtures: [],
            currentWeek: matchesScheduledData.matches[0].matchday
        });

        console.log(this.state.currentWeek);

        this.getFixtures(this.state.currentWeek);
    }

    getFixtures = async (gameday) => {
      const api_call4 = await fetch(`https://api.football-data.org/v2/competitions/${this.state.leagueIndex}/matches?matchday=${gameday}`, {
        headers: {
          'X-Auth-Token': API_KEY
        },
        mode: 'cors'
      });
    
      
    const matchdayData = await api_call4.json();
    console.log(matchdayData);

    this.setState ({
      leagueFixtures: []
    });

    for(var j in matchdayData.matches){

      var newStateArray = this.state.leagueFixtures.slice();

      if(matchdayData.matches[j].score.fullTime.homeTeam == null & matchdayData.matches[j].score.fullTime.awayTeam == null){
        newStateArray.push({
          index: matchdayData.matches[j].id,
          status: matchdayData.matches[j].status,
          homeTeamName: matchdayData.matches[j].homeTeam.name,
          homeTeamID: matchdayData.matches[j].homeTeam.id,
          awayTeamName: matchdayData.matches[j].awayTeam.name,
          awayTeamID: matchdayData.matches[j].awayTeam.id,
          homeTeamScore: '-',
          awayTeamScore: '-'
        });
      }

      else {
        newStateArray.push({
          index: matchdayData.matches[j].id,
          status: matchdayData.matches[j].status,
          homeTeamName: matchdayData.matches[j].homeTeam.name,
          homeTeamID: matchdayData.matches[j].homeTeam.id,
          awayTeamName: matchdayData.matches[j].awayTeam.name,
          awayTeamID: matchdayData.matches[j].awayTeam.id,
          homeTeamScore: matchdayData.matches[j].score.fullTime.homeTeam,
          awayTeamScore: matchdayData.matches[j].score.fullTime.awayTeam
        });
      }

      this.setState({
        leagueFixtures: newStateArray 
      });


    }

    console.log(this.state.leagueFixtures);
  }

  displayPreviousGameweek = () => {

    var gameday =this.state.currentWeek - 1;

    this.setState({
      currentWeek: this.state.currentWeek - 1
    })

    this.getFixtures(gameday);
  }

  displayNextGameweek = () => {

    var gameday =this.state.currentWeek +1;

    this.setState({
      currentWeek: this.state.currentWeek + 1
    })

    this.getFixtures(gameday);
  }

  displayMatchStatistics = async (matchID) => {
    const api_call5 = await fetch(`https://api.football-data.org/v2/matches/${matchID}`, {
        headers: {
          'X-Auth-Token': API_KEY
        },
        mode: 'cors'
      });
    
    const matchData = await api_call5.json();
    console.log(matchData);

    this.setState({
      matchInfo: []
  });
      try {
        var newStateArray = this.state.matchInfo.slice(); 
      newStateArray.push({
        index: matchData.match.id,
        status: matchData.match.status,
        matchday: matchData.match.matchday,
        homeTeamName: matchData.match.homeTeam.name,
        homeTeamID: matchData.match.homeTeam.id,
        awayTeamName: matchData.match.awayTeam.name,
        awayTeamID: matchData.match.awayTeam.id,
        homeTeamScore: matchData.match.score.fullTime.homeTeam,
        awayTeamScore: matchData.match.score.fullTime.awayTeam,
        halfTimehomeTeamScore: matchData.match.score.halfTime.awayTeam,
        halfTimeawayTeamScore: matchData.match.score.halfTime.awayTeam,
        referee: matchData.match.referees[0].name,
        venue: matchData.match.venue,

      });
      this.setState({
        matchInfo: newStateArray
      });

      console.log(this.state.matchInfo);
    
        
      } catch (error) {
      alert('No Details');
      }
      
  }

  // toggleCollapse = collapseID => () => {
  //   this.setState(prevState => ({
  //     collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  //   }));
  // }

  // callOnClickFunctions = (string, index) => {
  //   this.toggleCollapse(string);
  //   this.displayMatchStatistics(index);
  // }

render() {
    return (
    <div>
    <SearchBar selectLeague={this.getData}/>
      <Row>
        <Col>
            {this.state.leagueTable.length > 0 && 
            <Table className="league-table" width = "40%" striped bordered hover variant="dark">
            <thead>
            <tr>
            <th colSpan="10" align="center">League Table</th>
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
            <td>{team.position}</td>
            <td width="20%" className = "table-team-name"><img src = {team.crest} alt='crest' className="crest"/> {team.name}</td>
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
        </Col>
        <Col>
          {this.state.leagueFixtures.length > 0 && 
            <Table className="fixtures-table" width = "40%%" striped bordered hover variant="dark">
            <thead>
            <tr>
            <th colSpan="3">
              <Button variant="dark" id="btn-1" className="arrow-left" onClick={this.displayPreviousGameweek}>
                <MDBIcon icon="caret-left"/>
              </Button>
              Gameweek {this.state.currentWeek}
              <Button variant="dark" id="btn-1" className="arrow-right" onClick={this.displayNextGameweek}>
                <MDBIcon icon="caret-right"/></Button>
            </th>
            </tr>
            </thead>
            <tbody>
            {this.state.leagueFixtures.map(fixture => (
            <tr onClick={() => this.displayMatchStatistics(fixture.index)} className = "fixture-row" key={fixture.index}>
            <td width="40%" align="right">{fixture.homeTeamName}</td>
            <td width="20%">{fixture.homeTeamScore} : {fixture.awayTeamScore}</td>
            <td width="40%"align="left">{fixture.awayTeamName}</td>
            </tr>
            ))}
            </tbody>
            </Table>
          }
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
        {this.state.matchInfo.length > 0 && 
        <Table className="fixtures-table" width = "40%%" striped bordered hover variant="dark">
            <tbody>
            {this.state.matchInfo.map(match => (
                <tr key={match.index}>
                <td width="40%" align="right">{match.homeTeamName}</td>
                <td width="20%">{match.homeTeamScore} : {match.awayTeamScore}</td>
                <td width="40%"align="left">{match.awayTeamName}</td>
                </tr>
            ))}
            {this.state.matchInfo.map(match2 => (
                <tr key={match2.index}>  
                <td colSpan="3">Referee: {match2.referee}</td>
                </tr>

            ))}
            {this.state.matchInfo.map(match3 => (
                <tr key={match3.index}>
                <td colSpan="3">Venue: {match3.venue}</td>
                </tr>
            ))}
            </tbody> 
        </Table> 
        }  
        </Col>
      </Row>
    </div>
     );
    }
}

export default DisplayData;