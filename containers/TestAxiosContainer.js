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
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    // this.handleValidateToken = this.handleValidateToken(this);
    // this.handleMakeAuth = this.handleMakeAuth.bind(this);
    // this.handleMakeAuth2 = this.handleMakeAuth2.bind(this);
  }

  handleTestAxiosSignIn(e) {
    console.log('handleTestAxiosSignIn');
    axios.post('http://localhost:3001/api/v1/auth/sign_in', {
      email: 'test601@test.com',
      password: 'testtest',
    })
    .then( res => {
        console.log('success res', res);
        console.log('res.headers', res.headers);
    })
    .catch( err => {
        console.log('fail err.response', err.response);
        console.log('err error full_messages', err.response.data.errors.full_messages);
    });
  }

  handleTestFetchSignIn(e) {
    console.log('handleTestFetchSignIn');
    const postdata = {
      email: 'test601@test.com',
      password: 'testtest',
    }
    fetch('http://localhost:3001/api/v1/auth/sign_in', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'Access-Token, Client, Uid, uid'
      },
      body: JSON.stringify(postdata)
    })
    .then(res => {
      console.log('success res',res);
      console.log('res.headers',res.headers);
    })
    .catch( err => {
        console.log('fail err.response', err.response);
        console.log('err error full_messages', err.response.data.errors.full_messages);
    });
  }

  handleSignUp() {
    console.log('handleSignUp');
    Auth.emailSignUp({
      email: this.props.signUpForm.login,
      password: 'testtest',
      password_confirmation: 'testtest'
    })
    .then(res => {
      console.log('handleSignUp success',res);
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
      console.log('handleSignIn success',res);
      console.log('handleSignUp Auth.user',Auth.user);
    })
    // .then(()=> {
    //   this.handleValidateToken();
    // })
    .fail(res => {
      console.log('handleSignIn fail',res);
      console.log('handleSignIn fail error',res.data.errors.full_messages);
    });
  }

  handleSignOut() {
    Auth.signOut();
  }

  handleValidateToken() {
    console.log('handleValidateToken');
    Auth.validateToken()
      .then( res => {
        console.log('handleValidateToken success',res);
      })
      .fail(res => {
      console.log('handleValidateToken fail',res);
    })
  }

  handleGetTasks() {
    console.log('handleGetTasks');
    axios.get('http://localhost:3001/api/v1/tasks')
    .then( res => {
        console.log('success res', res);
    })
    .catch( err => {
        console.log('fail err', err);
    });
  }

  handleGetTaskTemplates() {
    console.log('handleGetTaskTemplates');
    axios.get('http://localhost:3001/api/v1/task_templates')
    .then( res => {
        console.log('success res', res);
    })
    .catch( err => {
        console.log('fail err', err.response);
    });
  }

  render() {
    console.log('TestAxiosContainer.js this.props', this.props);
    const { signUpForm, signInForm } = this.props
    return (
      <div className='TestAxiosContainer'>
        <h1>Testing Muninn Authentication!</h1>
        <a href='/task_templates.html'>List Task Templates Page!</a>
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
            <h2>Sign In</h2>
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
            <h2>Get Tasks</h2>
            <button className="btn btn-primary" onClick={this.handleGetTasks}>Get Tasks</button>
          </div>
          <div className="col-md-4">
            <h2>Get Task Templates</h2>
            <button className="btn btn-primary" onClick={this.handleGetTaskTemplates}>Get TaskTemplates</button>
          </div>
          <div className="col-md-4">
            <h2>Validate Token</h2>
            <button className="btn btn-primary" onClick={this.handleValidateToken}>Validate Token</button>
          </div>
          <div className="col-md-4">
            <h2>Sign Out</h2>
            <button className="btn btn-primary" onClick={this.handleSignOut}>Sign Out</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Click to Test Axios Sign In</h2>
            <button className="btn btn-primary" onClick={this.handleTestAxiosSignIn}>Test Axios Sign In</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Click to Test Fetch Sign In</h2>
            <button className="btn btn-primary" onClick={this.handleTestFetchSignIn}>Test Fetch Sign In</button>
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