import React, { useState } from "react";
import ModalWrapper from "../../../ModalWrapper/ModalWrapper";
import Form from "../../../Form/Form";
import { IEvent } from "../../../../utils/types";
import style from "./EventItem.module.scss";

interface IProps {
    event: IEvent;
    handleEditEvent: (editedEvent: IEvent) => void;
    handleRemoveEvent: (id: string) => void;
}

const EventItem = ({ event, handleEditEvent, handleRemoveEvent }: IProps) => {
    const [isEditEventFormOpen, setIsEditEventFormOpen] = useState<boolean>(false);

    const handleOpenEditEventForm = () => {
        setIsEditEventFormOpen(true);
    };

    const handleCloseEditEventForm = () => {
        setIsEditEventFormOpen(false);
    };

    return (
        <>
            <div className={style.container} onClick={handleOpenEditEventForm}>
                {event.title}
            </div>
            {isEditEventFormOpen && <ModalWrapper onClick={handleCloseEditEventForm}>
                <Form isEdit={true} currentEvent={event} onConfirm={handleEditEvent}
                      onRemove={handleRemoveEvent}
                      onClose={handleCloseEditEventForm} />
            </ModalWrapper>}
        </>
    );
};

export default EventItem;