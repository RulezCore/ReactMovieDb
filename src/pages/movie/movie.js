/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import ModalVideo from "../../components/ModalVideo";
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
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const {
    movieInfo: { id, title, release_date, overview, genres },
  } = props;

  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${TOKEN}&language=es-ES`
  );

  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  const renderVideo = () => {
    if (videoMovie.loading) {
      return <Loading />;
    }

    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <>
            <Button icon={<PlayCircleOutlined />} onClick={openModal}>
              Ver trailer
            </Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </>
        );
      }
    }
  };

  return (
    <>
      <div className="movie__info-header">
        <h1>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
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

// const ModalButton = (props) => {
//   const [visible, setVisible] = useState(false);

//   // const { id } = props;

//   // Request
//

//   // Request
//   if (trailer.loading || !trailer.result) {
//     return <Loading />;
//   }

//   console.log(trailer.result.results[0]);

//   const { movieTitle } = props;

//   const { key } = trailer.result.results[0];

//   // Modal functions
//   const showModal = (e) => {
//     setVisible(true);
//   };

//   const handleOk = (e) => {
//     setVisible(false);
//   };

//   const handleCancel = (e) => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <Button onClick={showModal} icon={<PlayCircleOutlined />}>
//         Ver Trailer
//       </Button>
//       <Modal
//         title={movieTitle}
//         visible={visible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={650}
//         footer={null}
//       >
//         <iframe
//           width="560"
//           height="315"
//           src={`https://www.youtube.com/embed/${key}`}
//           frameborder="0"
//           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//           allowfullscreen
//           autoplay
//         ></iframe>
//       </Modal>
//     </>
//   );
// };
