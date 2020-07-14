import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./error-404.scss";

const Error404 = () => {
  return (
    <div className="error404">
      <h1>Eror 404</h1>
      <h2>Pagina no encontrada</h2>
      <Link to="/">
        <h3>Volver al inicio</h3>
      </Link>
    </div>
  );
};

export default Error404;
