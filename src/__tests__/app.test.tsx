import { render, screen, waitFor } from "@/shared/lib/utils-test";
import { App } from "@/app";

describe("Home Page", () => {
  test("it render header", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("StarNavi Heroes")).toBeInTheDocument();
    });
  });

  test("it renders character list", async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("Han Solo")).toBeInTheDocument();
        expect(screen.getByText("Yoda")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
