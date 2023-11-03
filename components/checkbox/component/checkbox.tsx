import React from 'react';
import styles from './checkboxStyle.scss';
import SvgCheck from './svg_component/checkAnimation.svg';

interface Props {
    readonly eventChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    readonly isChecked?: boolean | undefined;
    /**
     * Если передать класс, размеры Checkbox будут сброшены, поэтому новый класс должен содержать width и height
     */
    readonly className?: string | undefined;
}

function Checkbox(props: Props) {
    const cssClass: string = props.className ? `${props.className} ${styles.label}` : `${styles.checkboxSize} ${styles.label}`;

    return (
        <label className={cssClass}>
            <input
                checked={props.isChecked}
                onChange={props.eventChange}
                className={styles.input}
                type={'checkbox'}
            />
            <span className={styles.box} />
            <SvgCheck className={styles.svg} />
        </label>
    );
}

export default React.memo(Checkbox);