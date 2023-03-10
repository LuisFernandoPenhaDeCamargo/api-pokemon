/* eslint-disable object-curly-newline, no-lone-blocks, no-restricted-syntax, no-await-in-loop */

import {
  pokemonExists,
  pokemonIdExists,
  createPokemon,
  createPokemonType,
  createPokemonWeakness,
  getPokemon,
  getPokemonByName,
  getPokemonByNumber,
  createPokemonEvolvesFrom,
  createPokemonEvolvesTo,
  getPokemonName,
  getPokemonType,
  getPokemonWeakness,
  getPokemonEvolvesFrom,
  getPokemonEvolvesTo,
} from "../models/pokemon";
import { AppError } from "../errors/app-error";
import {
  isNumberValid,
  isNameValid,
  isTypeValid,
  isWeaknessValid,
  isEvolvesFromValid,
  isEvolvesToValid,
  isNumberValidGet,
  isNameValidGet,
} from "./create-pokemon-validations";

// Função de formatação do conjunto de caracteres.
function formattingTheParameter(parameter) {
  return parameter.charAt(0).toUpperCase() + parameter.slice(1).toLowerCase();
  /* type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
     A vantagem de se criar um método ao invés de fazer como a linha acima, é que é possível testar
     o método com o vitest. */
}

// Valida os dados recebidos pelo body.
function isValid(number, name, types, weakness, evolvesFrom, evolvesTo) {
  if (!isNumberValid(number)) {
    throw new AppError(
      "A númeração do pokémon precisa ser um inteiro maior que zero.",
      500
    );
  }

  if (!isNameValid(name)) {
    throw new AppError(
      "O nome do pokémon precisa ser um conjunto de caracteres.",
      500
    );
  }

  if (!isTypeValid(types)) {
    throw new AppError(
      "O tipo do pokémon precisa ser uma lista de conjunto de caracteres.",
      500
    );
  }

  if (!isWeaknessValid(weakness)) {
    throw new AppError(
      "A fraqueza do pokémon precisa ser uma lista de conjunto caracteres.",
      500
    );
  }

  if (!isEvolvesFromValid(evolvesFrom)) {
    throw new AppError(
      "O pokémon do qual este evoluiu precisa ser um conjunto de caractes caso ele possua uma.",
      500
    );
  }

  if (!isEvolvesToValid(evolvesTo)) {
    throw new AppError(
      "A evolução deste pokémon precisa ser uma lista de conjunto de caractes caso ele possua uma.",
      500
    );
  }
}

class PokemonController {
  async create(body) {
    const responseObject = {};
    const { number, types, weakness, evolves_to } = body;
    let { name, evolves_from } = body;

    // Validação dos campos.
    isValid(number, name, types, weakness, evolves_from, evolves_to);

    name = formattingTheParameter(name);

    if (await pokemonExists(number, name)) {
      throw new AppError("O pokémon já existe no banco de dados.", 500);
    }

    if (await pokemonIdExists(number)) {
      throw new AppError("O número já foi utilizado.", 500);
    }

    // Tentativa de criação do pokémon.
    try {
      await createPokemon(number, name); // "const createdPokemon = "
    } catch (error) {
      /* O "catch" captura o erro lançado e o passa para o paramêtro do objeto AppError. Error
      provavelmente é um objeto e possui o atributo message */
      throw new AppError(error.message, 500);
    }

    // Inserindo os tipos do pokémon no banco.
    for (let type of types) {
      type = formattingTheParameter(type);
      await createPokemonType(number, type);
    }

    // Inserindo as fraquezas do pokémon no banco.
    for (let item of weakness) {
      item = formattingTheParameter(item);
      await createPokemonWeakness(number, item);
    }

    // Inserindo os pokémons de qual esse evolui.
    // Condicional que verifica se o pokémon evolui de outro.
    // eslint-disable-next-line camelcase
    if (typeof evolves_from !== "undefined") {
      // eslint-disable-next-line camelcase
      evolves_from = formattingTheParameter(evolves_from);
      const result = await getPokemonByName(evolves_from);
      // Condicional que verifica se o pokémon do qual este evolui está registrado no banco.
      if (typeof result[0] !== "undefined") {
        await createPokemonEvolvesFrom(number, result[0].id);
      }
    }

    // Inserindo as evoluções.
    // Condicional que verifica se o pokémon possui evolução.
    // eslint-disable-next-line camelcase
    if (typeof evolves_to !== "undefined") {
      // Laço de repetição que verifica se a evolução está registrado no banco.
      // eslint-disable-next-line camelcase
      for (let evolution of evolves_to) {
        evolution = formattingTheParameter(evolution);
        const resultEvolvesTo = await getPokemonByName(evolution);
        // Condicional que verifica se a evolução está registrado no banco.
        if (typeof resultEvolvesTo[0] !== "undefined") {
          await createPokemonEvolvesTo(number, resultEvolvesTo[0].id);
        }
      }
    }

    return { statusCode: 200, responseObject };
  }

