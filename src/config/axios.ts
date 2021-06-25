import axios from 'axios';

axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export default axios;
