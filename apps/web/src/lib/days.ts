export type DayValue = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
export type DayLabel =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday'
export type Day = {
	label: DayLabel
	value: DayValue
}

export const days: Day[] = [
	{
		label: 'Monday',
		value: 'mon',
	},
	{
		label: 'Tuesday',
		value: 'tue',
	},
	{
		label: 'Wednesday',
		value: 'wed',
	},
	{
		label: 'Thursday',
		value: 'thu',
	},
	{
		label: 'Friday',
		value: 'fri',
	},
	{
		label: 'Saturday',
		value: 'sat',
	},
	{
		label: 'Sunday',
		value: 'sun',
	},
]
