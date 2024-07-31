import { CharacterDetails } from "@/features";
import { render, screen, waitFor } from "@/shared/lib/utils-test";
import type { ReactNode } from "react";
import { heroesApi } from "@/shared/services";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock('@/shared/services', () => ({
  heroesApi: {
    getHeroById: jest.fn(),
  },
}));

const productId = "12";

// Mock data
const mockHero = {
  id: 12,
  name: "Wilhuff Tarkin",
  height: "180",
  mass: "78",
  hair_color: "white",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "64BBY",
  gender: "male",
};

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const wrapper = (props: { children: ReactNode }) => (
  <MemoryRouter initialEntries={[`/character/${productId}`]}>
    {props.children}
  </MemoryRouter>
);

const staticCharacterDetails = (
  <Routes>
    <Route path="character">
      <Route index element={<CharacterDetails />} />

      <Route path=":characterId" element={<CharacterDetails />} />
    </Route>
  </Routes>
);

describe("Character Details", () => {
  beforeAll(() => {
    // Set up the mock to return the mock data
    (heroesApi.getHeroById as jest.Mock).mockResolvedValue(mockHero);
  });

  test("renders character card", async () => {
    render(staticCharacterDetails, { wrapper });

    await waitFor(() => {
      expect(screen.getByTestId("character-card")).toBeInTheDocument();
    });
  });

  test("character card need to be with image and correct alt", async () => {
    render(staticCharacterDetails, { wrapper });

    await waitFor(() => {
      expect(screen.getByTestId("character-card-image")).toBeInTheDocument();
      expect(screen.getByAltText("Wilhuff Tarkin")).toBeInTheDocument();
    });
  });

  test("character card need to be with title and correct text", async () => {
    render(staticCharacterDetails, { wrapper });

    await waitFor(() => {
      expect(screen.getByTestId("character-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("character-card-title")).toHaveTextContent(
        "Wilhuff Tarkin",
      );
    });
  });

  test("character card need to have description", async () => {
    render(staticCharacterDetails, { wrapper });

    await waitFor(() => {
      expect(
        screen.getByTestId("character-card-description"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("character-card-description").children,
      ).toHaveLength(7);
    });
  });
});
