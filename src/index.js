import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryListContainer = document.querySelector('.country-list');
const countryCardContainer = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(event) {
  const searchText = event.target.value.trim();
 if (event.target.value.length === 0) {
    clearInterface();
 }
  fetchCountries(searchText)
    .then(countries => {
      if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
          clearInterface();
        return;
      } else if (countries.length > 10) {
            clearInterface();
            Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.');
        return;
      }else if (countries.length === 1) {
        clearInterface();
        displayCountryCard(countries);
        return;
        }
        clearInterface();
      displayCountryList(countries)
      
    })
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearInterface();
    });
}

function clearInterface() {
  countryListContainer.innerHTML = '';
  countryCardContainer.innerHTML = '';
}

function displayCountryCard(country) {
    let countriesMap = country.map(({languages}) => {
        return Object.values(languages).join(`, `)})
        
    const markup = `<div class="card">
            <div class="position">
            <img src="${country[0].flags.svg}" width="30" height="28" alt="${country[0].capital} flag">
            <h3>${country[0].name.official}</h3>
            </div>
            <p><strong>Capital:</strong> ${country[0].capital}</p>
            <p><strong>Population:</strong> ${country[0].population}</p>
            <p><strong>Languages:</strong> ${countriesMap}</p>
        </div>`;

  countryCardContainer.innerHTML = markup;
}

function displayCountryList(countries) {

  const markup = countries.map((country) => {
  return `<li class="position">
                <img src="${country.flags.svg}" width="30" height="28" alt="${country.capital} flag">
                <h3>${country.name.official}<h3>
                </li>`}).join(``);
    countryListContainer.innerHTML = markup;
}
