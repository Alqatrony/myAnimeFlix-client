import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Col, Row, Card, Container } from "react-bootstrap";

import "./animes-view.scss";

export class AnimeView extends React.Component {
  addAnime(anime) {
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    const notify = () =>
      toast.success("Anime has been added!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    axios
      .put(
        `https://anime-api-6mg7.onrender.com/users/${username}/animes/${anime._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return notify();
  }

  render() {
    const { anime, onBackClick } = this.props;

    return (
      <Container fluid>
        <h1 className="anime-title">{anime.Title}</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="anime-genre">
                  <span className="label">Genre: </span>
                  <a className="link" href={`/genres/${anime.Genre.Name}`}>
                    <span className="link" variant="link">
                      {Array.isArray(anime?.Genre?.Name)
                        ? anime.Genre.Name.join(", ")
                        : anime?.Genre?.Name || "N/A"}
                    </span>
                  </a>
                </div>
                <div className="anime-mangaartist">
                  <span className="label">MangaArtist: </span>
                  <a
                    className="link"
                    href={`/mangaartists/${anime.MangaArtist.Name}`}
                  >
                    <span className="link">{anime.MangaArtist.Name}</span>
                  </a>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h5 className="label">Description </h5>
                <p className="value">{anime.Description}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <img
              className="anime-poster"
              crossOrigin="anonymous"
              src={anime.ImagePath}
              height="700"
            />
          </Col>
        </Row>
        <Button
          variant="success"
          type="button"
          onClick={() => {
            onBackClick();
          }}
          className="Back"
        >
          <span>Back</span>
        </Button>
      </Container>
    );
  }
}

AnimeView.propTypes = {
  anime: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]).isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    MangaArtist: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
