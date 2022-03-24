import {removeBlockForm} from './form.js';
import {createCustomPopup} from './popup.js';

const ADVERT_COUNT = 10;
const MAP_CENTER_LAT = 35.68390;
const MAP_CENTER_LNG = 139.75323;
const ZOOM_MAP = 12;
const MAIN_MARKER_SIZES = [52, 52];
const MAIN_MARKER_ANCHORS = [26, 52];
const MAIN_MARKER_URL = 'img/main-pin.svg';
const MARKER_SIZES = [40, 40];
const MARKER_ANCHORS = [20, 40];
const MARKER_URL = 'img/pin.svg';
const address = document.querySelector('#address');

let map;
let markerGroup;
let mainMarker;

const mainMarkerIcon = L.icon({
  iconUrl: MAIN_MARKER_URL,
  iconSize: MAIN_MARKER_SIZES,
  iconAnchor: MAIN_MARKER_ANCHORS,
});

const createMainMarker = () => {
  mainMarker = L.marker(
    {
      lat: MAP_CENTER_LAT,
      lng: MAP_CENTER_LNG,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  mainMarker.on('moveend', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  mainMarker.addTo(map);
};

const onLoadMap = (onLoad) => {
  map = L.map('map-canvas')
    .on('load', () => {
      onLoad();
      removeBlockForm();
    })
    .setView({
      lat: MAP_CENTER_LAT,
      lng: MAP_CENTER_LNG,
    }, ZOOM_MAP);
  markerGroup = L.layerGroup().addTo(map);
  createMainMarker();
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const createMarker = (advert) => {
  const icon = L.icon({
    iconUrl: MARKER_URL,
    iconSize: MARKER_SIZES,
    iconAnchor: MARKER_ANCHORS,
  });
  const { location: {lat,lng}} = advert;
  return L.marker({
    lat,
    lng,
  },
  {
    icon,
  });
};

const addPinsToMap = (advertList) => {
  advertList
    .slice(0, ADVERT_COUNT).forEach((advert) => {
      const marker = createMarker(advert);
      marker.addTo(markerGroup);
      marker.addTo(map).bindPopup(createCustomPopup(advert));
    });
};

const returnMapPinStarting = () => {
  map.setView({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  }, ZOOM_MAP);
  mainMarker.setLatLng({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  });

  map.closePopup();

  address.value = `${MAP_CENTER_LAT}, ${MAP_CENTER_LNG}`;
};

const clearMarkers = () => markerGroup.clearLayers();

export {addPinsToMap,returnMapPinStarting,onLoadMap,clearMarkers,ADVERT_COUNT};
