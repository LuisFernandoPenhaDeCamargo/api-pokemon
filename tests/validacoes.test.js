// "it" foi removido do import, não estava sendo utilizado.
// Arquivo utilizado para realização de testes.
import { describe, test, expect } from "vitest";
import {
  isNumberValid,
  isNameValid,
  isTypeValid,
  isWeaknessValid,
  isEvolvesFromValid,
  isEvolvesToValid,
  isNumberValidGet,
  isNameValidGet,
} from "../src/controllers/create-pokemon-validations";
// Estamos realizando testes unitários, testando pequenos pedaços de código, métodos.

// "describe" é um conjunto de testes.

// Inteiro positivo.
describe("Validação do número.", () => {
  test("Número do pokémon é válido.", () => {
    const number = 1;
    expect(isNumberValid(number)).toEqual(true);
    /* - isNameValid retorna true or false;
       - toEqual realiza a seguinte ação: "expect(isNameValid(name)) == parâmetro";
       - toEqual é um método do objeto retornado pelo "expect". */
  });

  // undefined != null.
  test('Testando o número como "undefined".', () => {
    const number = undefined;
    expect(isNumberValid(number)).toEqual(false);
  });

  test('Testando o número como "null".', () => {
    const number = null;
    expect(isNumberValid(number)).toEqual(false);
  });

  test("Testando o número como um conjunto de caracteres.", () => {
    const number = "1";
    expect(isNumberValid(number)).toEqual(false);
  });

  test("Testando o número como uma lista de inteiros positivos.", () => {
    const number = [1];
    expect(isNumberValid(number)).toEqual(false);
  });

  test("Testando o número como um inteiro negativo.", () => {
    const number = -1;
    expect(isNumberValid(number)).toEqual(false);
  });

  test("Testando um número positivo fracionário.", () => {
    const number = 1.1;
    expect(isNumberValid(number)).toEqual(false);
  });
  /* "it("Isso deveria funcionar dessa forma")": a descrição da string no parâmetro é como o método
     deve se portar.
     "it" e "test" são basicamente o mesmo método. */
});

// Conjunto de caracteres.
describe("Validação do nome.", () => {
  test("Nome do pokémon é válido.", () => {
    const name = "Charmander";
    expect(isNameValid(name)).toEqual(true);
  });

  test("Testando o nome como undefined.", () => {
    const name = undefined;
    expect(isNameValid(name)).toEqual(false);
  });

  test("Testando o nome como null.", () => {
    const name = null;
    expect(isNameValid(name)).toEqual(false);
  });

  test("Testando o nome como um inteiro positivo.", () => {
    const name = 1;
    expect(isNameValid(name)).toEqual(false);
  });

  test("Testando o nome como uma lista de conjunto de caracteres.", () => {
    const name = ["Charmeleon"];
    expect(isNameValid(name)).toEqual(false);
  });

  test("Nome não formatado.", () => {
    const name = "cHarmander";
    expect(isNameValid(name)).toEqual(true);
  });
});

// Lista de conjunto de caracteres.
describe("Validação do tipo", () => {
  test("Tipo do pokémon é válido.", () => {
    const tipo = ["Fire"];
    expect(isTypeValid(tipo)).toEqual(true);
  });

  test("Tipo do pokemon é válido, passando dois tipos de pokémon.", () => {
    const tipo = ["Fire", "Flying"];
    expect(isTypeValid(tipo)).toEqual(true);
  });

  test('Testando o tipo como "undefined".', () => {
    const tipo = undefined;
    expect(isTypeValid(tipo)).toEqual(false);
  });

  test('Testando o tipo como "null".', () => {
    const tipo = null;
    expect(isTypeValid(tipo)).toEqual(false);
  });

  test("Testando o tipo em formato de string", () => {
    const tipo = "Fire";
    expect(isTypeValid(tipo)).toEqual(false);
  });

  test("Testando o tipo como um número inteiro positivo.", () => {
    const tipo = 1;
    expect(isTypeValid(tipo)).toEqual(false);
  });

  test("Testando o tipo como uma lista de inteiros positivos.", () => {
    const tipo = [1];
    expect(isTypeValid(tipo)).toEqual(false);
  });

  test("Testando o tipo como uma lista vazia.", () => {
    const tipo = [];
    expect(isTypeValid(tipo)).toEqual(false);
  });

  test("Testando o tipo do pokémon com uma lista de conjunto de caracteres não formatados.", () => {
    const tipo = ["fIre"];
    expect(isTypeValid(tipo)).toEqual(true);
  });

  test("Ultrapassando a quantidade máxima de tipos (dois).", () => {
    const tipo = ["Fire", "Flying", "Water"];
    const isValid = isTypeValid(tipo);
    expect(isValid).toEqual(false);
  });
});

// Lista de conjunto de caracteres.
describe("Validação das fraquezas.", () => {
  test("A fraqueza do pokémon é válida.", () => {
    const weakness = ["Water"];
    expect(isWeaknessValid(weakness)).toEqual(true);
  });

  test('Testando a fraqueza como "undefined".', () => {
    const weakness = undefined;
    expect(isWeaknessValid(weakness)).toEqual(false);
  });

  test('Testando a fraqueza como "null".', () => {
    const weakness = null;
    expect(isWeaknessValid(weakness)).toEqual(false);
  });

  test("Testando a fraqueza como um número positivo.", () => {
    const weakness = 1;
    expect(isWeaknessValid(weakness)).toEqual(false);
  });

  test("Testando a fraqueza como uma lista de inteiros.", () => {
    const weakness = [1];
    expect(isWeaknessValid(weakness)).toEqual(false);
  });

  test("Testando a fraqueza com uma lista vazia.", () => {
    const weakness = [];
    expect(isWeaknessValid(weakness)).toEqual(false);
  });

  test("Testando a fraqueza com uma lista de conjunto de caracteres não formatados.", () => {
    const weakness = ["wAter"];
    expect(isWeaknessValid(weakness)).toEqual(true);
  });
});

