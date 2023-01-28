import React from "react";
import style from "./CreateEventButton.module.scss";

interface IProps {
    onClick: () => void;
}

const CreateEventButton = ({ onClick }: IProps) => {
    return (
        <button className={style.container} onClick={onClick}>+</button>
    );
};

export default CreateEventButton;