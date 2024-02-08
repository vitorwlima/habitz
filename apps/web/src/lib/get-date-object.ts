import { getTime } from 'date-fns'

export const getDateObject = (date?: Date | string) => {
	const userTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
	const dateObject = date ? new Date(date) : new Date()

	return new Date(getTime(dateObject) + userTimezoneOffset)
}
