import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null
    };
  }

  handleChange(e) {
    const key = e.target.id;
    this.setState({ [key]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      return;
    }

    this.props.fbRef.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload.");
        document.location.reload();
      }
    });
  }

  render() {
    const { email, password } = this.state;
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <form onSubmit={handleSubmit}>
        <label>Email
          <input value={email} id="email" type="email" onChange={handleChange} />
        </label>

        <label>Password
          <input value={password} id="password" type="password" onChange={handleChange} />
        </label>

        <button>Submit</button>
      </form>
    )
  }
}