import { React } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { AnimeCard } from "../anime-card/anime-card";
import { Col, Row, Card } from "react-bootstrap";

function GenreView(props) {
  const { onBackClick, genre, animes } = props;

  return (
    <>
      <h1 className="genre-name">{genre.Name}</h1>
      <Card>
        <Card.Body>
          <h5 className="label">Description</h5>
          <p className="value">{genre.Description}</p>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h5 className="mangaartist-animes">Animes</h5>
          <Row>
            {animes.map((m) => (
              <Col xs={12} md={6} lg={4} key={m._id}>
                <AnimeCard anime={m} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Button
        className="mt-3 Back"
        variant="success"
        type="button"
        onClick={() => {
          onBackClick();
        }}
      >
        <span>Back</span>
      </Button>
    </>
  );
}

export default GenreView;

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  animes: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};