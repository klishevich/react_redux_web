import React, { PropTypes, Component } from 'react';
import { editSignUpForm, editSignInForm } from '../actions'
import { connect } from 'react-redux';
import axios from 'axios';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import Auth from 'j-toker';
Auth.configure({apiUrl: 'http://localhost:3001/api/v1'});

class TestAxiosContainer extends Component {
  constructor(props) {
    super(props);
    this.handleMakeAuth = this.handleMakeAuth.bind(this);
    this.handleMakeAuth2 = this.handleMakeAuth2.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
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

  handleSignUp() {
    console.log('handleSignUp');
    Auth.emailSignUp({
      email: this.props.signUpForm.login,
      password: 'testtest',
      password_confirmation: 'testtest'
    })
    .then(res => {
      console.log('handleSignUp then',res);
    })
    .fail(res => {
      console.log('handleSignUp fail',res);
      console.log('handleSignUp fail error',res.data.errors.full_messages);
    })
  }

  handleSignIn() {
    console.log('handleSignIn');
    Auth.emailSignIn({
      email: this.props.signInForm.login,
      password: 'testtest'
    })
    .then(res => {
      console.log('handleSignIn then',res);
    })
    .fail(res => {
      console.log('handleSignIn fail',res);
      console.log('handleSignIn fail error',res.data.errors.full_messages);
    })
  }

  render() {
    console.log('TestAxiosContainer.js this.props', this.props);
    const { signUpForm, signInForm } = this.props
    return (
      <div className='TestAxiosContainer'>
        <h1>Testing Muninn Authentication!</h1>
        <div className="row">
          <div className="col-md-4">
            <h2>Sign Up</h2>
            <input
              className="form-control" 
              type='text' 
              name='login' 
              id='login'
              value={signUpForm.login}
              placeholder='Enter Login' 
              onChange={(e)=>this.props.dispatch(editSignUpForm({'login': e.target.value}))}/>
            <button className="btn btn-primary" onClick={this.handleSignUp}>Sign Up</button>
            <div>Password is testtest</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Sign In!!!!</h2>
            <input
              className="form-control" 
              type='text' 
              name='login' 
              id='login'
              value={signInForm.login}
              placeholder='Enter Login' 
              onChange={(e)=>this.props.dispatch(editSignInForm({'login': e.target.value}))}/>
            <button className="btn btn-primary" onClick={this.handleSignIn}>Check Sign In?</button>
            <div>Password is testtest</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Click to Test Axios</h2>
            <a href="#" className="btn btn-primary" onClick={this.handleMakeAuth}>Click to Test Axios</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Click to Test Fetch</h2>
            <a href="#" className="btn btn-primary" onClick={this.handleMakeAuth2}>Click to Test Fetch</a>
          </div>
        </div>
      </div>
    );
  }
}

TestAxiosContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signUpForm: PropTypes.object.isRequired,
  signInForm: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { signUpForm, signInForm } = state;
  // let { login } = signUpForm;
  // login = (typeof(login) === 'undefined') ? 'test601@test.com' : login;
  return {
    signUpForm,
    signInForm
  }
}

TestAxiosContainer = connect(mapStateToProps)(TestAxiosContainer)

export default TestAxiosContainer