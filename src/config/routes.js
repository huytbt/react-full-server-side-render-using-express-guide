import Home from '../controllers/home';

const home = new Home();

export default [
  { method: 'get', path: '/', handler: home.index }
];

