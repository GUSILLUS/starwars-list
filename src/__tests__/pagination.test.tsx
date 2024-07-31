import { render, screen, waitFor } from "@/shared/lib/utils-test";

import { Pagination } from "@/components/ui";

const staticPagination = (
  <Pagination onPageChange={() => null} totalCount={82} currentPage={1} />
);

describe("Pagination", () => {
  test("it render pagination", async () => {
    render(staticPagination);

    await waitFor(() => {
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });
  });

  test("it render pagination list with prev button", async () => {
    render(staticPagination);

    await waitFor(() => {
      expect(screen.getByTestId("pagination-prev-button")).toBeInTheDocument();
    });
  });

  test("it render pagination list with disabled prev button", async () => {
    render(staticPagination);

    await waitFor(() => {
      expect(screen.getByTestId("pagination-prev-button")).toBeDisabled();
    });
  });

  test("it render pagination list with next button", async () => {
    render(staticPagination);

    await waitFor(() => {
      expect(screen.getByTestId("pagination-next-button")).toBeInTheDocument();
    });
  });

  test("it render pagination list with active next button", async () => {
    render(staticPagination);

    await waitFor(() => {
      expect(screen.getByTestId("pagination-next-button")).not.toBeDisabled();
    });
  });

  test("it render list with 3 items and 1 dots", async () => {
    render(staticPagination);

    await waitFor(() => {
      expect(screen.getAllByTestId("pagination-button")).toHaveLength(4);
    });

    await waitFor(() => {
      expect(screen.getByTestId("pagination-dots")).toBeInTheDocument();
    });
  });
});
