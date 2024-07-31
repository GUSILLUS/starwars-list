// src/components/HeroDetails.tsx
import { useState, useEffect } from "react";
import { heroesApi } from "@/shared/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography, Skeleton } from "@/components/ui";
import type { Character } from "@/shared/types";
import { useParams } from "react-router-dom";
import { Graph } from "./graph";

export const CharacterDetails = () => {
  const { characterId } = useParams();
  const [hero, setHero] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { name, id, hair_color, height, skin_color, eye_color, birth_year, mass, gender } = hero || {};

  useEffect(() => {
    const fetchHeroDetails = async () => {
      const response = await heroesApi.getHeroById(Number(characterId));
      const hero = response as Character;

      setHero(hero);

      setIsLoading(false);
    };

    fetchHeroDetails();
  }, [characterId]);

  return (
    <div className="flex flex-col gap-4 grow">
      <Card className="mr-auto w-full overflow-hidden flex gap-4" data-testid='character-card'>
        {isLoading ? (
          <Skeleton className="h-[150px] md:h-[300px] lg:h-[400px] w-[100px] md:w-[250px] lg:w-[300px] " />
        ) : (
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={name}
            className="h-[150px] md:h-[300px] lg:h-[400px] object-contain"
            data-testid='character-card-image'
          />
        )}

        <CardHeader className="p-3">
          {isLoading ? (
            <Skeleton className="h-[30px] w-[300px]" />
          ) : (
            <CardTitle data-testid='character-card-title'>{name}</CardTitle>
          )}
          {isLoading ? (
            <Skeleton className="h-[250px] w-[200px]" />
          ) : (
            <CardContent className="flex flex-col gap-1 p-0 pl-2">
              <div className="flex flex-col gap-1 flex-wrap w-full" data-testid='character-card-description'>
                <Typography.P className="text-start capitalize">
                  Height: {height}
                </Typography.P>

                <Typography.P className="text-start capitalize">
                  Mass: {mass} kilos
                </Typography.P>

                <Typography.P className="text-start capitalize">
                  Hair color: {hair_color}
                </Typography.P>

                <Typography.P className="text-start capitalize">
                  Skin color: {skin_color}
                </Typography.P>

                <Typography.P className="text-start capitalize">
                  Eye color: {eye_color}
                </Typography.P>

                <Typography.P className="text-start capitalize">
                  Birth year: {birth_year}
                </Typography.P>

                <Typography.P className="text-start capitalize">
                  Gender: {gender}
                </Typography.P>
              </div>
            </CardContent>
          )}
        </CardHeader>
      </Card>

      <Graph hero={hero} />
    </div>
  );
};
