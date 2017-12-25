import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './config/routes';

const app = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

routes.forEach(route => {
  app[route.method](route.path, route.handler);
});

const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

