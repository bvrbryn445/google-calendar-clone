import { Dayjs } from 'dayjs';
import '../styles.scss';

import TimeRow from '../Time/TimeRow';
import { dateToday, getDateValues } from '../../../util/calendar-arrangement';
import { SelectedDate } from '../../../context/global/index.model';
import GlobalContext from '../../../context/global/GlobalContext';
import { useContext } from 'react';
import GlobalContextInterface from '../../../context/global/index.model';

interface DayHeaderProps {
	dateObj: Dayjs,
	dayIndex: number,
	isCentered?: boolean | undefined,
	isSelectable?: boolean | undefined,
}

export default function DayHeader(props: DayHeaderProps) {
	const {
		selectedDate,
		setSelectedDate,
		setCalendarType,
	} = useContext(GlobalContext) as GlobalContextInterface;
	const { dateObj, dayIndex, isCentered = true } = props;

	const areDatesEqual = (dateObjToCompare: SelectedDate) => {
		const { year, month, day } = dateObjToCompare;
		const numericalYear = Number(dateObj.format('YYYY'));
		const numericalMonth = Number(dateObj.format('M'));
		const numericalDay = Number(dateObj.format('D'));
		return year === numericalYear && month === numericalMonth && day === numericalDay;
	}

	const dateInfoModifierName = () => {
		if (areDatesEqual(dateToday)) {
			return '--today';
		} else if (areDatesEqual(selectedDate)) {
			return '--selected';
		}
		return '';
	}

	const selectDateByClick = () => {
		const year = Number(dateObj.format('YYYY'));
		const month = Number(dateObj.format('M'));
		const day = Number(dateObj.format('D'));
		setSelectedDate(date => ({ ...date, year, month, day }));
	}

	const switchDateAndCalendarType = () => {
		selectDateByClick();
		setCalendarType('day');
	}
	
	return (
		<div className='calendar-day__header'>
			<div className={`calendar-day__info--${!isCentered ? 'not-' : ''}centered flex-centered`}>
				<h6 className={`calendar-day__ddd-format${dateInfoModifierName()}`}>
					{dateObj.format('ddd')}
				</h6>
				<div
					className={`calendar-day__num-format${dateInfoModifierName()} flex-centered`}
					onClick={switchDateAndCalendarType}
				>
					{dateObj.format('D')}
				</div>
			</div>
			<TimeRow dateValues={getDateValues(dateObj)} dayIndex={dayIndex} />
		</div>
	)
}