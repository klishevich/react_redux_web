import React, { PropTypes, Component } from 'react';
import { editSignUpForm, editSignInForm, signIn } from '../actions'
import { connect } from 'react-redux';
import axios from 'axios';
import { url } from '../constants';

class TestMuninnAuthContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleGetTaskTemplatesAuth = this.handleGetTaskTemplatesAuth.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignUp() {
    console.log('handleSignUp');
    axios.post(url + '/auth', {
      email: this.props.signUpForm.login,
      password: 'testtest',
      password_confirmation: 'testtest',
    })
    .then( res => {
        console.log('SUCCESS res', res);
        console.log('res.headers', res.headers);
    })
    .catch( err => {
        console.log('ERROR err.response', err.response);
        console.log('err.response.data.errors.full_messages', err.response.data.errors.full_messages);
    });
  }

  handleGetTasks() {
    console.log('handleGetTasks');
    axios.get( url + '/tasks')
    .then( res => {
        console.log('SUCCESS res', res);
    })
    .catch( err => {
        console.log('ERROR err', err);
    });
  }

  handleGetTaskTemplates() {
    console.log('handleGetTaskTemplates');
    axios.get( url + '/task_templates')
    .then( res => {
        console.log('SUCCESS res', res);
    })
    .catch( err => {
        console.log('ERROR err', err.response);
    });
  }

  handleGetTaskTemplatesAuth() {
    console.log('handleGetTaskTemplatesAuth');
    axios.get( url + '/task_templates', { headers: this.props.signInForm.headers})
    .then( res => {
        console.log('SUCCESS res', res);
    })
    .catch( err => {
        console.log('ERROR err', err.response);
    });
  }

  handleSignOut() {
    console.log('handleSignOut');
    axios.delete( url + '/auth/sign_out', { headers: this.props.signInForm.headers})
    .then( res => {
        console.log('SUCCESS res', res);
    })
    .catch( err => {
        console.log('ERROR err', err.response);
    });
  }

  render() {
    console.log('TestMuninnAuthContainer.js this.props', this.props);
    const { signUpForm, signInForm, dispatch } = this.props
    return (
      <div className='TestMuninnAuthContainer'>
        <h1>Testing Muninn Authentication!</h1>
        <div>
          <h2>Sign Up</h2>
          <input
            value={signUpForm.login}
            placeholder='Enter Login' 
            onChange={(e)=>dispatch(editSignUpForm({'login': e.target.value}))}/>
          <button onClick={this.handleSignUp}>Sign Up</button>
          <div>Password is testtest</div>
        </div>
        <div>
          <h2>Sign In</h2>
          <input
            value={signInForm.login}
            placeholder='Enter Login' 
            onChange={ e => dispatch(editSignInForm({'login': e.target.value}))}/>
          <button onClick={()=>dispatch(signIn())}>Sign In</button>
          <div>Password is testtest</div>
        </div>
        <div>
          <h2>Get Task Templates with Authentication</h2>
          <div>TaskTemplates are authenticable resource. <b>First you need to Sign In.</b></div>
          <br/>
          <button onClick={this.handleGetTaskTemplatesAuth}>Get TaskTemplates (with auth)</button>
        </div>
        <div>
          <h2>Sign Out</h2>
          <button onClick={this.handleSignOut}>Sign Out</button>
        </div>
        <br/>
        <a href='/task_templates.html'>Another Page</a>
      </div>
    );
  }
}

TestMuninnAuthContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signUpForm: PropTypes.object.isRequired,
  signInForm: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { signUpForm, signInForm } = state;
  return {
    signUpForm,
    signInForm,
  }
}

TestMuninnAuthContainer = connect(mapStateToProps)(TestMuninnAuthContainer)

export default TestMuninnAuthContainer
