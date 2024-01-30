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
	fnsValue: number
}

export const allDaysList: Day[] = [
	{
		label: 'Monday',
		value: 'mon',
		fnsValue: 1,
	},
	{
		label: 'Tuesday',
		value: 'tue',
		fnsValue: 2,
	},
	{
		label: 'Wednesday',
		value: 'wed',
		fnsValue: 3,
	},
	{
		label: 'Thursday',
		value: 'thu',
		fnsValue: 4,
	},
	{
		label: 'Friday',
		value: 'fri',
		fnsValue: 5,
	},
	{
		label: 'Saturday',
		value: 'sat',
		fnsValue: 6,
	},
	{
		label: 'Sunday',
		value: 'sun',
		fnsValue: 0,
	},
]
