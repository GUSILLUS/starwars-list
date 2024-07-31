import { render, screen, waitFor } from "@/shared/lib/utils-test";
import { CharacterList } from "@/features";
import { heroesApi } from "@/shared/services";

jest.mock('@/shared/services', () => ({
  heroesApi: {
    getHeroes: jest.fn(),
  },
}));

const mockHeroes = {
  data: {
    count: 10,
    results: Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Character ${index + 1}`,
      birth_year: "N/A",
      gender: "unknown",
    })),
  },
};

describe("Character List", () => {
  beforeAll(() => {
    // Set up the mock to return the mock data
    (heroesApi.getHeroes as jest.Mock).mockResolvedValue(mockHeroes);
  });

  test("it render list", async () => {
    render(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByTestId("character-list")).toBeInTheDocument();
    });
  });

  test("it render list with 10 items", async () => {
    render(<CharacterList />);

    await waitFor(() => {
      expect(screen.queryAllByTestId("character-item")).toHaveLength(10);
    });
  });
});
