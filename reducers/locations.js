import {defaultLocations} from '../data';

const locationsState = {
    device: {},
    ...defaultLocations,
}

const locations = (state = locationsState, action) => {
  switch (action.type) {
    case 'SET_DEVICE_LOCATION':
      return {
        ...state,
        device: {
          latitude: action.latitude,
          longitude: action.longitude,
          city: action.city
        }
      }
    default:
      return state
  }
}

export default locations