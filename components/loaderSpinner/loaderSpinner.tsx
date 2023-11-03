import React from "react";
import styles from './loaderSpinnerStyle.scss';

interface Props {
    readonly loaderText?: string;
}

/**
 * Загрузка
 * @param props 
 * @returns 
 */
function LoaderSpinner(props: Props) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.loaderSpinner} />
            {
                props.loaderText ?
                    <div className={styles.ladingText}>{props.loaderText}</div>
                    : null
            }
        </div>
    );
}

export default React.memo(LoaderSpinner);
