import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

require('../css/login-reg.css')

const styles = {
  errorStyle: {
    color: '#01579B',
  },
  underlineStyle: {
    borderColor: '#01579B',
  },
  floatingLabelStyle: {
    color: 'white',
  },
  floatingLabelFocusStyle: {
    color: '#01579B',
  },
  underlineStyle: {
    borderColor: 'white',
  },
  underlineFocusStyle: {
    borderColor: '#01579B',
  },
  buttons: {
    width: '100px',
    margin: '2px',
    color: 'white'
  }
};


class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {username: '', password: ''}
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit() {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((response) => {
      return (response.json())
    }).then((obj)=>{
      console.log(obj)
      if (obj.success) {
        this.setState({success: obj.success})
      }
    })
    this.setState({username: '', password: ''})
  }

  render () {
    return (
      <div className="blueBackground">
      <div className="container">
        <div className="login">
          <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src="../reactApp/assets/logo.png" alt="Logo" height="75" width="75"/>
          <h1 style={{textAlign: 'center'}}>Login</h1>
          <div>
            <MuiThemeProvider>
              <TextField
                type="text"
                onChange={(e) => this.handleUsernameChange(e)}
                value={this.state.username}
                floatingLabelText="username"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
            </MuiThemeProvider>
          </div>
          <div>
            <MuiThemeProvider>
              <TextField
                type="password"
                onChange={(e) => this.handlePasswordChange(e)}
                value={this.state.password}
                floatingLabelText="password"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
            </MuiThemeProvider>
          </div>
          <div style={{textAlign: 'center'}}>
            <MuiThemeProvider>
              <FlatButton
                style={styles.buttons}
                label="LOGIN"
                onClick={() => this.handleSubmit()}
                hoverColor={'#01579B'}
              />
            </MuiThemeProvider>
          </div>
          <div style={{textAlign: 'center'}}>
            <Link to="/register">
            <MuiThemeProvider>
              <FlatButton
                style={styles.buttons}
                label="REGISTER"
                onClick={() => this.handleSubmit()}
                hoverColor={'#01579B'}
              />
            </MuiThemeProvider></Link>
            {this.state.success ? <Redirect to="/documentPortal" /> : null}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Login
