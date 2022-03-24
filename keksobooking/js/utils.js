import {removeAvatarFoto} from './avatar.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const closeButton = errorTemplate.querySelector('.error__button');
const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max, numberOfDecimalPlace) => {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  const randomFloat = (Math.random() * (max - min) + min);
  return randomFloat.toFixed(numberOfDecimalPlace);
};

const getRandomArrayElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const getRandomItemsArray = (array) => {
  const items = array.slice();
  const randomCount = getRandomInteger(1, array.length-1);
  const resultArray = [];
  for (let i = 0; i < randomCount; i++ ) {
    const randomId = getRandomInteger(0,items.length-1);
    resultArray.push(items[randomId]);
    items.splice(randomId, 1);
  }
  return resultArray;
};

const onEscapeKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    window.removeEventListener('keydown', onEscapeKeyPress);
    closeMessage();
    removeAvatarFoto();
  }
};

function closeMessage(templateId) {
  const bodyNode = document.body;
  const messageTemplateNode = document.querySelector(`#${templateId}`).content;
  const messageNode = messageTemplateNode.firstElementChild.cloneNode(true);

  const onMessageClick = () => {
    messageNode.remove();
    removeAvatarFoto();
    window.removeEventListener('keydown', onEscapeKeyPress);
  };
  messageNode.addEventListener('click', onMessageClick);
  window.addEventListener('keydown', onEscapeKeyPress);
  bodyNode.appendChild(messageNode);
}

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeMessage();
  removeAvatarFoto();
});

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Ошибка сервера';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getRandomFloat, getRandomItemsArray, getRandomArrayElement, closeMessage,showAlert};
