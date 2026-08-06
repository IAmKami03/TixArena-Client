import previous from "../../assets/images/vendorImages/previous.svg";
import next from "../../assets/images/vendorImages/next.svg";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
}

const getPageNumbers = (page: number, totalPages: number): (number | "...")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set([1, 2, totalPages - 1, totalPages, page - 1, page, page + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("...");
    result.push(p);
    prev = p;
  }
  return result;
};

const Pagination = ({ page, totalPages, onPageChange, pageSize }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div
      className={
        pageSize
          ? "flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between items-center"
          : "flex justify-center items-center"
      }
    >
      {pageSize && (
        <p className="text-[16px] font-normal text-[#ECECEC]">
          {pageSize} Entries per page
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 sm:gap-x-7.5 items-center">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="bg-[#262525] flex gap-2.5 px-3 py-2.25 rounded-[60px] items-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <img src={previous} alt="" />
          <p className="text-[#ECECEC] text-[16px] font-normal">Previous</p>
        </button>
        <div className="flex flex-wrap justify-center gap-2.5">
          {pageNumbers.map((p, i) =>
            p === "..." ? (
              <p
                key={`ellipsis-${i}`}
                className="bg-[#262525] px-3.5 py-3 rounded-[60px] text-[16px] font-semibold text-[#ECECEC]"
              >
                ...
              </p>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`bg-[#262525] px-3.5 py-3 rounded-[60px] text-[16px] font-semibold text-[#ECECEC] ${
                  p === page ? "border border-[#995DFF]" : ""
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="bg-[#262525] text-[#ECECEC] flex gap-2.5 px-3 py-2.25 rounded-[60px] items-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <p>Next</p>
          <img src={next} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
