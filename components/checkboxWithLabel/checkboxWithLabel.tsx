import React from "react";
import styles from './checkboxWithLabelStyle.scss';
import { Checkbox } from "../checkbox";

interface Props {
    readonly eventChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    readonly isChecked?: boolean | undefined;
    readonly label: string;
}

function CheckboxWithLabel(props: Props) {
    return (
        <div className={styles.componentContainer}>
            <Checkbox
                eventChange={props.eventChange}
                isChecked={props.isChecked}
            />
            <span className={styles.label}>{props.label}</span>
        </div>
    );
}

export default React.memo(CheckboxWithLabel);