import React, { Component } from 'react';
import s from './login-form.css';

export default class LoginForm extends Component {
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
    const error = this.props.error;
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
