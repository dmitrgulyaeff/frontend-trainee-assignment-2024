import { findMovieById } from "@src/lib/api/client";
import { type LoaderFunctionArgs } from "react-router-dom";
import invariant from "tiny-invariant";

export const movieLoader = async ({ params }: LoaderFunctionArgs) => {
  invariant(
    params.movieId && !isNaN(Number(params.movieId)),
    'id должен быть числом'
  );
  const id = Number(params.movieId);
  const response = await findMovieById({ id });
  const movie = response.data;
  return {movie, id};
};

export type TMovieLoaderData = Awaited<ReturnType<typeof movieLoader>> 