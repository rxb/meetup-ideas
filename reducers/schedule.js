const schedule = (state = {}, action) => {
	switch (action.type) {
		case 'RESET_SCHEDULE':
			return {}
		case 'SET_SCHEDULE_WHERE':
			return {
				...state,
				where: action.where
			}
    case 'SET_SCHEDULE_WHEN':
      return {
        ...state,
        when: action.when
      }
    case 'SET_SCHEDULE_SIZE':
      return {
        ...state,
        size: action.size
      }
    case 'SET_SCHEDULE_DURATION':
      return {
        ...state,
        duration: action.duration
      }
		default:
			return state
	}
}

export default schedule