import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { URL_API, TOKEN } from "../../utils/constants";

// CSS
import "./search.scss";

const Search = (props) => {
  const { location, history } = props;
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      const searchValue = queryString.parseUrl(location.search);
      const { s } = searchValue.query;
      const response = await fetch(
        `${URL_API}/search/movie?api_key=${TOKEN}&language=es-ES&query=${s}&page=1`
      );

      const movies = await response.json();
      setMovieList(movies);
      setSearchValue(s);
    })();
  }, [location.search]);

  const onChangeSearch = (e) => {
    const urlParams = queryString.parse(location.search);
    urlParams.s = e.target.value;
    history.push(`?${queryString.stringify(urlParams)}`);
  };

  return (
    <Row>
      <Col span={24} className="inputSearch">
        <h1 style={{ textAlign: "center" }}>Busca tu pelicula:</h1>
        <Input
          value={searchValue}
          style={{ width: "50%" }}
          onChange={onChangeSearch}
        />
      </Col>
      {movieList.results && (
        <Row className="movies">
          <Col span={24} offset={0}>
            <Row>
              <MovieCatalog movies={movieList} />
            </Row>
          </Col>
        </Row>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
};

export default withRouter(Search);
