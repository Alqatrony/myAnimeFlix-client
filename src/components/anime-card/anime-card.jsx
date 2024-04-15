import { React, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

//favorite images
import heartEmpty from "../../img/heart_empty.png";
import heartFull from "../../img/heart_full.png";

import "./anime-card.scss";

export function AnimeCard(props) {
  const [favoriteAnimes, setFavoriteAnimes] = useState([]);
  const { anime, favorites } = props;

  // set favorite animes
  const getFavAnimes = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://anime-api-6mg7.onrender.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteAnimes(response.data.FavoriteAnimes);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getFavAnimes();
  }, []);

  // METHODS

  //calling the API to add a favorite Anime to the user
  const addAnime = (id) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://anime-api-6mg7.onrender.com/users/${user}/animes/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        //refresh state
        getFavAnimes();
        console.log(favorites);
      })
      .catch((error) => console.error(error));
  };

  //calling API to remove anime from the users list
  const deleteAnime = (id) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(`https://anime-api-6mg7.onrender.com/users/${user}/animes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        //refresh state
        getFavAnimes();
      })
      .catch((error) => console.error(error));
  };

  //when clicked the anime is either added/removed from the user via the API
  const favAnimeClick = (e) => {
    e.preventDefault();
    let favAnimesIds = favoriteAnimes.map((m) => m._id);
    let animeId = anime._id;
    if (favAnimesIds.includes(animeId)) {
      deleteAnime(animeId);
    } else {
      addAnime(animeId);
    }
  };

  //icon handler
  const iconHandle = () => {
    let favAnimesIds = favoriteAnimes.map((m) => m._id);
    let animeId = anime._id;
    if (favAnimesIds.includes(animeId)) {
      return heartFull;
    } else {
      return heartEmpty;
    }
  };

  return (
    <Card className="anime-card" style={{ width: '18rem', margin: '10px' }}>
      <Link to={`/animes/${anime._id}`}>
        <Card.Img crossOrigin="anonymous" variant="top" src={anime.ImagePath} />
      </Link>
      <Card.Body>
        <Card.Title className="card-title">{anime.Title}</Card.Title>
        <a
          href="#"
          onClick={(e) => {
            favAnimeClick(e);
          }}
        >
          <img src={iconHandle()} className="fav-icon" />
        </a>
        <Card.Text>{anime.Genre.Name.join(", ")}</Card.Text>
        <a className="card-button" href={`/animes/${anime._id}`}>
            <span>Anime Details</span>
        </a>
      </Card.Body>
    </Card>
  );
}

//Making states available as props in the component
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};
// dispatch action creators as props to child component
export default connect(mapStateToProps)(AnimeCard);

AnimeCard.propTypes = {
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
};