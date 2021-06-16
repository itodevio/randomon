import React from 'react'
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client';
import Layout from 'components/Layout'

import { Pokemon } from 'interfaces';
import { Grid, Card, CardBody, CardHeader } from 'grommet';

type Props = {
  pokemons: Pokemon[]
}

const Home: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="flex flex-wrap justify-center">
        {
          props.pokemons.map(pokemon => (
            <Card key={pokemon.name} justify="center" align="center" pad="medium" margin="small">
              <CardHeader>{pokemon.name}</CardHeader>
              <CardBody>
                <img src={pokemon.image_url} alt={`${pokemon.name}`} />
              </CardBody>
            </Card>
          ))
        }
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();

  const pokemons = await prisma.pokemon.findMany();

  return { props: { pokemons } };
}

export default Home;
