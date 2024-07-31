import { DOTS, usePagination } from "@/shared/hooks/use-pagination";
import { Button } from "./button";
import { Typography } from "./typography";
import { cn } from "@/shared/lib/utils";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 10,
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = +paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex gap-2 mx-auto md:scale-100" data-testid="pagination">
      <li>
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={currentPage === 1}
          size="sm"
          data-testid="pagination-prev-button"
        >
          <Typography.P>{"<"}</Typography.P>
        </Button>
      </li>

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} data-testid="pagination-dots">
              <Button disabled={true} variant="outline" size="sm">
                <Typography.P>{"..."}</Typography.P>
              </Button>
            </li>
          );
        }

        return (
          <li key={pageNumber} data-testid="pagination-button">
            <Button
              onClick={() => onPageChange(Number(pageNumber))}
              variant="outline"
              size="sm"
              className={cn({
                "brightness-75": currentPage === Number(pageNumber),
              })}
            >
              <Typography.P>{pageNumber}</Typography.P>
            </Button>
          </li>
        );
      })}

      <li>
        <Button
          onClick={onNext}
          variant="outline"
          disabled={currentPage === lastPage}
          size="sm"
          data-testid="pagination-next-button"
        >
          <Typography.P>{">"}</Typography.P>
        </Button>
      </li>
    </ul>
  );
};
