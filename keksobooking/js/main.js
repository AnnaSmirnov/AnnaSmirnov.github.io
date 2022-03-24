import {addPinsToMap, onLoadMap} from './map.js';
import {addBlockFiltersForm,setMapFilters,removeBlockFiltersForm} from './filters.js';
import {addBlockForm} from './form.js';
import {sendData, getData} from './api.js';
import {loadAvatar, loadFoto} from './avatar.js';

addBlockFiltersForm();
addBlockForm();

sendData();

onLoadMap(() => {
  getData((offerList) => {
    addPinsToMap(offerList);
    setMapFilters(offerList);
    removeBlockFiltersForm();
  });
});

loadAvatar();
loadFoto();
