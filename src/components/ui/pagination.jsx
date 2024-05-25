import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';

export default function Pagination({
  onClickPageNum,
  totalPage,
  page,
  sortByDate,
}) {
  const [pageList, setPageList] = useState([]);

  /**
   * Set page number and pass page number to Home when user clicks page button.
   * @param {int} pageNum - selected page number.
   */
  const onClick = pageNum => {
    if (pageNum != page) {
      onClickPageNum(pageNum);
    }
  };

  /**
   * Set page numbers list to re-display page button when user clicks next or previous button.
   * @param {int} startPage - first page number to be display.
   */
  const setNewbuttons = startPage => {
    const length = Math.min(totalPage - startPage + 1, 5);
    const newList = Array.from({ length: length }, (_, i) => startPage + i);
    setPageList(newList);
  };

  useEffect(() => {
    setNewbuttons(1);
  }, [totalPage, sortByDate]);

  return (
    <div className="flex items-center justify-center border-t border-gray-200 bg-white py-3">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination">
        <button
          id="previous"
          onClick={() => {
            setNewbuttons(pageList[0] - 5);
          }}
          className={`${pageList[0] != 1 ? 'block' : 'hidden'} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}>
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pageList.map(pageNum => {
          return (
            <button
              key={pageNum}
              id={pageNum}
              onClick={() => {
                onClick(pageNum);
              }}
              aria-current="page"
              className={`'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20' ${
                page === pageNum
                  ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
              }`}>
              {pageNum}
            </button>
          );
        })}

        <button
          id="next"
          onClick={() => {
            setNewbuttons(pageList[0] + 5);
          }}
          className={`${pageList[pageList.length - 1] != totalPage ? 'block' : 'hidden'} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
