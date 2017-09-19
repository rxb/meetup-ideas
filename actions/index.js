export const resetSchedule = () => ({
	type: 'RESET_SCHEDULE'
})

export const setScheduleWhere = (where) => ({
  type: 'SET_SCHEDULE_WHERE',
  where
})

export const setScheduleWhen = (when) => ({
  type: 'SET_SCHEDULE_WHEN',
  when
})

export const setScheduleDuration = (duration) => ({
  type: 'SET_SCHEDULE_DURATION',
  duration
})

export const setScheduleSize = (size) => ({
  type: 'SET_SCHEDULE_SIZE',
  size
})

export const setUserLocation = (latitude, longitude, city) => ({
  type: 'SET_USER_LOCATION',
  latitude,
  longitude,
  city
})

export const setDeviceLocation = (latitude, longitude, city) => ({
  type: 'SET_DEVICE_LOCATION',
  latitude,
  longitude,
  city
})

export const setIsFinding = (isFinding) => ({
  type: 'SET_IS_FINDING',
  isFinding
})

export const setUserName = (name) => ({
  type: 'SET_USER_NAME',
  name
})