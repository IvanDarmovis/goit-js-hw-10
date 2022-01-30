export function fetchCountries(text) {
  return fetch(
    `https://restcountries.com/v3.1/name/${text}?fields=name,capital,population,flags,languages`,
  );
}
