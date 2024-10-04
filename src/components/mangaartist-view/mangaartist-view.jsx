import { React } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { AnimeCard } from "../anime-card/anime-card";
import { Col, Row, Card } from "react-bootstrap";

function MangaArtistView(props) {
  const { onBackClick, mangaartist, animes } = props;

  return (
    <>
      <h1 className="mangaArtist-name">{mangaartist.Name}</h1>
      <p className="mangaArtist-birth">{`${mangaartist.Birth} - ${mangaartist.Death}`}</p>
      <Card>
        <Card.Body>
          <h5 className="label">Biography</h5>
          <p className="value">{mangaartist.Bio}</p>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h5 className="label">Animes</h5>
          <Row className="justify-content-md-center">
            {animes.map((m) => (
              <Col xs={12} md={6} lg={4} key={m.id}>
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

export default MangaArtistView;

MangaArtistView.propTypes = {
  mangaartist: PropTypes.shape({
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
  }).isRequired,
  animes: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};