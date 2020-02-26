import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import { useHistory } from 'react-router-dom'

// Utils
import { League } from '../../interfaces/League'
import { useLeagueService } from '../../services/leagues'

// Components
import Title from '../../components/Title'
import { LeagueCard } from '../../components/league';

const Discover: React.FC = () => {
  const history = useHistory()
  const { getDiscoverLeagues } = useLeagueService();
  const [ leagues, setLeagues ] = useState<Array<League>>([])

  useEffect(() => {
    getDiscoverLeagues()
      .then(leagues => setLeagues(leagues))
  }, [getDiscoverLeagues])

  return (
    <>
      <Title>Discover</Title>
      <section>
        {
          leagues.map(league => (
            <LeagueCard league={league} key={league.id}>
              <IconButton aria-label="View" onClick={() => history.push(`/league/${league.id}`)}>
                <Visibility />
              </IconButton>
              <Typography component="h6" variant="subtitle2">
                {league.userCount} Player{league.userCount! > 1 ? 's' : ''}
              </Typography>
            </LeagueCard>
          ))
        }
      </section>
    </>
  )
};

export default React.memo(Discover);
