import React, { Component } from 'react';
import s from './login-form.css';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      error: ""
    };
  }

  handleGoogle(e) {
    e.preventDefault();
    const ref = this.props.fbRef;

    ref.authWithOAuthPopup("google", (error, authData) => {
      // This check is done as well on FB side, here it's just to
      // prevent showing errors when someone is logged into google
      // but has no auth'd the app yet
      const validEmail = /red-badger\.com/.test(authData.google.email);

      if (error) {
        this.setState({ error: "Login Failed!" });
      } else if (!validEmail) {
        this.setState({ error: "You don't have permisson to access this app." });
      } else {
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: authData.google.displayName,
          email: authData.google.email,
          profileImage: authData.google.profileImageURL
        });
      }
    }, { scope: "email" });
  }

  renderError() {
    const error = this.state.error;
    return error && <p className={s.error}>{error}</p>;
  }

  render() {
    const handleGoogle = this.handleGoogle.bind(this);

    return (
      <div>
        <button className={s.button} onClick={handleGoogle}>Sign in with Google</button>
        {this.renderError()}
      </div>
    );
  }
}
