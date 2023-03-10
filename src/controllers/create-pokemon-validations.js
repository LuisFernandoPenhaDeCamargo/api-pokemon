/* eslint-disable no-restricted-syntax */
/* Arquivo utilizado para a realização da validação dos parâmetros recebidos pelo body na
classe instanciada, PokemonController, chamada pelo rota '"/create-pokemon"' */
/* (1 == "1") = true, pois compara o valor.
   (1 === "1") = false, pois compara o tipo e o valor. */

export function isNumberValid(number) {
  if (typeof number !== "number") {
    return false;
  }

  if (!Number.isInteger(number) || number <= 0) {
    return false;
  }

  return true;
}

export function isNameValid(name) {
  if (typeof name !== "string") {
    return false;
  }

  return true;
}

export function isTypeValid(types) {
  if (!Array.isArray(types)) {
    return false;
  }

  if (types.length > 2 || types.length === 0) {
    return false;
  }

  for (const item of types) {
    if (typeof item !== "string") {
      return false;
    }
  }

  return true;
}

export function isWeaknessValid(weakness) {
  if (!Array.isArray(weakness)) {
    return false;
  }

  if (weakness.length === 0) {
    return false;
  }

  for (const item of weakness) {
    if (typeof item !== "string") {
      return false;
    }
  }

  return true;
}

export function isEvolvesFromValid(evolvesFrom) {
  if (typeof evolvesFrom === "string" || typeof evolvesFrom === "undefined") {
    return true;
  }

  return false;
}

export function isEvolvesToValid(evolvesTo) {
  if (Array.isArray(evolvesTo)) {
    if (evolvesTo.length === 0) {
      return false;
    }
    for (const item of evolvesTo) {
      if (typeof item === "string") {
        return true;
      }
    }
  }

  if (typeof evolvesTo === "undefined") {
    return true;
  }

  return false;
}

export function isNumberValidGet(number) {
  if (typeof number === "number") {
    if (Number.isInteger(number) && number > 0) {
      return true;
    }
  }

  if (typeof number === "undefined") {
    return true;
  }

  return false;
}

export function isNameValidGet(name) {
  if (typeof name === "string") {
    return true;
  }

  if (typeof name === "undefined") {
    return true;
  }

  return false;
}