// Conjunto de caracteres e undefined.
describe("Validação do pokémon do qual este evoluiu.", () => {
  test("O pokémon do qual este evoluiu é válido.", () => {
    const evolvesFrom = "Charmander";
    expect(isEvolvesFromValid(evolvesFrom)).toEqual(true);
  });

  test('Testando o valor como "undefined".', () => {
    const evolvesFrom = undefined;
    expect(isEvolvesFromValid(evolvesFrom)).toEqual(true);
  });

  test('Testando o valor como "null".', () => {
    const evolvesFrom = null;
    expect(isEvolvesFromValid(evolvesFrom)).toEqual(false);
  });

  test("Testando o valor como um número positivo.", () => {
    const evolvesFrom = 1;
    expect(isEvolvesFromValid(evolvesFrom)).toEqual(false);
  });

  test("Testando o valor como uma lista de conjunto de caracteres.", () => {
    const evolvesFrom = ["Charmander", "Teste."];
    expect(isEvolvesFromValid(evolvesFrom)).toEqual(false);
  });

  test("Testando com o valor não formatado.", () => {
    const evolvesFrom = "cHarmander";
    expect(isEvolvesFromValid(evolvesFrom)).toEqual(true);
  });
});

// Lista de conjunto de caracteres e undefined.
describe("Validação da evolução.", () => {
  test("A evolução é válida.", () => {
    const evolvesTo = ["Charizard"];
    expect(isEvolvesToValid(evolvesTo)).toEqual(true);
  });

  test('Testando a evolução como "undefined".', () => {
    const evolvesTo = undefined;
    expect(isEvolvesToValid(evolvesTo)).toEqual(true);
  });

  test('Testando a evolução como "null".', () => {
    const evolvesTo = null;
    expect(isEvolvesToValid(evolvesTo)).toEqual(false);
  });

  test("Testando a evolução como um número positivo.", () => {
    const evolvesTo = 1;
    expect(isEvolvesToValid(evolvesTo)).toEqual(false);
  });

  test("Testando a evolução como uma lista de inteiros positivos.", () => {
    const evolvesTo = [1];
    expect(isEvolvesToValid(evolvesTo)).toEqual(false);
  });

  test("Testando a evolução com uma lista vazia.", () => {
    const evolvesTo = [];
    expect(isEvolvesToValid(evolvesTo)).toEqual(false);
  });

  test("Testando a evolução com uma lista de conjunto de caracteres não formatados.", () => {
    const evolvesTo = ["cHarizard"];
    expect(isEvolvesToValid(evolvesTo)).toEqual(true);
  });
});

// Inteiro positivo e undefined.
describe("Validação do número (get-pokemon).", () => {
  test("Número do pokémon é válido.", () => {
    const numberGet = 1;
    expect(isNumberValidGet(numberGet)).toEqual(true);
  });

  test('Testando o número como "undefined".', () => {
    const numberGet = undefined;
    expect(isNumberValidGet(numberGet)).toEqual(true);
  });

  test('Testando o número como "null".', () => {
    const numberGet = null;
    expect(isNumberValidGet(numberGet)).toEqual(false);
  });

  test("Testando o número como um conjunto de caracteres.", () => {
    const numberGet = "1";
    expect(isNumberValidGet(numberGet)).toEqual(false);
  });

  test("Testando o número como uma lista de inteiros.", () => {
    const numberGet = [1];
    expect(isNumberValidGet(numberGet)).toEqual(false);
  });

  test("Testando um número negativo.", () => {
    const numberGet = -1;
    expect(isNumberValidGet(numberGet)).toEqual(false);
  });

  test("Testando um número fracionário.", () => {
    const numberGet = 1.1;
    expect(isNumberValidGet(numberGet)).toEqual(false);
  });
});

// Conjunto de caracteres e undefined.
describe("Validação do nome (get-pokemon).", () => {
  test("Nome do pokémon é válido.", () => {
    const nameGet = "Charmander";
    expect(isNameValidGet(nameGet)).toEqual(true);
  });

  test("Testando o nome como undefined.", () => {
    const nameGet = undefined;
    expect(isNameValidGet(nameGet)).toEqual(true);
  });

  test("Testando o nome como null.", () => {
    const nameGet = null;
    expect(isNameValidGet(nameGet)).toEqual(false);
  });

  test("Testando o nome como um inteiro positivo.", () => {
    const nameGet = 1;
    expect(isNameValidGet(nameGet)).toEqual(false);
  });

  test("Testando o nome como uma lista de conjuntos caracteres.", () => {
    const nameGet = ["Charmeleon"];
    expect(isNameValidGet(nameGet)).toEqual(false);
  });

  test("Nome não formatado.", () => {
    const nameGet = "cHarmander";
    expect(isNameValidGet(nameGet)).toEqual(true);
  });
});
