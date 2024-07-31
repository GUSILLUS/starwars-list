import axios from "axios";
import { fetchMovies } from "@/shared/services"; // Adjust the import path
import type { Character, Film } from "@/shared/types";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchMovies", () => {
  // Define the hero object
  const hero: Character = {
    id: 1,
    name: "Luke Skywalker",
    films: [1, 2, 3],
    height: "",
    mass: "",
    hair_color: "",
    skin_color: "",
    eye_color: "",
    birth_year: "",
    gender: "",
    homeworld: 0,
    species: [],
    vehicles: [],
    starships: [],
    created: "",
    edited: "",
    url: "",
  };

  // Define the films array
  const films: Film[] = [
    {
      id: 1,
      title: "A New Hope",
      episode_id: 4,
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: "",
      edited: "",
      url: "",
    },
    {
      id: 2,
      title: "The Empire Strikes Back",
      episode_id: 5,
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: "",
      edited: "",
      url: "",
    },
    {
      id: 3,
      title: "Return of the Jedi",
      episode_id: 6,
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: "",
      edited: "",
      url: "",
    },
  ];

  // Mocked axios response
  const moviesData = {
    data: { results: films },
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(moviesData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch movies and return movie nodes and edges", async () => {
    const result = await fetchMovies(hero);

    const expectedMovieNodes = films.map((film, index) => ({
      id: `movie-${film.id}`,
      position: { x: index * 200, y: 150 },
      data: { label: film.title },
      style: {
        border: "1px solid green",
        backgroundImage: `url(https://starwars-visualguide.com/assets/img/films/${film.id}.jpg)`,
        backgroundSize: "cover",
        height: "200px",
        color: "white",
        fontWeight: "700",
      },
    }));

    const expectedMovieEdges = films.map((film) => ({
      id: `${hero.id}-movie-${film.id}`,
      source: String(hero.id),
      target: `movie-${film.id}`,
      label: `episode ${film.episode_id}`,
      labelStyle: {
        fill: "yellow",
        fontWeight: "500",
        textTransform: "capitalize",
        padding: "0 5px",
      },
      labelBgStyle: { fill: "black", stroke: "yellow", strokeWidth: 1 },
    }));

    expect(result.movies).toEqual(films);
    expect(result.movieNodes).toEqual(expectedMovieNodes);
    expect(result.movieEdges).toEqual(expectedMovieEdges);
  });

  it("should handle axios request failure", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    await expect(fetchMovies(hero)).rejects.toThrow("Network Error");
  });
});
