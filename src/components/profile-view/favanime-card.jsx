import { React } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//favorite images

import xMark from "../../img/delete.png";

import "./favanime-card.scss";

export function FavAnimeCard(props) {
  const { anime, deleteAnime } = props;

  return (
    <Card>
      <Link to={`/animes/${anime._id}`}>
        <Card.Img crossOrigin="anonymous" variant="top" src={anime.ImagePath} />
      </Link>
      <Card.Body>
        <Link
          to={`/animes/${anime._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Card.Title className="card-title">{anime.Title}</Card.Title>
        </Link>
        <a
          href="#"
          onClick={() => {
            deleteAnime(anime._id);
          }}
        >
          <img src={xMark} className="x-icon" />
        </a>
      </Card.Body>
    </Card>
  );
}

FavAnimeCard.propTypes = {
  anime: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
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
  user: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  deleteAnime: PropTypes.func.isRequired,
};