import {data} from '../data';

const groups = (state = {...data}, action) => {
  switch (action.type) {
    /*
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    */
    default:
      return state
  }
}

export default groups