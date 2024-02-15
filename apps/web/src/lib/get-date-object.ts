import { getTime } from 'date-fns'

export const getDateObject = (date?: Date | string) => {
	const userTimezoneOffset = 0
	const dateObject = date
		? new Date(typeof date === 'string' ? date.replace('-', '/') : date)
		: new Date()

	return new Date(getTime(dateObject) + userTimezoneOffset)
}
