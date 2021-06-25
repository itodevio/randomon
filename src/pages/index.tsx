import React, { useState, useEffect, useCallback } from 'react';
import { GetStaticProps } from 'next';
import Layout from 'components/Layout';
import * as db from 'db';
import { Pokemon } from 'interfaces';
import PokemonCard from 'components/Pokemon/card';
import { Button } from 'grommet';

type Props = {
  pokemons: Pokemon[]
}

const Home: React.FC<Props> = (props) => {
  const [team, setTeam] = useState([]);

  const select_team = useCallback(() => {
    const count = props.pokemons.length;
    const ids = [];
    const new_team = [];

    while (ids.length < 6) {
      const n = Math.floor(Math.random() * (count + 1));

      if (!ids.includes(n)) {
        ids.push(n);
        new_team.push(props.pokemons[n]);
      }
    }

    setTeam(new_team);
  }, []);

  useEffect(() => {
    select_team();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex justify-center w-full md:order-2">
          <Button primary label="Randomize!" margin={{ vertical: 'medium' }} size="large" onClick={select_team} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center mx-auto w-max">
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
  // console.log(await db.get_dash_pokemons());
  return { props: { pokemons } };
};

export default Home;
