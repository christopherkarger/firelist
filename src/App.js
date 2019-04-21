import React, { Component } from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Routes from './Routes';
import { connect } from 'react-redux';
import Loading from './components/Loading/Loading';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        { this.props.loading ? <Loading /> : null }
        { this.props.loggedInStatus ? <Header /> : null }
          <Switch>
            <Routes />           
          </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInStatus: state.login.status,
    loading: state.loading.status
  }  
};

export default connect(mapStateToProps)(App);
