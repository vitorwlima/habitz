import { getDate, getMonth, getYear } from 'date-fns'

const getStringValue = (value: number) => {
	return value < 10 ? `0${value}` : `${value}`
}

export const getFormattedDate = (date: Date): string => {
	const monthValue = getMonth(date) + 1
	const monthString = getStringValue(monthValue)
	const dayValue = getDate(date)
	const dayString = getStringValue(dayValue)

	return `${getYear(date)}-${monthString}-${dayString}`
}
