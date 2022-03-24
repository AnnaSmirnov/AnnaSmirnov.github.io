const card = document.querySelector('#card').content.querySelector('.popup');

const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};


const createAvatar = (advert, elementOfCard) => {
  const popupAvatar = elementOfCard.querySelector('.popup__avatar');
  if(advert.author.avatar) {
    popupAvatar.src = advert.author.avatar;
  } else {
    popupAvatar.remove();
  }
};

const createPhotos = (advert,elementOfCard) => {
  const popupPhotos = elementOfCard.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if(Array.isArray(advert.offer.photos)) {
    advert.offer.photos.forEach((photoSrc, index) => {
      if(index === 0){
        popupPhoto.src = advert.offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotos.appendChild(popupPhotoItem);
      }
    });
  } else if(advert.offer.photos) {
    popupPhoto.src = advert.offer.photos;
  } else {
    popupPhotos.remove();
  }
};

const createFeatures = (advert,elementOfCard) => {
  const popupFeatures = elementOfCard.querySelector('.popup__features');
  const popupFeatureList = popupFeatures.querySelectorAll('.popup__feature');

  if(Array.isArray(advert.offer.features)) {
    const modifiers = advert.offer.features.map((featureValue) =>`popup__feature--${featureValue}`);

    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeature.remove();
      }
    });
  } else {
    const modifiers = `popup__feature--${advert.offer.features}`;
    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (modifiers !== modifier) {
        popupFeature.remove();
      }
    });}
};

const createCustomPopup = (advert)  => {
  const cardElement = card.cloneNode(true);
  const popupItems = [
    [advert.offer.title, cardElement.querySelector('.popup__title'), advert.offer.title],
    [advert.offer.address, cardElement.querySelector('.popup__text--address'), advert.offer.address],
    [advert.offer.price, cardElement.querySelector('.popup__text--price'),`${advert.offer.price} ₽/ночь`],
    [advert.offer.type, cardElement.querySelector('.popup__type'), TYPES[advert.offer.type]],
    [advert.offer.description,cardElement.querySelector('.popup__description'), advert.offer.description],
    [(advert.offer.rooms && advert.offer.guests), cardElement.querySelector('.popup__text--capacity'), `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`],
    [(advert.offer.checkin && advert.offer.checkout), cardElement.querySelector('.popup__text--time'),`Заезд после ${advert.offer.checkin} выезд до ${advert.offer.checkout}`],
  ];

  popupItems.forEach((popupItem) => {
    if(popupItem[0]){
      const popupElement = popupItem[1];
      popupElement.textContent = popupItem[2];
    } else {
      popupItem[1].remove();
    }});
  createAvatar(advert,cardElement);
  createPhotos(advert,cardElement);
  createFeatures(advert,cardElement);
  return cardElement;
};

export {createCustomPopup};
