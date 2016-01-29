import React, { Component } from 'react';
import s from './login-form.css';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      error: ""
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
    }, (error, authData) => {
      if (error) {
        this.setState({ error: "Login Failed!" });
        console.error("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload.");
        document.location.reload();
      }
    });
  }

  handleGoogle(e) {
    e.preventDefault();
    const ref = this.props.fbRef;

    ref.authWithOAuthPopup("google", (error, authData) => {
      if (error) {
        this.setState({ error: "Login Failed!" });
        console.error("Login Failed!", error);
      } else {
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: authData.google.displayName,
          email: authData.google.email,
          profileImage: authData.google.profileImageURL
        });

        console.log("Authenticated successfully with payload.");
      }
    }, { scope: "email" });
  }

  renderError() {
    const error = this.props.error || this.state.error;
    return error && <p className={s.error}>{error}</p>;
  }

  render() {
    const { email, password } = this.state;
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const handleGoogle = this.handleGoogle.bind(this);

    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>Email
          <input className={s.input} value={email} id="email" type="email" onChange={handleChange} />
        </label>

        <label className={s.label}>Password
          <input className={s.input} value={password} id="password" type="password" onChange={handleChange} />
        </label>

        <button className={s.button}>Submit</button>
        <button className={s.button} onClick={handleGoogle}>Sign in with Google</button>
        {this.renderError()}
      </form>
    )
  }
}