import axios from "axios";

import type { Character, Film, Starship } from "../types";

export const fetchSpaceships = async (movies: Film[], hero: Character) => {
  const spaceships = [];
  const spaceshipNodes = [];
  const spaceshipEdges = [];

  for (const movie of movies) {
    const filteredSpaceships = movie.starships.filter((id: number) =>
      hero.starships.includes(id),
    );

    const queryParams = `id__in=${filteredSpaceships.join(",")}`;

    const spaceshipsData = await axios.get(
      `https://sw-api.starnavi.io/starships/?${queryParams}`,
    );

    const ships = spaceshipsData.data.results as Starship[];

    spaceships.push(...ships);

    spaceshipNodes.push(
      ...ships.map((ship, index) => ({
        id: `${ship.name}-${movie.title}`,
        position: { x: (index + 1) * 200, y: 400 },
        data: { label: ship.name },
        type: "output",
        style: {
          border: "1px solid blue",
        },
      })),
    );

    spaceshipEdges.push(
      ...ships.map((ship) => {
        return {
          id: `movie-${movie.id}-${ship.name}-${movie.title}`,
          source: `movie-${movie.id}`,
          target: `${ship.name}-${movie.title}`,
          labelStyle: { color: "gray", fontWeight: "300" },
          style: { color: "blue" },
        };
      }),
    );
  }

  return { spaceships, spaceshipNodes, spaceshipEdges };
};
