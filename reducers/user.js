import {defaultLon, defaultLat, defaultCity} from '../data';

const defaultUser = {
  latitude: defaultLat,
  longitude: defaultLon,
  city: defaultCity,
  isFinding: false
};

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
        city: action.city,
      }
    case 'SET_IS_FINDING':
      return {
        ...state,
        isFinding: action.isFinding,
      }
    default:
      return state
  }
}

export default user