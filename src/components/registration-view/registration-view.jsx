import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./registration-view.scss";

export function RegisterView() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be at least 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Wrong format");
      isReq = false;
    }

    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for registration */
      axios
        .post("https://myanimed-b.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          BirthDate: birthDate,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login!");
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((e) => {
          console.log("error registering the user");
        });
    }
  };

  return (
    <Card className="register-card">
      <Card.Body className="register-card-body">
        <Form className="form" id="register-form">
          <h1 className="welcome-heading">Welcome to MyFlix App!</h1>
          <p className="welcome-heading">Register</p>
          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* code added here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* code added here to display validation error */}
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>
          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* code added here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>
          <Form.Group controlId="formBirthday" className="form-group">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" type="submit" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}