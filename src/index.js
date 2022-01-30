import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { trim } from 'lodash';
import template from './templates/countryList.hbs';
import fullInfo from './templates/targetCountry.hbs';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  fitedCountry: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(ev) {
  const value = trim(ev.target.value);
  if (value.length > 0) {
    fetchCountries(value)
      .then(response => response.json())
      .then(makeMarkupfromPromise)
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  } else {
    clearList();
    clearinfo();
  }
}

function makeMarkupfromPromise(data) {
  if (data.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  const markup = data.map(el => template(el)).join('\n');
  refs.countryList.innerHTML = markup;
  if (data.length === 1) {
    refs.fitedCountry.innerHTML = fullInfo(data[0]);
  } else {
    clearinfo();
  }
}

function clearList() {
  refs.countryList.innerHTML = '';
}
function clearinfo() {
  refs.fitedCountry.innerHTML = '';
}
