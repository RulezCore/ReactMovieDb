import React from "react";
import { List, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { RightOutlined } from "@ant-design/icons";

// CSS
import "./MovieList.scss";

const MovieList = (props) => {
  const { movies, title } = props;

  if (movies.Loading || !movies.result) {
    return <Loading />;
  }

  return (
    <List
      className="movie-list"
      size="default"
      header={<h2>{title}</h2>}
      dataSource={movies.result.results}
      renderItem={(movie) => <RenderMovie movie={movie} />}
    />
  );
};

export default MovieList;

const RenderMovie = (props) => {
  const {
    movie: { id, title, poster_path },
  } = props;

  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <List.Item className="movie-list__movie">
      <List.Item.Meta
        avatar={<Avatar src={posterPath} />}
        title={<Link to={`/movie/${id}`}>{title}</Link>}
      />
      <Link to={`/movie/${id}`}>
        <Button type="primary" shape="circle" icon={<RightOutlined />} />
      </Link>
    </List.Item>
  );
};
