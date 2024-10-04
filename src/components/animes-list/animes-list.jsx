// animes-list.jsx
import PropTypes from "prop-types";
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { AnimeCard } from "../anime-card/anime-card";

// extract visibility filter and animes into a prop
const mapStateToProps = (state) => {
  const { visibilityFilter, animes } = state;
  return { visibilityFilter, animes };
};

function AnimesList(props) {
  const { animes, visibilityFilter } = props;
  let filteredAnimes = animes;

  if (visibilityFilter !== "") {
    filteredAnimes = animes.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!animes) return <div className="main-view" />;

  return (
    <Row className="anime-row">
      <Col lg={12} style={{ margin: "1em" }} className="mt-3 mb-3">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredAnimes.map((m) => {
        console.log(m); // This will log each anime object being passed to AnimeCard
        return (
          <Col
            lg={3}
            md={5}
            sm={12}
            key={m.id}
            style={{ width: "332px" }}
            className="anime-col"
          >
            <AnimeCard anime={m} />
          </Col>
        );
      })}
    </Row>
  );
}

AnimesList.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  animes: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(AnimesList);
