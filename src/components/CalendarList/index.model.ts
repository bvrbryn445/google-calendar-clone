import { Dispatch, SetStateAction } from 'react';
import { 
	CalendarLabelType, 
	CalendarListActionTypes, 
} from '../../context/global/index.model';
import { ColorOption } from '../../docs/data';
import { DialogViewState } from '../../lib/Dialog/index.model';

interface CalendarListSetStateAction {
	calendarList: Array<CalendarLabelType> | [];
	dispatchCalendarList: Dispatch<CalendarListActionTypes>;
}

export interface LabelListProps extends CalendarListSetStateAction {
recordPos: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface AddNewCalendarProps extends LabelListProps {
	setShowAddLblBtn: Dispatch<SetStateAction<boolean>>;
}

export type InitCalendarLblProps = Omit<CalendarLabelType, 'id'>;
export type LblColorChange = (colorOption: ColorOption) => void;

export interface EventHandlers {
	setNewCalendar?: Dispatch<SetStateAction<InitCalendarLblProps>>;
	handleColorChange?: LblColorChange;
}

export interface LabelProps {
	calendarProps: CalendarLabelType;
	globalContextProps: CalendarListSetStateAction;
}

export interface WrappedComponentProps extends
	LabelProps, DialogViewState {
	eventHandlers?: EventHandlers;
	flags: Record<string, boolean>;
}