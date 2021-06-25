import prisma from 'config/prisma';
import axios from 'config/axios';

// * Pokemon Controller * //

export const get_pokemons = async () => prisma.pokemon.findMany({
  orderBy: {
    pokedex_number: 'asc',
  },
  include: {
    types: true,
  },
});

export const get_dash_pokemons = async () => prisma.pokemon.findMany({
  where: {
    name: {
      contains: '-',
    },
  },
});

export const get_random_team = async () => {
  const count = await prisma.pokemon.count();

  const ids = [];
  const pokemons = [];

  while (ids.length < 6) {
    const n = Math.floor(Math.random() * (count + 1));

    if (!ids.includes(n)) {
      ids.push(n);

      const pokemon = await prisma.pokemon.findUnique({
        where: {
          id: n,
        },
        include: {
          types: true,
        },
      });

      pokemons.push(pokemon);
    }
  }

  return pokemons;
};

export const update_pokemons_index = async () => {
  const pokemons = await get_pokemons();

  for (let i = 1; i <= pokemons.length; i++) {
    await prisma.pokemon.update(
      {
        where: {
          id: i + 1,
        },
        data: {
          id: i,
        },
      },
    );
  }
};

export const add_types_to_pokemons = async () => {
  const pokemons = await get_pokemons();
  const types = await get_types();

  for (let i = 1; i <= pokemons.length; i++) {
    const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`).then(r => r.data);

    const pokemon_types = [];

    for (let j = 0; j < pokemon.types.length; j++) {
      const t = pokemon.types[j];
      const idx = parseInt(t.type.url.split('/type/')[1].replace('/', ''), 10);

      if (idx < types.length) {
        pokemon_types.push({ id: idx });
      }
    }

    await prisma.pokemon.update(
      {
        where: {
          id: i,
        },
        data: {
          types: {
            set: pokemon_types,
          },
        },
      },
    );
  }
};

// export const add_games_to_pokemon = async () => {
//   const my_pokemons = await get_pokemons();
//   const my_games = await get_games();
//   const data = my_games.map(g => ({ name: g.name.toLowerCase(), id: g.id, pokemons: [] }));

//   for (let i = 0; i < my_pokemons.length; i++) {
//     const my_pokemon = my_pokemons[i];
//     const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${my_pokemon.id}`).then(r => r.data);

//     const games = pokemon.game_indices.map(p => ({ id: parseInt(p.version.url.split('/version/')[1].replace('/', ''), 10) }));

//     const data = games.game_indices.map(g => ({ name: g.version.name, pokemons: [] }));

//     for (let i = 0; i < 34; i++) {

//     }

//     // console.log(games);
//     // await prisma.pokemon.update({
//     //   where: {
//     //     id: my_pokemon.id,
//     //   },
//     //   data: {
//     //     games: {
//     //       set: games,
//     //     },
//     //   },
//     // });

//     console.log(`Atualizou ${my_pokemon.name}`);
//   }
// };

// * Type Controller * //

export const get_types = async () => prisma.type.findMany({
  orderBy: {
    id: 'asc',
  },
  include: {
    pokemons: true,
  },
});

export const update_type_name = async () => {
  const types = await get_types();

  for (let i = 0; i < types.length; i++) {
    const type = types[i];

    await prisma.type.update({
      where: {
        id: type.id,
      },
      data: {
        name: type.name.charAt(0).toUpperCase() + type.name.slice(1),
      },
    });
  }
};

export const add_pokemons_to_types = async () => {
  const types = await get_types();

  for (let i = 1; i <= types.length; i++) {
    const type = await axios(`https://pokeapi.co/api/v2/type/${i}`).then(r => r.data);

    const type_pokemons = [];

    for (let j = 0; j < type.pokemon.length; j++) {
      const p = type.pokemon[j];
      const idx = parseInt(p.pokemon.url.split('/pokemon/')[1].replace('/', ''), 10);

      if (idx < 1000) { // * removing non cannon pokemons
        type_pokemons.push({ id: idx });
      }
    }

    await prisma.type.update(
      {
        where: {
          id: i,
        },
        data: {
          pokemons: {
            set: type_pokemons,
          },
        },
      },
    );
  }
};

export const add_types_relation = async () => {
  const types = await get_types();

  for (let i = 1; i <= types.length; i++) {
    const type = await axios(`https://pokeapi.co/api/v2/type/${i}`).then(r => r.data);
    console.log(type.damage_relations);

    const double_from = type.damage_relations.double_damage_from.map(t => {
      const idx = parseInt(t.url.split('/type/')[1].replace('/', ''), 10);
      return { id: idx };
    });

    const double_to = type.damage_relations.double_damage_to.map(t => {
      const idx = parseInt(t.url.split('/type/')[1].replace('/', ''), 10);
      return { id: idx };
    });
    const half_from = type.damage_relations.half_damage_from.map(t => {
      const idx = parseInt(t.url.split('/type/')[1].replace('/', ''), 10);
      return { id: idx };
    });
    const half_to = type.damage_relations.half_damage_to.map(t => {
      const idx = parseInt(t.url.split('/type/')[1].replace('/', ''), 10);
      return { id: idx };
    });
    const no_from = type.damage_relations.no_damage_from.map(t => {
      const idx = parseInt(t.url.split('/type/')[1].replace('/', ''), 10);
      return { id: idx };
    });
    const no_to = type.damage_relations.no_damage_to.map(t => {
      const idx = parseInt(t.url.split('/type/')[1].replace('/', ''), 10);
      return { id: idx };
    });

    await prisma.type.update({
      where: {
        id: i,
      },
      data: {
        double_damage_from: {
          set: double_from,
        },
        double_damage_to: {
          set: double_to,
        },
        half_damage_from: {
          set: half_from,
        },
        half_damage_to: {
          set: half_to,
        },
        no_damage_from: {
          set: no_from,
        },
        no_damage_to: {
          set: no_to,
        },
      },
    });
  }
};

// * Game Controller * //

export const get_games = async () => prisma.game.findMany({
  orderBy: {
    id: 'asc',
  },
});

export const create_games_and_regions = async () => {
  const games = await axios('https://pokeapi.co/api/v2/version?limit=50').then(r => r.data);

  for (let i = 1; i <= games.results.length; i++) {
    const game = await axios(`https://pokeapi.co/api/v2/version/${i}`).then(r => r.data);
    const group = await axios(game.version_group.url).then(r => r.data);

    await prisma.game.create({
      data: {
        id: i,
        name: game.name.charAt(0).toUpperCase() + game.name.slice(1),
        generation: parseInt(group.generation.url.split('/generation/')[1].replace('/', ''), 10),
      },
    });

    console.log(`Criou game ${game.name.charAt(0).toUpperCase() + game.name.slice(1)}`);
  }

  const regions = await axios('https://pokeapi.co/api/v2/region').then(r => r.data);

  for (let i = 1; i <= regions.results.length; i++) {
    await prisma.region.create({
      data: {
        id: i,
        name: regions.results[i].name.charAt(0).toUpperCase() + regions.results[i].name.slice(1),
      },
    });

    console.log(`Criou region ${regions.results[i].name.charAt(0).toUpperCase() + regions.results[i].name.slice(1)}`);
  }
};

export const update_games = async () => {
  const games = await axios('https://pokeapi.co/api/v2/version?limit=50').then(r => r.data);

  for (let i = 1; i <= games.results.length; i++) {
    const game = await axios(`https://pokeapi.co/api/v2/version/${i}`).then(r => r.data);
    const group = await axios(game.version_group.url).then(r => r.data);
    const generation = await axios(group.generation.url).then(r => r.data);

    const regions = group.regions.map(r => ({ id: parseInt(r.url.split('/region/')[1].replace('/', ''), 10) })).filter(r => r.id < 1000);
    const types = generation.types.map(t => ({ id: parseInt(t.url.split('/type/')[1].replace('/', ''), 10) })).filter(t => t.id < 1000);

    // console.log({
    //   name: game.name,
    //   id: i,
    //   regions,
    //   types,
    // });

    await prisma.game.update({
      where: {
        id: i,
      },
      data: {
        regions: {
          set: regions,
        },
        types: {
          set: types,
        },
      },
    });

    console.log(`Atualizou game ${game.name.charAt(0).toUpperCase() + game.name.slice(1)}`);
  }
};
