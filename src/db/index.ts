import prisma from 'config/prisma';
import axios from 'config/axios';
import fs from 'fs';
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

export const get_database = async () => {
  const games = await prisma.game.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  const pokemons = await prisma.pokemon.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      games: true,
      types: true,
    },
  });

  const types = await prisma.type.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      double_damage_from: true,
      double_damage_to: true,
      half_damage_from: true,
      half_damage_to: true,
      no_damage_from: true,
      no_damage_to: true,
      games: true,
    },
  });

  const regions = await prisma.region.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      games: true,
    },
  });

  fs.writeFile('database.json', JSON.stringify({
    pokemons, types, games, regions,
  }), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// export const import_database = async () => {
//   // * Criações * //
//   // * Criar pokemons * //
//   for (let i = 0; i < db.pokemons.length; i++) {
//     const pokemon = db.pokemons[i];

//     try {
//       await prisma.pokemon.create({
//         data: {
//           id: pokemon.id,
//           name: pokemon.name,
//           pokedex_number: pokemon.pokedex_number,
//           image_url: pokemon.image_url,
//         },
//       });

//       console.log(`Criou ${pokemon.name}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   console.log('-----------------------------------');

//   // * Criar types * //
//   for (let i = 0; i < db.types.length; i++) {
//     const type = db.types[i];

//     try {
//       await prisma.type.create({
//         data: {
//           id: type.id,
//           name: type.name,
//         },
//       });

//       console.log(`Criou ${type.name}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // * Criar games * //
//   for (let i = 0; i < db.games.length; i++) {
//     const game = db.games[i];

//     try {
//       await prisma.game.create({
//         data: {
//           id: game.id,
//           name: game.name,
//           generation: game.generation,
//         },
//       });

//       console.log(`Criou ${game.name}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // * Criar regions * //
//   for (let i = 0; i < db.regions.length; i++) {
//     const region = db.regions[i];

//     try {
//       await prisma.region.create({
//         data: {
//           id: region.id,
//           name: region.name,
//         },
//       });

//       console.log(`Criou ${region.name}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // * Atualizando * //
//   // * Editar pokemons * //
//   for (let i = 0; i < db.pokemons.length; i++) {
//     const pokemon = db.pokemons[i];

//     try {
//       await prisma.pokemon.update({
//         where: {
//           id: pokemon.id,
//         },
//         data: {
//           games: {
//             set: pokemon.games.map(g => ({ id: g.id })),
//           },
//           types: {
//             set: pokemon.types.map(t => ({ id: t.id })),
//           },
//         },
//       });

//       console.log(`Editou ${pokemon.name}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   console.log('-----------------------------------');

//   // * Editar types * //
//   for (let i = 0; i < db.types.length; i++) {
//     const type = db.types[i];

//     try {
//       await prisma.type.update({
//         where: {
//           id: type.id,
//         },
//         data: {
//           double_damage_from: {
//             set: type.double_damage_from.map(t => ({ id: t.id })),
//           },
//           double_damage_to: {
//             set: type.double_damage_to.map(t => ({ id: t.id })),
//           },
//           half_damage_from: {
//             set: type.half_damage_from.map(t => ({ id: t.id })),
//           },
//           half_damage_to: {
//             set: type.half_damage_to.map(t => ({ id: t.id })),
//           },
//           no_damage_from: {
//             set: type.no_damage_from.map(t => ({ id: t.id })),
//           },
//           no_damage_to: {
//             set: type.no_damage_to.map(t => ({ id: t.id })),
//           },
//           games: {
//             set: type.games.map(g => ({ id: g.id })),
//           },
//         },
//       });

//       console.log(`Editou ${type.name}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // * Editar regions * //
//   for (let i = 0; i < db.regions.length; i++) {
//     const region = db.regions[i];

//     try {
//       await prisma.region.update({
//         where: {
//           id: region.id,
//         },
//         data: {
//           games: {
//             set: region.games.map(g => ({ id: g.id })),
//           },
//         },
//       });

//       console.log(`Editou ${region.name}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
