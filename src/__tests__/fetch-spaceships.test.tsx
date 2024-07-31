import axios from "axios";
import { fetchSpaceships } from "@/shared/services/spaceships";
import type { Character, Film, Starship } from "@/shared/types";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchSpaceships", () => {
  // Define the hero object
  const hero: Character = {
    id: 1,
    name: "Luke Skywalker",
    starships: [2, 3],
    height: "",
    mass: "",
    hair_color: "",
    skin_color: "",
    eye_color: "",
    birth_year: "",
    gender: "",
    homeworld: 0,
    films: [],
    species: [],
    vehicles: [],
    created: "",
    edited: "",
    url: "",
  };

  // Define the films array
  const films: Film[] = [
    {
      id: 1,
      title: "A New Hope",
      starships: [2, 4],
      episode_id: 0,
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
      characters: [],
      planets: [],
      vehicles: [],
      species: [],
      created: "",
      edited: "",
      url: "",
    },
    {
      id: 2,
      title: "The Empire Strikes Back",
      starships: [3, 5],
      episode_id: 0,
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
      characters: [],
      planets: [],
      vehicles: [],
      species: [],
      created: "",
      edited: "",
      url: "",
    },
    {
      id: 3,
      title: "Return of the Jedi",
      starships: [2, 3],
      episode_id: 0,
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
      characters: [],
      planets: [],
      vehicles: [],
      species: [],
      created: "",
      edited: "",
      url: "",
    },
  ];

  // Define the starships array
  const starships: Starship[] = [
    {
      id: 2,
      name: "X-wing",
      model: "",
      manufacturer: "",
      cost_in_credits: "",
      length: "",
      max_atmosphering_speed: "",
      crew: "",
      passengers: "",
      cargo_capacity: "",
      consumables: "",
      hyperdrive_rating: "",
      MGLT: "",
      starship_class: "",
      pilots: [],
      films: [],
      created: "",
      edited: "",
      url: "",
    },
    {
      id: 3,
      name: "Imperial shuttle",
      model: "",
      manufacturer: "",
      cost_in_credits: "",
      length: "",
      max_atmosphering_speed: "",
      crew: "",
      passengers: "",
      cargo_capacity: "",
      consumables: "",
      hyperdrive_rating: "",
      MGLT: "",
      starship_class: "",
      pilots: [],
      films: [],
      created: "",
      edited: "",
      url: "",
    },
  ];

  // Mocked axios response
  const starshipsData = {
    data: { results: starships },
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(starshipsData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch spaceships and return spaceship nodes and edges", async () => {
    const result = await fetchSpaceships(films, hero);

    const expectedSpaceshipNodes = films.flatMap((film) =>
      starships.map((ship, shipIndex) => ({
        id: `${ship.name}-${film.title}`,
        position: { x: (shipIndex + 1) * 200, y: 400 },
        data: { label: ship.name },
        type: "output",
        style: { border: "1px solid blue" },
      })),
    );

    const expectedSpaceshipEdges = films.flatMap((film) =>
      starships.map((ship) => ({
        id: `movie-${film.id}-${ship.name}-${film.title}`,
        source: `movie-${film.id}`,
        target: `${ship.name}-${film.title}`,
        labelStyle: { color: "gray", fontWeight: "300" },
        style: { color: "blue" },
      })),
    );

    expect(result.spaceshipNodes).toEqual(expectedSpaceshipNodes);
    expect(result.spaceshipEdges).toEqual(expectedSpaceshipEdges);
  });

  it("should handle axios request failure", async () => {
    // Mock axios to reject the request
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    await expect(fetchSpaceships(films, hero)).rejects.toThrow("Network Error");
  });
});
