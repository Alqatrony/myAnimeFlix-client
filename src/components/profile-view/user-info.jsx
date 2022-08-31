import React from "react";
import PropTypes from "prop-types";

function UserInfo(props) {
  const { username, email } = props;
  return (
    <div className="profile-info">
      <h5>Your info</h5>
      <div className="profile-username">
        <span className="label">Name: </span>
        <span className="value">{username}</span>
      </div>
      <div className="profile-email">
        <span className="label">Email: </span>
        <span className="value">{email}</span>
      </div>
    </div>
  );
}

export default UserInfo;