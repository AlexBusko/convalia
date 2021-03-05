import React, { FC, useState } from "react";
import "./style.scss";
import cn from "classnames";
import { Button } from "antd";

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize?: number;
};

const Paginator: FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className="paginator">
      {portionNumber > 1 && (
        <Button
          className="prev-button"
          type="primary"
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </Button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={cn(
                {
                  "selectedPage": currentPage === p,
                },
                "pageNumber"
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <Button
          className="next-button"
          type="primary"
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </Button>
      )}
    </div>
  );
};
export default Paginator;
