"use client";

import type { ComponentType } from "react";
import ReactPaginateImport from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

const ReactPaginate = (
  typeof ReactPaginateImport === "function"
    ? ReactPaginateImport
    : (
        ReactPaginateImport as unknown as {
          default: ComponentType<ReactPaginateProps>;
        }
      ).default
) as ComponentType<ReactPaginateProps>;

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      forcePage={page - 1}
      onPageChange={({ selected }) => {
        onPageChange(selected + 1);
      }}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
