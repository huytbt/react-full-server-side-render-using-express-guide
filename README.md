# Full server side render React using ExpressJs guide

## 1. Setup dev environment

```bash
# initial package.json to your new source
$ npm init

# install packages
$ npm install --save react react-dom
$ npm install --save express body-parser jade
$ npm install --save babel-runtime
$ npm install --save-dev babel-cli babel-preset-env babel-preset-react
```

Create `.babelrc` into root app as content below
```json
{
  "presets": ["react", "env"]
}
```

Add `start` script into `package.json`
```json
{
  ...
  "scripts": {
    "start": "babel-node src/server.js"
  },
  ...
}
```

## 2. Create source app code

Create app source structure

```
appDir
 |- src
 |   |- components
 |   |- config
 |   |- containers
 |   |- controllers
 |   |- models
 |   |- public
 |   +- views
 |- .babelrc
 +- package.json
```

Create `src/server.js` file as content below

```js
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
```

Create `src/config/routes.js`
```js
import Home from '../controllers/home';

const home = new Home();

export default [
  { method: 'get', path: '/', handler: home.index }
];
```

Create `src/controllers/home.js`
```js
import HomeContainer from '../containers/Home';

export default class Home {
  index (req, res) {
    res.render('home', { content: HomeContainer })
  }
}
```

Create `src/views/home.jade`
```jade
doctype html
html
  head
    title Full server side render React using ExpressJs guide
  body
    !=content
```

Create `src/containers/Home.jsx`
```jsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hello from '../components/Hello'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Hello/>
        <Footer/>
      </div>
    );
  }
}

export default ReactDOMServer.renderToString(<Home />);
```

Create `src/components/Header.jsx`
```jsx
import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Full server side render React using ExpressJs guide</h1>
      </header>
    );
  }
}
```

Create `src/components/Footer.jsx`
```jsx
import React from 'react';

export default class Footer extends React.Component {
  render() {
    return <footer>Have a nice day.</footer>;
  }
}
```

Create `src/components/Hello.jsx`
```jsx
import React from 'react';

export default class Hello extends React.Component {
  render() {
    return <section>Hello world!</section>;
  }
}
```

## 3. Testing

```bash
# start app
$ npm start
```

Browse with address `http://127.0.0.1:8080` to view results.

# Thanks
You can create issues to `https://github.com/huytbt/react-full-server-side-render-using-express-guide/issues`. Or contact me (huytbt@gmail.com, skype: huytbt) to discuss more.

Thank you.