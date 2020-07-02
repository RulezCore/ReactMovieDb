import React from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, TOKEN } from "../../utils/constants";
import Loading from "../../components/Loading";

// CSS
import "./movie.scss";

const Movie = () => {
  const { id } = useParams();
  const movieInfo = useFetch(
    `${URL_API}/movie/${id}?api_key=${TOKEN}&language=es_ES`
  );

  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }

  return <RenderMovie movie={movieInfo.result} />;
};

export default Movie;

const RenderMovie = (props) => {
  const {
    movie: { title, backdrop_path, poster_path },
  } = props;

  console.log(props);

  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div className="movie" style={{ backgroundImage: `url(${backdropPath})` }}>
      <div className="movie__dark"></div>
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={10} className="movie__info">
          Movie Info...
        </Col>
      </Row>
    </div>
  );
};

const PosterMovie = (props) => {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url(${posterPath})` }}></div>;
};
