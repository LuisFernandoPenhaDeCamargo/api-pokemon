import { Router } from "express";
import pokemonController from "./controllers/pokemon-controller";

const routes = new Router();

routes.post("/create-pokemon", async (request, response) => {
  const { body } = request;
  const { statusCode, responseObject } = await pokemonController.create(body);
  return response.status(statusCode).json(responseObject);
});

routes.get("/get-pokemon", async (request, response) => {
  const { query } = request;
  const { statusCode, responseObject } = await pokemonController.getPokemon(
    query
  );
  return response.status(statusCode).json(responseObject);
});

routes.post("/update-pokemon", async (request, response) => {
  const { body } = request;
  const { statusCode, responseObject } = await pokemonController.updatePokemon(
    body
  );
  return response.status(statusCode).json(responseObject);
});

routes.get("/delete-pokemon", async (request, response) => {
  const { query } = request;
  const { statusCode, responseObject } = await pokemonController.deletePokemon(
    query
  );
  return response.status(statusCode).json(responseObject);
});

export default routes;
