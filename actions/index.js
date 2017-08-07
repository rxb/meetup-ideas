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