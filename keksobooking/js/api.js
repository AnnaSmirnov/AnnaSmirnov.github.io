import {adForm, resetForm} from './form.js';
import {closeMessage} from './utils.js';
import { showAlert } from './utils.js';

const SAVE_FORM_URL = 'https://24.javascript.pages.academy/keksobooking';
const DATE_MAP_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess) => {
  fetch(DATE_MAP_URL)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then(onSuccess);
      } else {
        showAlert('Не удалось загрузить данные');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');},
    );
};

/*
const getData = () => {
  fetch(DATE_MAP_URL)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offerList) => {
            addPinsToMap(offerList);
            setMapFilters(offerList);
            removeBlockFiltersForm();
          });
      } else {
        showAlert('Не удалось загрузить данные');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');},
    );
};
*/
const sendData = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      SAVE_FORM_URL,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          closeMessage('success');
          resetForm();

        } else {
          closeMessage('error');
        }
      })
      .catch(() => {
        closeMessage('error');
      });
  });
};

export {getData, sendData};
