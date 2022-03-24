import {ADVERT_COUNT,clearMarkers,addPinsToMap} from './map.js';
import {getData} from './api.js';

const filtersForm = document.querySelector('.map__filters');
const filtersElements = Array.from(filtersForm.children);
const typeFilterElement = filtersForm.querySelector('select[name="housing-type"]');
const priceFilterElement = filtersForm.querySelector('select[name="housing-price"]');
const roomsFilterElement = filtersForm.querySelector('select[name="housing-rooms"]');
const guestsFilterElement = filtersForm.querySelector('select[name="housing-guests"]');

const LOW_PRICE = 0;
const MIDDLE_PRICE = 10000;
const HIGH_PRICE = 50000;

const addBlockFiltersForm = () => {
  filtersForm.classList.add('map__filters--disabled');
  filtersElements.forEach((element) => {
    element.disabled = true;
  });
};

const removeBlockFiltersForm = () => {
  filtersForm.classList.remove('map__filters--disabled');
  filtersElements.forEach((element) => {
    element.disabled = false;
  });
};

const filterByHouse = (advert) => typeFilterElement.value === 'any' || typeFilterElement.value === advert.offer.type;

const filterByPrice = (advert) => priceFilterElement.value === 'any'
  || (priceFilterElement.value === 'low' && advert.offer.price >= LOW_PRICE && advert.offer.price < MIDDLE_PRICE)
  || (priceFilterElement.value === 'middle' && advert.offer.price >= MIDDLE_PRICE && advert.offer.price <= HIGH_PRICE)
  || (priceFilterElement.value === 'high' && advert.offer.price > HIGH_PRICE);

const filterByRooms = (advert) => roomsFilterElement.value === 'any' || Number(roomsFilterElement.value) === advert.offer.rooms;

const filterByGuests = (advert) => guestsFilterElement.value === 'any' || Number(guestsFilterElement.value) === advert.offer.guests;

const filterByFeatures = (advert) => {
  const features = advert.offer.features || [];
  const featuresListNode = filtersForm.querySelectorAll('.map__checkbox:checked');
  const featuresSelected = Array.from(featuresListNode).map((input) => input.value);
  return featuresSelected.every((element) => features.includes(element));
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const setMapFilters = (offer) => {
  filtersForm.addEventListener('change', debounce(() => {
    const selectOffers = offer.filter((advert) =>
      filterByHouse(advert)
    && filterByPrice(advert)
    && filterByRooms(advert)
    && filterByGuests(advert)
    && filterByFeatures(advert));
    clearMarkers();
    addPinsToMap(selectOffers.slice(0, ADVERT_COUNT));
  },
  ));
};

const resetMapFilters = () => {
  clearMarkers();
  getData((offerList) => {
    addPinsToMap(offerList);
    setMapFilters(offerList);
  });
};

export {addBlockFiltersForm,removeBlockFiltersForm,setMapFilters,resetMapFilters};
