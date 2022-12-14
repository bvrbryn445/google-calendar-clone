import { useContext } from 'react';
import GlobalContext from '../../../context/global/GlobalContext';
import GlobalContextInterface, {
	ScheduleNames,
} from '../../../context/global/index.model';

interface ScheduleTypeSelectorProps {
	scheduleType: ScheduleNames | null | undefined;
}
export default function ScheduleTypeSelector(props: ScheduleTypeSelectorProps) {
	const { scheduleType } = props;
	const {
		selectedScheduleType,
		setSelectedScheduleType,
	} = useContext(GlobalContext) as GlobalContextInterface;

	const scheduleTypeClassName = (buttonName: ScheduleNames) => {
		return `schedule-type${buttonName === (scheduleType || selectedScheduleType)
			? '--active' : ''}`;
	}

	return (
		<div className='schedule-type-selector'>
			<button
				className={scheduleTypeClassName('event')}
				onClick={() => setSelectedScheduleType('event')}
			>Event</button>
			<button
				className={scheduleTypeClassName('task')}
				onClick={() => setSelectedScheduleType('task')}
			>Task</button>
		</div>
	)
}