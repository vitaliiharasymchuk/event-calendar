import React from "react";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 } from "uuid";
import classnames from "classnames";
import TrashIcon from "../../assets/icons/TrashIcon";
import { IEvent } from "../../utils/types";
import style from "./Form.module.scss";

interface IProps {
    isEdit: boolean;
    currentEvent?: IEvent;
    onConfirm: (newEvent: IEvent) => void;
    onRemove?: (id: string) => void;
    onClose: () => void;
}

interface IFormData {
    title: "",
    description: "",
    date: string,
    time: string | null
}

const initialFormDate: IFormData = {
    title: "",
    description: "",
    date: moment().format("YYYY-MM-DD"),
    time: null
};

const Form = ({ isEdit, currentEvent, onConfirm, onRemove, onClose }: IProps) => {
        const formik = useFormik({
            initialValues: (isEdit && currentEvent) ? ({
                title: currentEvent.title,
                description: currentEvent.description,
                date: currentEvent.date,
                time: currentEvent.time
            }) : ({
                ...initialFormDate
            }),
            validationSchema: Yup.object({
                title: Yup.string().required(),
                date: Yup.string().required()
            }),
            onSubmit: (values) => {
                const { title, description, date, time } = values;
                const nowMoment = moment();
                onConfirm({
                    id: (isEdit && currentEvent) ? currentEvent.id : v4(),
                    title,
                    description,
                    date,
                    time,
                    createdAt: (isEdit && currentEvent) ? currentEvent.createdAt : nowMoment,
                    updatedAt: nowMoment
                });
                onClose();
            }
        });

        const containerClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        };

        const handleRemoveButtonClick = () => {
            if (isEdit && onRemove && currentEvent) {
                onRemove(currentEvent?.id);
                onClose();
            }
        };

        return (
            <div className={style.container} onClick={containerClick}>
                <button className={style.closeButton} onClick={onClose}>+</button>
                <header>
                    <h2>{isEdit ? "Edit" : "Add new"} event</h2>
                    {(isEdit && currentEvent) &&
                        (moment(currentEvent.createdAt).isSame(currentEvent.updatedAt) ?
                            (<p>Created at: {moment(currentEvent.createdAt).format("DD.MM.YYYY HH:mm")}</p>) :
                            (<p>Updated at: {moment(currentEvent.updatedAt).format("DD.MM.YYYY HH:mm")}</p>))
                    }
                </header>
                <div className={style.textInputWrapper}>
                    <p>Title *</p>
                    <input id="title" placeholder="Title goes here"
                           className={classnames(formik.touched.title && formik.errors.title && style.error)}
                           value={formik.values.title}
                           onChange={formik.handleChange} />
                </div>
                <div className={style.textInputWrapper}>
                    <p>Description</p>
                    <textarea id="description" placeholder="Description goes here" rows={4}
                              value={formik.values.description}
                              onChange={formik.handleChange} />
                </div>
                <div className={style.dateAndTimeInputs}>
                    <div>
                        <p>Date</p>
                        <input id="date" type="date" required
                               className={classnames(formik.touched.date && formik.errors.date && style.error)}
                               value={formik.values.date} onChange={formik.handleChange} />
                    </div>
                    <div>
                        <p>Begin time</p>
                        <input id="time" type="time" value={formik.values.time || ""}
                               onChange={formik.handleChange} />
                    </div>
                </div>
                <div className={style.bottomButtons}>
                    {isEdit && <button className={style.removeButton} onClick={handleRemoveButtonClick}><TrashIcon
                        classNames={style.trashIcon} /></button>}
                    <button type="submit"
                            className={style.saveButton}
                            onClick={() => formik.handleSubmit()}>
                        Save
                    </button>
                </div>
            </div>
        );
    }
;

export default Form;