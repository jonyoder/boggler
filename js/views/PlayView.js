import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions';

export class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      domain: 'composite',
      username: '',
      password: '',
    };
    this._handleChange = this._handleChange.bind(this);
    this._login = this._login.bind(this);
  }

  _handleChange(event) {
    switch (event.target.name) {
      case 'domain':
        this.state.domain = event.target.value;
        break;
      case 'name':
        this.state.username = event.target.value;
        break;
      case 'password':
        this.state.password = event.target.value;
        break;
    }
  }

  _login(e) {
      e.preventDefault();
      this.props.actions.loginUser(this.state.domain, this.state.username, this.state.password);
  }

  render () {
    return (
      <div>
        <p>Jonathan's Boggle Game</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
//  isAuthenticating   : state.auth.isAuthenticating,
//  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
