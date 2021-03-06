import React from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button } from '@material-ui/core';


// Display list of Players Returned
export function SearchResults(props) {
    return (
        <Grid container direction="row"
            justify="center"
            alignItems="center"
            spacing={6}>
            {props.players.map(playerInfo => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={playerInfo.personId}>
                        
                        <Card>
                            <div className="img-wrapper">
                                <img className="player-img" src={"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/" + playerInfo.personId + ".png"} alt={playerInfo.firstName} width="300px" />
                            </div>
                            <div className="card-head">
                                <Typography variant="h6" >{playerInfo.firstName} {playerInfo.lastName}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">{playerInfo.currentTeam.teamName}</Typography>
                                <img src={'https://www.nba.com/assets/logos/teams/primary/web/' + playerInfo.currentTeam.abbreviation + '.svg'} alt="Team Logo" width="60px" />
                            </div>
                            <CardContent>
                                <div className="player-info-labels">
                                    <Typography variant="subtitle2" color="textSecondary">POSITION</Typography>
                                    <Typography variant='body1' color="textSecondary" gutterBottom>{getFullPosition(playerInfo.pos)}</Typography>
                                </div>
                                <div className="player-info-labels">
                                    <Typography variant="subtitle2" color="textSecondary">HEIGHT</Typography>
                                    <Typography variant='body1' color="textSecondary" gutterBottom>{playerInfo.heightFeet}'{playerInfo.heightInches}"</Typography> 
                                </div>
                                <div className="player-info-labels">
                                    <Typography variant="subtitle2" color="textSecondary">WEIGHT</Typography>
                                    <Typography variant='body1' color="textSecondary" gutterBottom>{playerInfo.weightPounds}lbs</Typography>
                                </div>
                                <div className="player-info-labels">
                                    <Typography variant="subtitle2" color="textSecondary">YEARS PRO</Typography>
                                    <Typography variant='body1' color="textSecondary" gutterBottom>Year {playerInfo.yearsPro}</Typography>
                                </div>
        
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => window.open("https://stats.nba.com/player/" + playerInfo.personId)}>View Stats</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}

//Changes single letter position into full word
function getFullPosition(pos) {
    switch (pos) {
        case 'G':
        case 'G-F':
            return 'Guard';
        case 'F':
        case 'F-C':
        case 'F-G':
            return 'Forward';
        case 'C':
        case 'C-F':
            return 'Center';
        default:
            return null;
    }
}

