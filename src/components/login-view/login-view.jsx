import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://anime-api-6mg7.onrender.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log(e + ": no such user");
      });
  };

  return (
    <Card className="login-card">
      <Card.Body className="login-card-body">
        <Form className="form" id="login-form">
          <h1 className="welcome-heading">Welcome to MyAnimeFlix App!</h1>
          <p className="welcome-heading">Login</p>
          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};