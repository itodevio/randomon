import prisma from 'config/prisma';
import axios from 'config/axios';

// * Pokemon Controller * //

export const get_pokemons = async () => {
  return await prisma.pokemon.findMany({
    orderBy: {
      pokedex_number: 'asc'
    },
    include: {
      types: true
    }
  });
}

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
          id: n
        },
        include: {
          types: true
        }
      })

      pokemons.push(pokemon);
    }
  }

  return pokemons;
}

export const update_pokemons_index = async () => {
  const pokemons = await get_pokemons();

  for (let i=1; i <= pokemons.length; i++) {
    await prisma.pokemon.update(
      {
        where: {
          id: i + 1
        },
        data: {
          id: i
        }
      }
    )
  }
}

export const add_types_to_pokemons = async () => {
  const pokemons = await get_pokemons();
  const types = await get_types();

  for (let i=1; i <= pokemons.length; i++) {
    const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`).then(r => r.data);

    const pokemon_types = []

    for (let i=0; i < pokemon.types.length; i++) {
      const t = pokemon.types[i];
      const idx = parseInt(t.type.url.split('/type/')[1].replace('/', ''))

      if (idx < types.length) {
        pokemon_types.push({ id: idx })
      }
    }

    await prisma.pokemon.update(
      {
        where: {
          id: i
        },
        data: {
          types: {
            set: pokemon_types 
          }
        }
      },
    )
  }
}

// * Type Controller * //

export const get_types = async () => {
  return await prisma.type.findMany({
    orderBy: {
      id: 'asc'
    },
    include: { 
      pokemons: true 
    }
  })
}

export const update_type_name = async () => {
  const types = await get_types();

  for (let i=0; i < types.length; i++) {
    const type = types[i];

    await prisma.type.update({
      where: {
        id: type.id
      },
      data: {
        name: type.name.charAt(0).toUpperCase() + type.name.slice(1)
      }
    })
  }
}

export const add_pokemons_to_types = async () => {
  const types = await get_types();

  for (let i=1; i <= types.length; i++) {
    const type = await axios(`https://pokeapi.co/api/v2/type/${i}`).then(r => r.data);

    const type_pokemons = []

    for (let i=0; i < type.pokemon.length; i++) {
      const p = type.pokemon[i];
      const idx = parseInt(p.pokemon.url.split('/pokemon/')[1].replace('/', ''))
      
      if (idx < 1000) { // * removing non cannon pokemons
        type_pokemons.push({ id: idx })

      }
    }

    await prisma.type.update(
      {
        where: {
          id: i
        },
        data: {
          pokemons: {
            set: type_pokemons 
          }
        }
      },
    )
  }
}