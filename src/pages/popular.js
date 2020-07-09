import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MovieCatalog from "../components/MovieCatalog";
import Pagination from "../components/Pagination";
import { URL_API, TOKEN } from "../utils/constants";

const Popular = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  // Peticion
  useEffect(() => {
    console.log("Actualizando");

    (async () => {
      const response = await fetch(
        `${URL_API}/movie/popular/?api_key=${TOKEN}&language=es-ES&page=${page}`
      );
      const movies = await response.json();
      setMovieList(movies);
    })();
  }, [page]);

  // Paginador
  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <Row>
      <Col span={24} style={{ textAlign: "center", marginTop: 25 }}>
        <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
          Peliculas Populares:
        </h1>
      </Col>
      {movieList.results ? (
        <>
          <Col span={24}>
            <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
              <MovieCatalog movies={movieList} />
            </Row>
          </Col>
          <Col span={24}>
            <Pagination
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </>
      ) : (
        <Col span={24}>
          <Loading />
        </Col>
      )}

      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
};

export default Popular;
