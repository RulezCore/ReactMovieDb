import React from "react";
import { Col, Card, Icon } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// CSS
import "./MovieCatalog.scss";

const MovieCatalog = (props) => {
  const {
    movies: { results },
  } = props;

  return results.map((movie) => (
    <Col key={movie.id} xs={4} className="movie-catalog">
      <MovieCard movie={movie} />
    </Col>
  ));
};

export default MovieCatalog;

const MovieCard = (props) => {
  const {
    movie: { id, title, poster_path },
  } = props;
  const { Meta } = Card;
  const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

  return (
    <Link to={`/movie/${id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img src={posterPath} alt={title} />}
        actions={[<EyeOutlined key="eye" />]}
      >
        <Meta title={title} />
      </Card>
    </Link>
  );
};
