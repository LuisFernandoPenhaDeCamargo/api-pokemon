/* eslint-disable no-param-reassign */
import { query } from "../database";

// Função que verifica se o pokémon existe ou não.
export async function pokemonExists(number, name) {
  // console.log(number);
  // console.log(name);

  const sql = `
    SELECT *
    FROM pokemon
    WHERE id = $1 and name = $2
  `;
  const values = [number, name];
  const result = await query(sql, values);

  // console.log(result);
  // console.log(result.rows);

  if (result.rows.length > 0) {
    return true;
  }

  return false;
}

// Função que verifica se o id/número já foi utilizado.
export async function pokemonIdExists(number) {
  const sql = `
  SELECT *
  FROM pokemon
  WHERE id = $1
  `;
  const values = [number];
  const result = await query(sql, values);

  if (result.rows.length > 0) {
    return true;
  }

  return false;
}

export async function createPokemon(number, name) {
  const sql = `
    INSERT INTO pokemon (id, name)
    VALUES($1, $2) RETURNING *;
  `;
  const values = [number, name];
  const result = await query(sql, values);

  return result.rows[0];
}

export async function createPokemonType(number, type) {
  let sql = `
    SELECT id 
    FROM type 
    WHERE type = $1;
  `;
  let values = [type];
  const result = await query(sql, values);

  // console.log(result);
  // console.log(result.rows[0].id);

  sql = `
    INSERT INTO pokemon_type (id_pokemon, id_type)
    VALUES($1, $2);
  `;
  values = [number, result.rows[0].id];
  await query(sql, values);
}

export async function createPokemonWeakness(number, weakness) {
  let sql = `
    SELECT id
    FROM type
    WHERE type = $1;
  `;
  let values = [weakness];
  const result = await query(sql, values);

  sql = `
    INSERT INTO pokemon_weakness (id_pokemon, id_type)
    VALUES ($1, $2);
  `;
  values = [number, result.rows[0].id];
  await query(sql, values);
}

// Foi alterada, agora ela recebe não só o nome, mas também o número.
export async function getPokemon(name, number) {
  const sql = `
    SELECT id
    FROM pokemon
    WHERE name = $1 AND number = $2;
  `;
  const values = [name, number];
  const result = await query(sql, values);

  return result.rows;
}

export async function createPokemonEvolvesFrom(number, evolvesFrom) {
  const sql = `
    INSERT INTO pokemon_evolves_from (id_pokemon, id_pokemon_evolves_from)
    VALUES ($1, $2);
  `;
  const values = [number, evolvesFrom];
  await query(sql, values);
}

export async function createPokemonEvolvesTo(number, evolvesTo) {
  const sql = `
    INSERT INTO pokemon_evolves_to (id_pokemon, id_pokemon_evolves_to)
    VALUES ($1, $2);
  `;
  const values = [number, evolvesTo];
  await query(sql, values);
}

export async function getPokemonName(number) {
  const sql = `
    SELECT name
    FROM pokemon
    WHERE id = $1;
  `;
  const values = [number];
  const result = await query(sql, values);

  return result.rows[0].name;
}

// Feita pelo William.
export async function getPokemonByName(name) {
  const sql = `
    SELECT id
    FROM pokemon
    WHERE name = $1;
  `;
  const values = [name];
  const result = await query(sql, values);

  return result.rows;
}

// Feita pelo William.
export async function getPokemonByNumber(number) {
  const sql = `
    SELECT id
    FROM pokemon
    WHERE number = $1;
  `;
  const values = [number];
  const result = await query(sql, values);

  return result.rows;
}

export async function getPokemonType(number) {
  const sql = `
    SELECT type.type 
    FROM type 
    JOIN pokemon_type 
    ON type.id = pokemon_type.id_type
    WHERE pokemon_type.id_pokemon = $1;
  `;
  const values = [number];
  const result = await query(sql, values);

  return result;
}

export async function getPokemonWeakness(number) {
  const sql = `
    SELECT type.type 
    FROM type 
    JOIN pokemon_weakness 
    ON type.id = pokemon_weakness.id_type
    WHERE pokemon_weakness.id_pokemon = $1;
  `;
  const values = [number];
  const result = await query(sql, values);

  return result;
}

export async function getPokemonEvolvesFrom(number) {
  const sql = `
    SELECT pokemon.name
    FROM pokemon
    JOIN pokemon_evolves_from
    ON pokemon.id = pokemon_evolves_from.id_pokemon_evolves_from
    WHERE pokemon_evolves_from.id_pokemon = $1;
  `;
  const values = [number];
  const result = await query(sql, values);

  return result.rows[0].name;
}

export async function getPokemonEvolvesTo(number) {
  const sql = `
    SELECT pokemon.name
    FROM pokemon
    JOIN pokemon_evolves_to
    ON pokemon.id = pokemon_evolves_to.id_pokemon_evolves_to
    WHERE pokemon_evolves_to.id_pokemon = $1;
  `;
  const values = [number];
  const result = await query(sql, values);

  return result.rows;
}

// Pesquisar o erro acusado pelo "return await".
