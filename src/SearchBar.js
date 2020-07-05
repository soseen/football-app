import React from 'react';
import {Form, Button, FormGroup, Navbar} from 'react-bootstrap';
import './SearchBar.css';


class SearchBar extends React.Component {

    state = {
        selectedLeague: "PL"
    }
    
    findClub = () => {
        this.props.selectLeague(this.state.selectedLeague)
    }

    handleChange = (event) => {
        let value = event.target.options[event.target.selectedIndex].getAttribute("name");
        this.setState({
            selectedLeague: value
        })

    }

    render() {
        return ( 
            <Navbar bg="dark" variant="dark" className = "navbar">
            <Form block>
                <FormGroup>
                    <Form.Control as ="select" name="select" id="selectLeague" className="select-css" ref="club" onChange={(e) => this.handleChange(e)}>
                    <option name = "PL">Premier League</option>
                    <option name = "PD">La Liga</option>
                    <option name = "SA">Serie A</option>
                    <option name = "BL1">Bundesliga</option>
                    <option name = "FL1">Ligue 1</option>
                    </Form.Control>
                </FormGroup>
                <Button className="search-btn" variant="dark" id="btn-1" onClick={this.findClub}>Search</Button>
            </Form>
            </Navbar>
            
         );
    }
}

export default SearchBar;