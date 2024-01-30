import { getDate, getMonth, getYear } from 'date-fns'

export const getFormattedDate = (date: Date | undefined): string => {
	if (!date) {
		return `${getYear(new Date())}-${getMonth(new Date()) + 1}-${getDate(
			new Date(),
		)}`
	}

	return `${getYear(date)}-${getMonth(date) + 1}-${getDate(date)}`
}
