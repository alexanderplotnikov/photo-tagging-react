import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://waldo-a77d8.firebaseio.com/',
});

export default instance;
