import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { toast } from "react-toastify";
import {
  auth,
  emailProvider,
  facebookProvider,
  githubProvider,
  googleProvider,
  twitterProvider,
} from "../tools/firebase";
import "./css/Login.css";
import logo from "../img/logo.png";
import { MID_TOAST_DURATION } from "../util/constants";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      facebookProvider.providerId,
      googleProvider.providerId,
      twitterProvider.providerId,
      githubProvider.providerId,
      emailProvider.providerId,
    ],
    signInSuccessUrl: "/",
  };

  const signInWithEmail = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  const registerWithEmail = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        toast.success(`Successfully registered ${email}`, {
          autoClose: MID_TOAST_DURATION,
        });
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={logo} alt="" />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signInWithEmail}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the MASTER MENU Conditions of Use & Sale.
          Please see our Privacy Notice.
        </p>

        <button onClick={registerWithEmail} className="login__registerButton">
          Create Your Master Menu Account
        </button>

        <p>
          In order to register an account, enter the email and password you
          would like to use in their respective boxes and click 'Create Your
          Master Menu Account'
        </p>

        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </div>
  );
}

export default Login;
