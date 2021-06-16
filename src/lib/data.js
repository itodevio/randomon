const pkg = require("@prisma/client");
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const insert = async () => {
  const pokemon_names = await axios('https://pokeapi.co/api/v2/pokemon?limit=2000')
  for (let i=1; i <= pokemon_names.data.results.length; i++) {
    const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const data = pokemon.data;
    const sprite = data.sprites && Object.keys(data.sprites).length > 0 
      ? data.sprites.front_default
      : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d27c11e3-d4f0-445c-b9d6-efc9db517960/d6g7lwb-34e9670f-1779-4741-9bd4-cd990ab4a8ef.png/v1/fill/w_968,h_826,strp/question_mark_003_pokemon_question_by_the1maguswriter_d6g7lwb-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODc0IiwicGF0aCI6IlwvZlwvZDI3YzExZTMtZDRmMC00NDVjLWI5ZDYtZWZjOWRiNTE3OTYwXC9kNmc3bHdiLTM0ZTk2NzBmLTE3NzktNDc0MS05YmQ0LWNkOTkwYWI0YThlZi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.L31i1Z3PlHViKBAe6X60nWXdrhftsynj5OBIg0rVcJo'

    try {
      await prisma.pokemon.create({
        data: {
          name: data.name,
          pokedex_number: i,
          image_url: sprite
        }
      })
    } catch (err) {
      console.log(err);
      return;
    }
  } 
}

const select = async () => {
  const pokemons = await prisma.pokemon.findMany();
  console.log(pokemons)
}

const update = async () => {
  const pokemons = await prisma.pokemon.findMany();

  for (let i=0; i < pokemons.length; i++) {
    await prisma.pokemon.update({
      where: {
        id: pokemons[i].id
      },
      data: {
        name: pokemons[i].name.charAt(0).toUpperCase() + pokemons[i].name.slice(1)
      }
    })
  }
}

const main = () => {
  update()
    .catch((e) => console.log(e))
    .finally(async () => await prisma.$disconnect())
}

main()