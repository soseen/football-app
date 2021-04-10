import React from 'react';
import './Fixtures.css'
import {Table, Button} from 'react-bootstrap';
import {MDBIcon} from 'mdbreact';

class LeagueTable extends React.Component {

state = {
        leagueFixtures: [],
        leagueResults: [],
        currentWeek: 0,
        matchInfo: [],
    }

    getCurrentWeekFixtures = async () => {
      
        const api_call3 = await fetch(`https://api.football-data.org/v2/competitions/${this.props.leagueIndex}/matches?status=SCHEDULED`, {
              headers: {
                'X-Auth-Token': process.env.REACT_APP_API_KEY
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
          console.log(this.props.leagueIndex);
          this.getFixtures(this.state.currentWeek);
      }
  
      getFixtures = async (gameday) => {
        try {
          const api_call4 = await fetch(`https://api.football-data.org/v2/competitions/${this.props.leagueIndex}/matches?matchday=${gameday}`, {
          headers: {
            'X-Auth-Token': process.env.REACT_APP_API_KEY
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
        
      } catch (error) {
        alert("Exceeded amount of available api calls. Try again in a minute")
      }
  
      console.log(this.state.leagueFixtures);
    }
  
    displayPreviousGameweek = () => {
  
      try {
        var gameday =this.state.currentWeek - 1;
  
        this.setState({
        currentWeek: this.state.currentWeek - 1
        });

        console.log(gameday);
  
        this.getFixtures(gameday);
      } catch (error) {
        alert("Exceeded amount of available api calls. Try again in a minute");
      }
    }
  
    displayNextGameweek = (gameday) => {
  
      try {
  
        this.setState({
          currentWeek: gameday
      })
  
      console.log(gameday);
  
      this.getFixtures(gameday);
      } catch (error) {
        alert("Exceeded amount of available api calls. Try again in a minute");
      }
  
  
    }
  
    displayMatchStatistics = async (matchID) => {
  
      try {
        const api_call5 = await fetch(`https://api.football-data.org/v2/matches/${matchID}`, {
          headers: {
            'X-Auth-Token': process.env.REACT_APP_API_KEY
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
      } catch (error) {
        alert("Exceeded amount of available api calls. Try again in a minute");
      }
        
    }

render() 
    {
    return (
        <div>
        {this.state.leagueFixtures.length > 0 && 
            <Table className="fixtures-table" width = "40%" striped hover size="sm" responsive="sm">
            <thead>
            <tr>
            <th colSpan="3">
              <Button id="btn-1" className="arrow-left" onClick={() => this.displayPreviousGameweek(this.state.currentWeek - 1)}>
                <MDBIcon icon="caret-left"/>
              </Button>
              <p className="fixtures-table-details">Gameweek {this.state.currentWeek}</p>
              <Button id="btn-1" className="arrow-right" onClick={() => this.displayNextGameweek(this.state.currentWeek + 1)}>
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
        {this.state.matchInfo.length > 0 && 
        <Table className="fixtures-table" width = "40%" striped hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th colSpan="3">
                <p className="fixtures-table-details">Match details</p>
              </th>
            </tr>  
          </thead>
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
        </div>
        );

    }
}

export default LeagueTable;