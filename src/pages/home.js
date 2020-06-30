import React from "react";
import SliderMovies from "../components/SliderMovies";
import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { Row, Col } from "antd";
import { URL_API, TOKEN } from "../utils/constants";

const Home = () => {
  const newMovies = useFetch(
    `${URL_API}/movie/now_playing?api_key=${TOKEN}&language=es-ES&page=1`
  );

  const popularMovies = useFetch(
    `${URL_API}/movie/popular?api_key=${TOKEN}&language=es-ES&page=1`
  );

  const topMovies = useFetch(
    `${URL_API}/movie/top_rated?api_key=${TOKEN}&language=es-ES&page=1`
  );

  return (
    <>
      <SliderMovies movies={newMovies} />
      <Row>
        <Col span={12}>
          <MovieList movies={popularMovies} title="Peliculas Populares" />
        </Col>
        <Col span={12}>
          <MovieList movies={topMovies} title="Top Peliculas" />
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Home;
