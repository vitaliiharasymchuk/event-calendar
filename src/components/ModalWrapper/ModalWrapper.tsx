import React from "react";
import style from "./ModalWrapper.module.scss";

interface IProps {
    children: React.ReactNode;
    onClick: () => void;
}

const ModalWrapper = ({ children, onClick }: IProps) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClick();
    };

    return (
        <div className={style.container} onClick={handleClick}>
            {children}
        </div>
    );
};

export default ModalWrapper;