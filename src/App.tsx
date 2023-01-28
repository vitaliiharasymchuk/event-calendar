import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { useLocalStorage } from "./hooks/hooks";
import CreateEventButton from "./components/CreateEventButton/CreateEventButton";
import MonthFilter from "./components/MonthFilter/MonthFilter";
import Grid from "./components/Grid/Grid";
import ModalWrapper from "./components/ModalWrapper/ModalWrapper";
import Form from "./components/Form/Form";
import { IEvent } from "./utils/types";
import style from "./App.module.scss";

const App = () => {
    const { getData, setData } = useLocalStorage();
    const [selectedMoment, setSelectedMoment] = useState<Moment>(moment(getData("filter") || undefined));
    const [events, setEvents] = useState<IEvent[]>(JSON.parse(getData("events") || "[]"));
    const [isAddEventFormOpen, setIsAddEventFormOpen] = useState<boolean>(false);

    useEffect(() => {
        setData("filter", selectedMoment.toISOString());
    }, [selectedMoment]);

    useEffect(() => {
        setData("events", JSON.stringify(events));
    }, [events]);

    const handleOpenAddEventForm = () => {
        setIsAddEventFormOpen(true);
    };

    const handleCloseAddEventForm = () => {
        setIsAddEventFormOpen(false);
    };

    const handleAddEvent = (newEvent: IEvent) => {
        setEvents(prevState => [...prevState, newEvent]);
    };

    const handleEditEvent = (editedEvent: IEvent) => {
        setEvents(prevState => prevState.map(el => el.id === editedEvent.id ? { ...editedEvent } : el));
    };

    const handleRemoveEvent = (id: string) => {
        setEvents(prevState => prevState.filter(el => el.id !== id));
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <CreateEventButton onClick={handleOpenAddEventForm} />
                <MonthFilter selectedMoment={selectedMoment} setSelectedMoment={setSelectedMoment} />
            </div>
            <Grid selectedMoment={selectedMoment} events={events}
                  handleEditEvent={handleEditEvent}
                  handleRemoveEvent={handleRemoveEvent} />
            {isAddEventFormOpen && <ModalWrapper onClick={handleCloseAddEventForm}>
                <Form isEdit={false} onConfirm={handleAddEvent} onClose={handleCloseAddEventForm} />
            </ModalWrapper>}
        </div>
    );
};

export default App;
