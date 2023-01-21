
const fetchCountries = (name) => {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    // return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchCountries };
