import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";

import "./visibility-filter-input.scss";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search..."
    />
  );
}

VisibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default connect(null, { setFilter })(VisibilityFilterInput);