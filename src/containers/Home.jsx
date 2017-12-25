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

