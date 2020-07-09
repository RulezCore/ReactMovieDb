import React from "react";
import Pagination from "rc-pagination";

// CSS
import "./Pagination.scss";

const PaginationMovie = (props) => {
  const { currentPage, totalItems, onChangePage } = props;

  return (
    <Pagination
      className="pagination"
      current={currentPage}
      total={totalItems}
      pageSize={20}
      onChange={onChangePage}
    />
  );
};

export default PaginationMovie;
