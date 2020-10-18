import React, { useState } from 'react';
import { SearchResults } from './SearchResults';
import { Grid, Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import teams from './Teams';




function NBASearch() {

    const [searchField, setSearchField] = useState();
    const [isLoading, setIsLoading] = useState();
    const [fullNbaData, setFullNbaData] = useState();
    const [nbaData, setNbaData] = useState();


    // Fetch API Stats & Update State

    async function getNBAPlayers() {

        const url = 'https://cors-anywhere.herokuapp.com/https://data.nba.net/10s/prod/v1/2019/players.json';

        
        if (searchField !== undefined) {
            setIsLoading(true);
            if (!fullNbaData) {
                const playerRes = await fetch(url);
                const playerData = addMissingValues(await playerRes.json());
                console.log(playerData);
                setFullNbaData(playerData);
                setNbaData(filterPlayersResponse(playerData, searchField));
                setIsLoading(false);
                console.log("Using API Call");
            } else {
                setNbaData(filterPlayersResponse(fullNbaData, searchField));
                setIsLoading(false);
                console.log("Using data in state");
            }
        }

    }

    function handleChange(e) {
        e.preventDefault();
        setSearchField(e.target.value);
    }
    function handleKeyDown(e) {
        if(e.key === 'Enter') {
            getNBAPlayers();
        }
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <p>Search for an NBA Player</p>
            <div className="search-box">
                <TextField fullWidth label="e.g. Stephen Curry" variant="outlined" onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            <Button onClick={getNBAPlayers} variant="contained" size="large" startIcon={<SearchIcon />}>Find</Button>
            {isLoading ? <p className="load-indicator">Loading...</p> : <p></p>}
            {nbaData ? <SearchResults players={nbaData} /> : null}
        </Grid>
    );
}


//Functions for handling API Data

function addMissingValues(response) {

    //Filter Out Players missing Team Info to ignore irrelevant Players
    const data = response.league.standard.filter(player => player.teams !== undefined && player.teams.length > 0);

    for (var i = 0; i < data.length; i++) {

        // Adds Full Name property to match against Search query
        data[i].fullName = data[i].firstName.toLowerCase() + ' ' + data[i].lastName.toLowerCase();

        // Adds Current Team info beyond TeamId
        var latest = data[i].teams.length - 1;
        data[i].currentTeam = getPlayerTeam(data[i].teams[latest].teamId);

        // Adds Player Age
        data[i].age = getPlayerAge(data[i].dateOfBirthUTC);
    }

    return data;
}

//Filter Search Results
function filterPlayersResponse(res, query) {
    // Look into updating with Regex 'i' to test for contains case insensitive
    const searchRes = res.filter(player => player.fullName.includes(query.toLowerCase()));
    return searchRes;
}

// Calcuating Age of Player without Moment.js attr to: https://stackoverflow.com/a/15555947/1975231
function getPlayerAge(dob) {
    var birthday =+ new Date(dob);
    return ~~((Date.now() - birthday) / (31557600000));
  }

//Return Team info from TeamId
function getPlayerTeam(id) {
    const playerTeam = teams.find(team => team.teamId.toString() === id);
    return playerTeam;
}


export default NBASearch;
