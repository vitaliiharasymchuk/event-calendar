import React from "react";
import moment, { Moment } from "moment";
import { SetStateType } from "../../utils/types";
import style from "./MonthFilter.module.scss";

interface IProps {
    selectedMoment: Moment;
    setSelectedMoment: SetStateType<Moment>;
}

const MonthFilter = ({ selectedMoment, setSelectedMoment }: IProps) => {
    const handlePrevButtonClick = () => {
        setSelectedMoment(prevState => moment(prevState).subtract(1, "M"));
    };

    const handleNextButtonClick = () => {
        setSelectedMoment(prevState => moment(prevState).add(1, "M"));
    };

    const handledMonthAndYearPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMoment(moment(e.target.value || undefined));
    };

    return (
        <div className={style.container}>
            <div className={style.monthPickerButtons}>
                <button onClick={handlePrevButtonClick}>{"<"}</button>
                <div>{moment(selectedMoment).format("MMMM YYYY")}</div>
                <button onClick={handleNextButtonClick}>{">"}</button>
            </div>
            <input type="month" id="month-and-year-picker" required value={selectedMoment.format("yyyy-MM")}
                   onChange={handledMonthAndYearPicker} />
        </div>
    );
};

export default MonthFilter;