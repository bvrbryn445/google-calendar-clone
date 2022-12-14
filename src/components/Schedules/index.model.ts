import { Dispatch, SetStateAction } from 'react';
import {
	EventInterface,
	TaskInterface,
} from '../../context/global/index.model';

export interface ScheduleStates extends EventInterface, TaskInterface { }
export interface ScheduleEventProps {
	eventProps: Omit<EventInterface, 'id' | 'type' | 'title'>;
	setScheduleProps: Dispatch<SetStateAction<ScheduleStates>>;
}

export interface ScheduleTaskProps {
	taskProps: Omit<TaskInterface, 'id' | 'type' | 'title'>;
	setScheduleProps: Dispatch<SetStateAction<ScheduleStates>>;
}

export interface Option {
	label: string;
	value: number;
}