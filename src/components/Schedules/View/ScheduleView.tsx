import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import GlobalContext from '../../../context/global/GlobalContext';
import GlobalContextInterface, {
	CalendarLabelType,
	EventInterface,
	ScheduleTypes,
	UserActionType,
} from '../../../context/global/index.model';
import { truncateString } from '../../../util/reusable-funcs';
import {
	dayjsObj,
	getScheduleTimeOptions,
	getShortDate,
	stringifiedDateToObj,
} from '../../../util/calendar-arrangement';
import useComponentVisible from '../../../hooks/useComponentVisible';

import '../styles.scss';
import CalendarIcon from '../../../assets/icons/calendar.png';
import ClockIcon from '../../../assets/icons/clock.png';
import DeleteIcon from '../../../assets/icons/trash.png';
import DescIcon from '../../../assets/icons/desc.png';
import EditIcon from '../../../assets/icons/edit.png';
import LocationIcon from '../../../assets/icons/location.png';

import Alert from '../../../lib/Alert/Alert';
import DataItem from './DataItem';
import { ScheduleNames, DateTimeInputs } from '../../../context/global/index.model';

interface ScheduleViewProps {
	readonly scheduleProps: ScheduleTypes;
	setIsScheduleViewVisible: Dispatch<SetStateAction<boolean>>;
}

interface HoursRangeProps {
	readonly dateTime: DateTimeInputs;
	readonly type: ScheduleNames;
}

function HoursRange(props: HoursRangeProps) {
	const { dateTime, type } = props;
	const { start, end } = dateTime.time;
	const timeOptions = getScheduleTimeOptions();
	return <span>
		{(start >= 0 && type === 'event') && `${timeOptions[start].time}-`}
		{start >= 0 && timeOptions[end].time}
	</span>

}

function ScheduleTime(props: HoursRangeProps) {
	const { dateTime } = props;
	const dateValues = stringifiedDateToObj(dateTime.date);
	const shortDate = getShortDate(dayjsObj(dateValues));
	return <>
		<div>{shortDate}</div>
		<HoursRange {...props} />
	</>
}

export function ScheduleView(props: ScheduleViewProps) {
	const { scheduleProps, setIsScheduleViewVisible } = props;
	const { calendarId, description, title, type, ...rest } = scheduleProps;
	const {
		calendarList,
		setSelectedSchedule,
		dispatchSchedules,
		setIsScheduleDialogVisible,
	} = useContext(GlobalContext) as GlobalContextInterface;
	const [alertRef, isAlertVisible, setIsAlertVisible] = useComponentVisible(false);

	const associatedCalendar = calendarList.find(cal => cal.id === calendarId);

	useEffect(() => {
		// set the received schedule props as a selected schedule
		setSelectedSchedule((sch: ScheduleTypes | null | undefined) => {
			return sch === null ? scheduleProps : { ...sch, ...scheduleProps };
		});
		// selected schedule becomes null after the component unmounts
		return () => setSelectedSchedule(null);
	}, []);

	const editSchedule = () => {
		setIsScheduleViewVisible(visible => !visible);
		setIsScheduleDialogVisible(visible => !visible);
	}

	const toggleTaskCompletion = () => {
		if ('completed' in rest) {
			dispatchSchedules({
				type: UserActionType.EDIT,
				payload: {
					...scheduleProps,
					completed: !rest.completed,
				},
			})
		}
	}

	const deleteSchedule = () => {
		dispatchSchedules({
			type: UserActionType.REMOVE,
			payload: scheduleProps.id,
		})
		setIsScheduleViewVisible(visible => !visible);
	}

	return (<>
		<div className='calendar-schedule__view'>
			<div className='schedule-view-block'>
				<div className='schedule-input-list'>
					<span>
						<div style={{
							borderRadius: '3px',
							backgroundColor: associatedCalendar?.colorOption.value,
							width: '22px',
							height: '22px',
						}} />
					</span>
					<div>{title || '(No title)'}</div>
				</div>
				<DataItem
					condition={!!('dateTime' in rest && (rest.dateTime.time.start && rest.dateTime.time.end))}
					icon={ClockIcon}
					DataElement={() => (
						<div>
							<ScheduleTime
								dateTime={rest.dateTime}
								type={type}
							/>
						</div>
					)}
				/>
				<DataItem
					condition={!!('location' in rest && rest.location)}
					icon={LocationIcon}
					DataElement={() => (<div>{(rest as EventInterface).location}</div>)}
				/>
				<DataItem
					condition={!!description}
					icon={DescIcon}
					DataElement={() => (<div>{description}</div>)}
				/>
				<DataItem
					condition={!!calendarId}
					icon={CalendarIcon}
					DataElement={() => {
						return <div>{(associatedCalendar as CalendarLabelType).name}</div>
					}}
				/>
				<div className='schedule-view-block'>{
					'completed' in rest
					&& <button onClick={toggleTaskCompletion}>
						{
							`${rest.completed ? 'Not c' : 'C'}ompleted`
						}
					</button>
				}
				</div>
			</div>
			<div className='schedule-btn-list'>
				<button onClick={editSchedule}>
					<img src={EditIcon} />
				</button>
				<button onClick={() => setIsAlertVisible(visible => !visible)}>
					<img src={DeleteIcon} />
				</button>
			</div>
		</div>
		<Alert
			ref={alertRef}
			name={`${truncateString(title, 30)}`}
			action={'delete'}
			type={type}
			handleAction={deleteSchedule}
			handleHideComponent={() => setIsAlertVisible(false)}
			isVisible={isAlertVisible}
		/>
	</>)
}