  async getPokemon(query) {
    const responseObject = {
      number: null,
      name: null,
      types: [],
      weakness: [],
      // eslint-disable-next-line camelcase
      evolves_from: null,
      // eslint-disable-next-line camelcase
      evolves_to: [],
    };
    let { number, name } = query;
    let namePokemon;
    let numberPokemon;

    /* Condicional que verifica se o número é definido e o tranforma em um tipo númerico (a query
      passa os seus dados como um conjunto de caracteres). */
    if (typeof number === "string") {
      // eslint-disable-next-line radix
      number = parseInt(number);
    }
    /* Condicional que formata o conjunto de caracteres se ele for definido. */
    if (typeof name === "string") {
      name = formattingTheParameter(name);
    }

    // Validação dos campos.
    if (!isNumberValidGet(number)) {
      throw new AppError(
        "Se a númeração do pokémon for definida ela precisa ser um inteiro maior que zero.",
        500
      );
    }

    if (!isNameValidGet(name)) {
      throw new AppError(
        "Se o nome do pokémon for definido ele precisa ser um conjunto de caracteres.",
        500
      );
    }

    // Condicional que verifica se há um pokémon relacionado a este número no banco.
    if (typeof number !== "undefined") {
      try {
        namePokemon = await getPokemonName(number);
      } catch (error) {
        throw new AppError("Pokémon não encontrado no banco.", 500);
      }
    } else {
      namePokemon = name;
    }

    // Condicional que verifica se há um pokémon com este nome no banco.
    if (typeof name !== "undefined") {
      try {
        numberPokemon = await getPokemonByName(name);
        numberPokemon = numberPokemon[0].id;
      } catch (error) {
        throw new AppError("Pokémon não encontrado no banco.", 500);
      }
    } else {
      numberPokemon = number;
    }

    if (!(await pokemonExists(numberPokemon, namePokemon))) {
      throw new AppError("Combinação de número e nome não é válida.", 500);
    }

    responseObject.number = numberPokemon;
    responseObject.name = namePokemon;

    // Retornando os tipos do pokémon.
    let resultType = await getPokemonType(numberPokemon);
    resultType = resultType.rows;
    /* O William utilizou o "forEach" uma vez para realizar uma chamada ao banco e não deu certo, a
    partir dai ele utiliza o "for(tipoDaVariável nomeDaVariável of nomeDaLista){} para lidar com
    chamadas assíncronas */
    resultType.forEach((item) => {
      responseObject.types.push(item.type);
    });

    // Retornando as fraquezas do pokémon.
    let resultWeakness = await getPokemonWeakness(numberPokemon);
    resultWeakness = resultWeakness.rows;
    resultWeakness.forEach((item) => {
      responseObject.weakness.push(item.type);
    });

    // Retornando de qual pokémon este evolui.
    const resultPokemonEvolvesFrom = await getPokemonEvolvesFrom(numberPokemon);
    if (typeof resultPokemonEvolvesFrom !== "undefined") {
      // eslint-disable-next-line camelcase
      responseObject.evolves_from = resultPokemonEvolvesFrom;
    }

    // Retornado a evolução.
    const resultEvolvesTo = await getPokemonEvolvesTo(numberPokemon);
    if (typeof resultEvolvesTo !== "undefined") {
      resultEvolvesTo.forEach((item) => {
        responseObject.evolves_to.push(item.name);
      });
    }
    /* A nossa obrigação em relação ao "response" é retornar o que nos é pedido, deixe o display da
    informação para o front-end */

    return { statusCode: 200, responseObject };
  }

  async getPokemonWilliam(query) {
    const responseObject = {
      number: null,
      name: null,
      types: [],
      weakness: [],
      // eslint-disable-next-line camelcase
      evolves_from: null,
      // eslint-disable-next-line camelcase
      evolves_to: [],
    };

    let { number, name } = query;

    if (typeof number === "string") {
      // eslint-disable-next-line radix
      number = parseInt(number);
    }

    if (typeof name === "string") {
      name = formattingTheParameter(name);
    }

    const searchType = this.getPokemonSearchType(name, number);

    if (!searchType) {
      throw new AppError("Get parameters invalid", 500);
    }

    let pokemon = null;
    if (searchType === "nameAndNumber") {
      pokemon = await getPokemon(name, number);
    } else if (searchType === "name") {
      pokemon = await getPokemonByName(name);
    } else if (searchType === "number") {
      pokemon = await getPokemonByNumber(number);
    }

    if (!pokemon) {
      throw new AppError("Pokemon does not exist in the pokedex", 500);
    }

    return { statusCode: 200, responseObject };
  }

  getPokemonSearchType(name, number) {
    const nameSearch = isNameValid(name);
    const numberSearch = isNumberValid(number);
    const nameAndNumberSearch = nameSearch && numberSearch;

    if (nameAndNumberSearch) {
      return "nameAndNumberSearch";
    }
    if (nameSearch) {
      return "nameSearch";
    }
    if (numberSearch) {
      return "numberSearch";
    }
    return false;
  }

  async updatePokemon(body) {
    const responseObject = {};

    return { statusCode: 200, responseObject };
  }

  /* async deletePokemon(query) {
    const responseObject = {};

    return { statusCode: 200, responseObject };
  } */
}

export default new PokemonController();
