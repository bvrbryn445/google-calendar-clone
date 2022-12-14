import { useContext, useState } from 'react';
import useComponentVisible from '../../hooks/useComponentVisible';
import GlobalContext from '../../context/global/GlobalContext';
import GlobalContextInterface, { UserActionType } from '../../context/global/index.model';
import { LabelProps } from './index.model';

import './styles.scss';
import MenuVertical from '../../assets/icons/menu-vertical.png';
import MultiplyIcon from '../../assets/icons/multiply.png';

import Alert from '../../lib/Alert/Alert';
import { DialogProps } from '../../lib/Dialog/index.model';
import Dialog from '../../lib/Dialog';
import Options from './Options';

export default function Label(props: LabelProps): JSX.Element {
	const { recordPos } = useContext(GlobalContext) as GlobalContextInterface;
	const { calendarProps, globalContextProps } = props;
	const { dispatchCalendarList } = globalContextProps;
	const { id, selected, colorOption, name, removable } = calendarProps;

	const [showOptions, setShowOptions] = useState(false);
	const [
		alertRef,
		isAlertVisible,
		setIsAlertVisible,
		alertLinkRef,
	] = useComponentVisible(false);

	const [
		dialogRef,
		isCalendarLblOptsVisible,
		setIsCalendarLblOptsVisible,
		dialogLinkRef,
	] = useComponentVisible(false);

	const handleToggleCbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		dispatchCalendarList({
			type: UserActionType.EDIT,
			payload: {
				...calendarProps,
				selected: e.target.checked, 
			},
		})
	};

	// remove calendar from the calendar list
	const removeCalendar = () => {
		dispatchCalendarList({ type: UserActionType.REMOVE, payload: id });
		setIsAlertVisible(false);
	};

	// props to be passed on the wrapped component
	const calendarLblOptsProps: DialogProps = {
		componentProps: {
			flags: { options: true, colors: true },
			...props,
		},
		Component: Options,
		delta: { x: 20, y: 0 },
		isSelfAdjustable: true,
		isDialogVisible: isCalendarLblOptsVisible,
		hasInitTransition: true,
		setIsDialogVisible: setIsCalendarLblOptsVisible,
		stylePosition: 'fixed',
	}

	return (
		<>
			<li
				className='row middle-xs start-xs'
				// display label options when hovered
				onMouseOver={() => setShowOptions(true)}
				onMouseOut={() => setShowOptions(false)}
				style={{ position: 'relative' }}
			>
				<span>
					<input
						type='checkbox'
						style={{ accentColor: colorOption.value }}
						checked={selected}
						onChange={handleToggleCbox}
					/>
				</span>
				<div className='calendar-label'>
					<span>{name}</span>
				</div>
				{
					showOptions ?
						<span className='calendar-options row end-xs align-stretch'>
							{
								removable
									? <button
										ref={alertLinkRef}
										onClick={() => setIsAlertVisible(true)}
										className='clear-btn--no-effects'
									>
										<img className='icon--small' src={MultiplyIcon} />
									</button>
									: null
							}
							<button
								ref={dialogLinkRef}
								onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
									recordPos(e);
									setIsCalendarLblOptsVisible(visible => !visible);
								}}
								className='clear-btn--no-effects'
							>
								<img className='icon--small' src={MenuVertical} />
							</button>
						</span> : <span />
				}
				<Dialog ref={dialogRef} {...calendarLblOptsProps} />
			</li>
			{
				<Alert
					ref={alertRef}
					name={`${name}'s `}
					action='remove'
					type='Calendar'
					handleAction={removeCalendar}
					handleHideComponent={() => setIsAlertVisible(false)}
					isVisible={isAlertVisible}
				/>
			}
		</>
	)
}