// main-view.jsx
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  setAnimes,
  setGenres,
  setUser,
  setFavorites,
} from "../../actions/actions.js";
import AnimesList from "../animes-list/animes-list";

import { LoginView } from "../login-view/login-view";
import { AnimeView } from "../animes-view/animes-view";
import NavBar from "../navbar-view/navbar-view";
import { Container, Row, Col } from "react-bootstrap";
import { RegisterView } from "../registration-view/registration-view";
import MangaArtistView from "../mangaartist-view/mangaartist-view";
import GenreView from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
  }

  // METHODS

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem("user"));
      this.getAnimes(accessToken);
      this.getGenres(accessToken);
      this.getFavAnimes();
    }
  }

  // Set Animes state in the store
  getAnimes(token) {
    axios
      .get("https://anime-api-6mg7.onrender.com/animes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the setAnimes state
        this.props.setAnimes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // set Genres state in the store
  getGenres(token) {
    axios
      .get("https://anime-api-6mg7.onrender.com/genre", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the setGenres state
        this.props.setGenres(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // set favorite Animes in the store
  getFavAnimes() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://anime-api-6mg7.onrender.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setFavorites(response.data.FavoriteAnimes);
      })
      .catch((error) => console.error(error));
  }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getAnimes(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser(null);
    window.open("/", "_self");
  }

  render() {
    // animes is extracted from this.props rather than from the this.state
    let { animes, user } = this.props;

    return (
      <Router>
        <NavBar
          onBackLog={() => {
            this.onLoggedOut();
          }}
          user={user}
        />
        <Container className="main-view">
          <Row className="justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col md={7}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the animes have been loaded
                if (animes.length === 0)
                  return <div className="main-view">Loading...</div>;
                return <AnimesList animes={animes} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col md={7}>
                    <RegisterView />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={(history, match) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col>
                    <ProfileView
                      history={history}
                      match={match}
                      onBackLog={() => {
                        this.onLoggedOut();
                      }}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/animes/:id"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the animes have been loaded
                if (animes.length === 0)
                  return <div className="main-view"></div>;
                return (
                  <Col md={8}>
                    <AnimeView
                      anime={animes.find((m) => m.id === match.params.id)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/mangaArtists/:Name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the animes have been loaded
                if (animes.length === 0)
                  return <div className="main-view"></div>;
                return (
                  <Col md={8}>
                    <MangaArtistView
                      mangaartist={
                        animes.find(
                          (m) => m.MangaArtist.Name === match.params.Name
                        ).MangaArtist
                      }
                      animes={animes.filter(
                        (m) => m.MangaArtist.Name === match.params.Name
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              exact
              path="/genre/:name"
              render={({ match, history }) => {
                const genreName = decodeURIComponent(match.params.name);

                const { animes, genres } = this.props;

                // Check if genres data is loaded
                if (!genres || genres.length === 0) {
                  return <div>Loading genres...</div>;
                }

                // Find the genre object from genres
                const genre = genres.find(
                  (g) => g.Name.toLowerCase() === genreName.toLowerCase()
                );

                if (!genre) {
                  return <div>Genre not found.</div>;
                }

                // Filter animes that have the genre
                const filteredAnimes = animes.filter((m) => {
                  const genreNames = m.Genre.Name;
                  if (Array.isArray(genreNames)) {
                    return genreNames.some(
                      (name) => name.toLowerCase() === genreName.toLowerCase()
                    );
                  } else if (typeof genreNames === "string") {
                    return genreNames.toLowerCase() === genreName.toLowerCase();
                  }
                  return false;
                });

                return (
                  <Col md={8}>
                    <GenreView
                      genre={genre}
                      animes={filteredAnimes}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

// state from store and pass it as a prop to the component
let mapStateToProps = (state) => {
  console.log("Genres from Redux store:", state.genres);
  return {
    animes: state.animes,
    genres: state.genres,
    user: state.user,
    favorites: state.favorites,
  };
};

// connect() to connect component to store
export default connect(mapStateToProps, {
  setAnimes,
  setGenres,
  setUser,
  setFavorites,
})(MainView);

MainView.propTypes = {
  animes: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setAnimes: PropTypes.func.isRequired,
  setGenres: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired,
};