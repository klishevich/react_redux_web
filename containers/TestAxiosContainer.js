import React, { PropTypes, Component } from 'react';
import { editSignUpForm } from '../actions'
import { connect } from 'react-redux';
import axios from 'axios';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import Auth from 'j-toker';
Auth.configure({apiUrl: 'http://localhost:3001/api/v1'});
// Auth = require('j-toker');
// import { Auth } from 'j-tokers';
// var Auth = require('../../node_modules/j-toker/src/j-toker.js');

class TestAxiosContainer extends Component {
  constructor(props) {
    super(props);
    this.handleMakeAuth = this.handleMakeAuth.bind(this);
    this.handleMakeAuth2 = this.handleMakeAuth2.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleCheckSignIn = this.handleCheckSignIn.bind(this);
  }

  handleMakeAuth(e) {
    e.preventDefault();
    console.log('handleMakeAuth clicked');
    axios.post('http://localhost:3001/api/v1/auth', {
      headers: {
        'Access-Control-Expose-Headers': 'Access-Token, Client, Uid, uid'
      },
      email: 'test112@test.com',
      password: 'testtest',
      password_confirmation: 'testtest', 
    })
    .then(function (response) {
        console.log('anchor function (response)');
        console.log('response', response);
        console.log('response.headers', response.headers);
    })
    .catch(function (error) {
        console.log('anchor function (error)');
        console.log('response error.response', error.response);
        console.log('response error full_messages', error.response.data.errors.full_messages);
    });
  }

  handleMakeAuth2(e) {
    e.preventDefault();
    const postdata = {
      email: 'test303@test.com',
      password: 'testtest',
      password_confirmation: 'testtest', 
    }
    fetch('http://localhost:3001/api/v1/auth', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'Access-Token, Client, Uid, uid'
      },
      body: JSON.stringify(postdata)
    })
    .then(data => {
      console.log('handleMakeAuth2',data);
      console.log('handleMakeAuth2 headers',data.headers);
    })
  }

  handleLoginChange(e) {
    console.log('e.target.value',e.target.value);
    let signUpFormItem = {};
    signUpFormItem['login'] = e.target.value;
    const { dispatch } = this.props;
    console.log('e.target.action', editSignUpForm(signUpFormItem));
    dispatch(editSignUpForm(signUpFormItem));
  }

  handleSignUp() {
    console.log('handleSignUp');
    Auth.emailSignUp({
      email: this.props.login,
      password: 'testtest',
      password_confirmation: 'testtest'
    })
    .then(res => {
      console.log('handleSignUp then',res);
    })
    .fail(res => {
      console.log('handleSignUp fail',res);
    })
  }

  handleCheckSignIn() {
    console.log('handleCheckSignIn');
  }

  render() {
    console.log('TestAxiosContainer.js this.props', this.props);
    const { login } = this.props
    return (
      <div className='TestAxiosContainer'>
        <h1>Testing Muninn Authentication</h1>
        <div className="row">
          <h2>Sign Up</h2>
          <div>Password is testtest</div>
          <div className="col-md-4">
            <input
              className="form-control" 
              type='text' 
              name='login' 
              id='login'
              value={login}
              placeholder='Enter Login' 
              onChange={this.handleLoginChange}/>
            <button className="btn btn-primary" onClick={this.handleSignUp}>Sign Up</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Sign In</h2>
            <button className="btn btn-primary" onClick={this.handleCheckSignIn}>Check Sign In?</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <a href="#" className="btn btn-primary" onClick={this.handleMakeAuth}>Click to Test Axios</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <a href="#" className="btn btn-primary" onClick={this.handleMakeAuth2}>Click to Test Fetch</a>
          </div>
        </div>
      </div>
    );
  }
}

TestAxiosContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { signUpForm } = state;
  let { login } = signUpForm;
  login = (typeof(login) === 'undefined') ? 'test601@test.com' : login;
  return {
    login
  }
}

TestAxiosContainer = connect(mapStateToProps)(TestAxiosContainer)

export default TestAxiosContainer