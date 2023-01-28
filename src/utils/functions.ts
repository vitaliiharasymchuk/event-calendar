import moment, { Moment } from "moment";
import { IEvent } from "./types";

export const getMonthDays = (selectedMoment: Moment) => {
    const daysInMonth = moment(selectedMoment).daysInMonth();
    const days: Moment[] = [];
    for (let i = 0; i < daysInMonth; i++) {
        days.push(moment(selectedMoment).startOf("month").add(i, "d"));
    }
    return days;
};

export const getEventsForDay = (day: Moment, events: IEvent[]) => {
    return events.filter(el => moment(day).isSame(el.date, "day"));
};