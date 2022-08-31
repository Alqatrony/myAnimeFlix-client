import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function UpdateUser(props) {
  const {
    username,
    password,
    usernameErr,
    passwordErr,
    email,
    emailErr,
    updateUser,
    deleteUser,
    setUsername,
    setPassword,
    setEmail,
    setBirthDate,
    birthDate,
  } = props;
  return (
    <div className="update-user">
      <h5>Update profile</h5>
      <Form className="update-form">
        <Form.Group controlId="formUsername" className="form-group">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Change username"
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
            placeholder="Change e-mail"
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
            placeholder="Change password"
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
        <Button className="mt-3" type="submit" onClick={updateUser}>
          Update
        </Button>
        <Button className="mt-3" type="submit" onClick={deleteUser}>
          Delete profile
        </Button>
      </Form>
    </div>
  );
}

export default UpdateUser;

UpdateUser.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  usernameErr: PropTypes.string.isRequired,
  passwordErr: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailErr: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setBirthDate: PropTypes.func.isRequired,
  birthDate: PropTypes.string.isRequired,
};