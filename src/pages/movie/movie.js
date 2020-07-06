import React, { useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
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
    movie: { backdrop_path, poster_path },
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
          <MovieInfo movieInfo={props.movie} />
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

const MovieInfo = (props) => {
  const {
    movieInfo: { id, title, release_date, overview, genres },
  } = props;

  return (
    <>
      <div className="movie__info-header">
        <h1>
          {title}{" "}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        <ModalButton />
      </div>
      <div className="movie__info-content">
        <h3>General:</h3>
        <p>{overview}</p>
        <h3>Generos:</h3>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>- {genre.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ModalButton = (props) => {
  const [visible, setVisible] = useState(false);

  const showModal = (e) => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} icon={<PlayCircleOutlined />}>
        Ver Trailer
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
