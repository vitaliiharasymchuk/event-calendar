import React from "react";
import moment, { Moment } from "moment";
import classnames from "classnames";
import EventItem from "./EventItem/EventItem";
import { IEvent } from "../../../utils/types";
import style from "./Cell.module.scss";

interface IProps {
    dayMoment: Moment;
    events: IEvent[];
    handleEditEvent: (editedEvent: IEvent) => void;
    handleRemoveEvent: (id: string) => void;
}

const Cell = ({ dayMoment, events, handleEditEvent, handleRemoveEvent }: IProps) => {
    const isToday: boolean = moment().isSame(dayMoment, "day");

    return (
        <div className={classnames(style.container, isToday && style.today)}>
            <div className={style.header}>
                <div>{dayMoment.format("D")}</div>
                <div>{dayMoment.format("dd")}</div>
            </div>
            <div className={style.eventsList}>
                {events.map(event => <EventItem key={event.createdAt.toString()} event={event}
                                                handleEditEvent={handleEditEvent}
                                                handleRemoveEvent={handleRemoveEvent} />)}
            </div>
        </div>
    );
};

export default Cell;