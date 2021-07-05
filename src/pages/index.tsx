import React, { useState, useEffect, useCallback } from 'react';
import { GetStaticProps } from 'next';
import Layout from 'components/Layout';
import * as db from 'db';
import { Pokemon, Game } from 'interfaces';
import PokemonCard from 'components/Pokemon/card';
import { Button, Select } from 'grommet';

type Props = {
  pokemons: Pokemon[]
  games: Game[]
}

const Home: React.FC<Props> = ({ pokemons, games }) => {
  const [team, setTeam] = useState([]);
  const [game, setGame] = useState('All');

  const select_team = useCallback(() => {
    const count = game === 'All' ? pokemons.length : pokemons.filter(p => p.games.find(g => g.name === game)).length;
    const ids = [];
    const new_team = [];

    while (ids.length < 6) {
      const n = Math.floor(Math.random() * (count + 1));

      if (!ids.includes(n)) {
        ids.push(n);
        new_team.push(pokemons[n]);
      }
    }

    setTeam(new_team);
  }, [game]);

  useEffect(() => {
    select_team();
  }, [game]);

  const randomize = () => {
    select_team();
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex h-12 mt-0 md:mt-4 justify-center w-full md:order-2">
          <Button primary label="Randomize!" margin={{ right: 'medium' }} size="large" onClick={randomize} />
          <div className="w-52">
            <Select
              options={['All', ...games.map(g => g.name)]}
              value={game}
              onChange={({ option }) => setGame(option)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center mx-auto w-max md:order-1">
          {
            team.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
          }
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pokemons = await db.get_pokemons();
  const games = await db.get_games();
  return { props: { pokemons, games } };
};

export default Home;
