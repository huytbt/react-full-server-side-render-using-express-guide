import HomeContainer from '../containers/Home';

export default class Home {
  index (req, res) {
    res.render('home', { content: HomeContainer })
  }
}

