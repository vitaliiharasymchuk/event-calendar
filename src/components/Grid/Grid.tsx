import React from "react";
import { Moment } from "moment";
import Cell from "./Cell/Cell";
import { getEventsForDay, getMonthDays } from "../../utils/functions";
import { IEvent } from "../../utils/types";
import style from "./Grid.module.scss";

interface IProps {
    selectedMoment: Moment;
    events: IEvent[];
    handleEditEvent: (editedEvent: IEvent) => void;
    handleRemoveEvent: (id: string) => void;
}

const countOfCells: number = 35;

const Grid = ({ selectedMoment, events, handleEditEvent, handleRemoveEvent }: IProps) => {
    const currentMonthDays: Moment[] = getMonthDays(selectedMoment.clone());
    const previousMonthDays: Moment[] = getMonthDays(selectedMoment.clone().subtract(1, "M"));
    const countOfPreviousMonthDayToShow: number = countOfCells - currentMonthDays.length;
    const previousMonthDaysToShow: Moment[] = previousMonthDays.slice(-countOfPreviousMonthDayToShow);
    const allDaysToShow: Moment[] = [...previousMonthDaysToShow, ...currentMonthDays];

    return (
        <div className={style.container}>
            {allDaysToShow.map(day => <Cell key={day.toString()} dayMoment={day} events={getEventsForDay(day, events)}
                                            handleEditEvent={handleEditEvent}
                                            handleRemoveEvent={handleRemoveEvent} />)}
        </div>
    );
};

export default Grid;