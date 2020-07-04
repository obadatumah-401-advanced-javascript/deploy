import React from 'react';
import ReactJson from 'react-json-view'
import { Switch, Route } from 'react-router-dom';
import './app.scss';


import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form/form.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      header: [],
      results: []
    };
  }
  handleForm = (results, header) => {
    this.setState({ results, header });

  }


  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/">
            <Form title="GO" handler={this.handleForm} />
            <ReactJson src={this.state.header} />
            <ReactJson src={this.state.results} />
          </Route>
          <Route path="/api">
            <ReactJson src={this.state.results} />
            <ReactJson src={this.state.header} />
          </Route>
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;