import {
  Box, Text, Card, CardBody, CardHeader, CardFooter,
} from 'grommet';
import { Pokemon } from 'interfaces';
import TypeColors from 'lib/type_colors';
import React from 'react';

type Props = {
  pokemon: Pokemon
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => (
  <Card key={pokemon.name} width="250px" justify="center" align="center" pad="medium" margin="small" responsive>
    <CardHeader className="font-semibold">
      <Text size="large">{pokemon.name}</Text>
    </CardHeader>
    <CardBody pad="small">
      <img src={pokemon.image_url} alt={`${pokemon.name}`} loading="lazy" />
    </CardBody>
    <CardFooter>
      {
        pokemon.types.map(type => (
          <Box
            key={type.id}
            direction="row"
            background={TypeColors[type.name]}
            pad={{ horizontal: 'small', vertical: 'xxsmall' }}
            round
          >
            <Text color="#FFF">{type.name}</Text>
          </Box>
        ))
      }
    </CardFooter>
  </Card>
);

export default PokemonCard;
