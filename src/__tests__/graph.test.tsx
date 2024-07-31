import { Graph } from "@/features";
import { render, screen, waitFor } from "@/shared/lib/utils-test";

const mockCharacter = {
  id: 12,
  name: "Wilhuff Tarkin",
  height: "180",
  mass: "unknown",
  hair_color: "auburn, grey",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "64BBY",
  gender: "male",
  homeworld: 21,
  films: [1, 6],
  species: [1],
  vehicles: [],
  starships: [],
  created: "2014-12-10T16:26:56.138000Z",
  edited: "2014-12-20T21:17:50.330000Z",
  url: "https://sw-api.starnavi.io/people/12/",
};

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Graph", () => {
  test("it render graph", async () => {
    render(<Graph hero={mockCharacter} />);

    await waitFor(() => {
      expect(screen.getByTestId("character-graph")).toBeInTheDocument();
    });
  });

  test("it render graph with correct hero node", async () => {
    render(<Graph hero={mockCharacter} />);

    await waitFor(() => {
      expect(screen.getByText("Wilhuff Tarkin")).toBeInTheDocument();
    });
  });
});
