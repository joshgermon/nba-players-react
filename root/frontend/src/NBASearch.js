import React, { useState } from 'react';

const players = require('./players.json');


function NBASearch() {
    
    const [searchField, setSearchField] = useState();
    const [isLoading, setIsLoading] = useState();
    const [nbaData, setNbaData] = useState();

    // Fetch API Stats & Update State

    function getNBAPlayerStats() {
        //Filter Local JSON Player data
        // console.log(players.filter(player => player.firstName.includes(searchField)));

        // Ball dont lie API
        // const url = 'https://www.balldontlie.io/api/v1/players'
        // const urlSearch = url + '?search=' + encodeURIComponent(searchField);
        const url = 'https://data.nba.net/10s/prod/v1/2019/players.json';

        // setIsLoading(true);
        // fetch(urlSearch)
        //     .then(res => res.json())
        //     .then(data => setNbaData(addPlayerImage(data)))
        //     .then(setIsLoading(false));
        // console.log("Fetching:" + urlSearch);

        setIsLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => setNbaData(filterPlayersResponse(data.league.standard, searchField)))
            .then(setIsLoading(false));
    }

    function handleChange(e) {
        e.preventDefault();
        setSearchField(e.target.value);
        console.log('Changed');
    }

    return (
        <div>
            <p>Search for an NBA Player</p>
            <input type="text" placeholder="i.e. Stephen Curry" onChange={handleChange} />
            <button onClick={getNBAPlayerStats}>Search</button>
            {isLoading ? <p>Loading...</p> : <p></p>}
            {nbaData ? <SearchResults players={nbaData} /> : <p>No Results</p>}
        </div>
    );
}


// Display list of Players Returned

function SearchResults(props) {
    return(
    <div>
        {props.players.map(playerInfo => {
            return (
            <div key={playerInfo.personId}>
                <img src={"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/"+ playerInfo.personId +".png"} alt={playerInfo.firstName} />
                <h3 className="player-name">{playerInfo.firstName} {playerInfo.lastName}</h3>
                <div className="player-info">
                {playerInfo.pos ?
                    <p>Position: {playerInfo.pos}</p> : null}
                {playerInfo.heightFeet ?
                    <p>Height: {playerInfo.heightFeet}'{playerInfo.heightInches}"</p> : null }
                {playerInfo.weightPounds ?
                    <p>Weight: {playerInfo.weightPounds}lbs</p> : null}
                </div>
                
            </div>
            )
        })}
    </div>
    );
}


//Filter Search Results & Add Picture if Available

function filterPlayersResponse(res, query) {
    // Look into updating with Regex 'i' to test for contains case insensitive
    const searchRes = res.filter(player => player.firstName.toLowerCase().startsWith(query.toLowerCase()));
    for(var i = 0; i < searchRes.length; i++) {
        searchRes[i].headshot = getPlayerImage(searchRes[i].firstName, searchRes[i].lastName);
        console.log("data updating on number: " + i);
    }
    return searchRes;
}

//Iterate over players adding a Player Image value from different API

function addPlayerImage(data) {
    for(var i = 0; i < data.data.length; i++) {
        data.data[i].player_image = getPlayerImage(data.data[i].first_name, data.data[i].last_name);
        console.log("data updating on number: " + i);
    }
    console.log(data);
    return data;
}


//Retrieve Player Image from https://nba-players.herokuapp.com/

function getPlayerImage(fname, lname) {
    const firstName = fname.replace(/ /g,"_");
    const lastName = lname.replace(/ /g,"_");
    console.log("https://nba-players.herokuapp.com/players/" + lastName + '/' + firstName);
    return( "https://nba-players.herokuapp.com/players/" + lastName + '/' + firstName);
}


export default NBASearch;