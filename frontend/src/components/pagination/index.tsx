interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  function goToPrevious() {
    onPageChange(page - 1);
  }

  function goToNext() {
    onPageChange(page + 1);
  }

  return (
    <div className="dui-join">
      <button
        className="dui-join-item dui-btn"
        disabled={page === 1}
        onClick={goToPrevious}
      >
        «
      </button>
      <div className="dui-join-item flex px-2 items-center justify-center bg-gray-100">
        <span className="select-none">Página {page}</span>
      </div>
      <button
        className="dui-join-item dui-btn"
        disabled={page === Math.ceil(total / limit)}
        onClick={goToNext}
      >
        »
      </button>
    </div>
  );
}
