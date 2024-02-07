import { getDate, getMonth, getYear } from 'date-fns'

export const getFormattedDate = (date: Date): string => {
	return `${getYear(date)}-${getMonth(date) + 1}-${getDate(date)}`
}
