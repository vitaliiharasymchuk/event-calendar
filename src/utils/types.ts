import { Moment } from "moment";

export type SetStateType<S> = (arg: S | ((prevState: S) => S)) => void;

export interface IEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string | null;
    createdAt: Moment;
    updatedAt: Moment;
}