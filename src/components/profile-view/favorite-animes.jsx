import React, { Component } from "react";
import { FavAnimeCard } from "./favanime-card";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import "./profile-view.scss";

export class FavoriteAnimes extends Component {
  render() {
    const { favorites, deleteAnime, user, token } = this.props;

    return (
      <Card>
        <Card.Body>
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <h5 className="label">My favorite animes</h5>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            {favorites.map((m) => {
              return (
                <Col key={m._id} xs={12} md={6} lg={4} className="fav-animes">
                  <FavAnimeCard
                    deleteAnime={deleteAnime}
                    token={token}
                    user={user}
                    anime={m}
                  />
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

//Making states available as props in the component
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};
// dispatch action creators as props to child component
export default connect(mapStateToProps)(FavoriteAnimes);

FavoriteAnimes.propTypes = {
  favorites: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  deleteAnime: PropTypes.func.isRequired,
};