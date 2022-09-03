import React from 'react';

import { useContext } from 'react';
import { DialogProps } from '../../lib/Dialog/index.model';

import Dialog from '../../lib/Dialog/index';
import GlobalContext from '../../context/global/GlobalContext';
import GlobalContextInterface from '../../context/global/index.model';
import ScheduleDialog from './Dialog';

// It controls the visibility of the schedule dialog
export default function DialogController() {
	const {
		scheduleDialogRef,
		isScheduleDialogVisible,
		setIsScheduleDialogVisible,
	} = useContext(GlobalContext) as GlobalContextInterface;

	const scheduleTypeProps = {
		componentProps: {
			setIsScheduleDialogVisible,
		},
	};

	const scheduleDialogProps: DialogProps = Object.assign({
		Component: ScheduleDialog,
		isSelfAdjustable: true,
		isDialogVisible: isScheduleDialogVisible,
		setIsDialogVisible: setIsScheduleDialogVisible,
		hasInitTransition: true,
	}, scheduleTypeProps);

	return <Dialog ref={scheduleDialogRef} {...scheduleDialogProps} />
}