import axios from "axios";
import type { Character, Film } from "@/shared/types";

export const fetchMovies = async (hero: Character) => {
  const queryParams = `id__in=${hero.films.join(",")}`;

  const moviesData = await axios.get(
    `https://sw-api.starnavi.io/films/?${queryParams}`,
  );

  const movies = moviesData.data.results as Film[];

  const movieNodes = movies.map((movie, index) => ({
    id: `movie-${movie.id}`,
    position: { x: index * 200, y: 150 },
    data: { label: movie.title },
    style: {
      border: "1px solid green",
      backgroundImage: `url(https://starwars-visualguide.com/assets/img/films/${movie?.id}.jpg)`,
      backgroundSize: "cover",
      height: "200px",
      color: "white",
      fontWeight: "700",
    },
  }));

  const movieEdges = movies.map((movie) => ({
    id: `${hero.id}-movie-${movie.id}`,
    source: String(hero.id),
    target: `movie-${movie.id}`,
    label: `episode ${movie.episode_id}`,
    labelStyle: {
      fill: "yellow",
      fontWeight: "500",
      textTransform: "capitalize",
      padding: "0 5px",
    },
    labelBgStyle: { fill: "black", stroke: "yellow", strokeWidth: 1 },
  }));

  return { movieEdges, movies, movieNodes };
};
