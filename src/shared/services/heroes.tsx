import type { Character } from "../types";
import { Axios } from "./axios";

const getHeroes = (page: number) => {
  return Axios.get(`/people/?page=${page}`);
};

const getHeroById = async (id: number) => {
  const hero = (await Axios.get(`/people/${id}`)).data as Character;

  return hero;
};

export const heroesApi = {
  getHeroes,
  getHeroById,
};
