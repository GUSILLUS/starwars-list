import { useState, useEffect } from "react";
import { heroesApi } from "@/shared/services";
import type { Character } from "@/shared/types";
import { Typography, Button, Pagination } from "@/components/ui";
import { Link } from "react-router-dom";

export const CharacterList = () => {
  const [heroes, setHeroes] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHeroes = async () => {
      setIsLoading(true);
      const response = await heroesApi.getHeroes(page);
      setTotal(response.data.count);
      setHeroes(response.data.results);
      setIsLoading(false);
    };

    fetchHeroes();
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return <Typography.P>Loading...</Typography.P>;
  }

  return (
    <div className="flex flex-col gap-2 h-max relative">
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 grid-rows-2 gap-2 lg:gap-4 lg:grid-cols-5 justify-start items-start mx-auto" data-testid="character-list">
        {heroes.map(({ id, name, birth_year, gender }) => (
          <li key={id} className="flex overflow-hidden" data-testid="character-item">
            <Button
              variant="secondary"
              type="button"
              className="flex flex-col gap-2 w-full justify-start h-max p-0 rounded-b-xl bg-yellow-500"
            >
              <Link to={`/character/${id}`}>
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                  alt={name}
                  className="max-h-60 object-contain"
                />

                <Typography.P className="font-bold">{name}</Typography.P>

                <div className="flex justify-between px-2 gap-1">
                  <Typography.P className="font-bold">{birth_year}</Typography.P>

                  <Typography.P className="font-bold">{gender}</Typography.P>
                </div>
              </Link>
            </Button>
          </li>
        ))}
      </ul>

      <Pagination
        onPageChange={handlePageChange}
        totalCount={total}
        currentPage={page}
      />
    </div>
  );
};
