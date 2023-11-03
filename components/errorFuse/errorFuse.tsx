import React from "react";
import styles from './errorFuseStyle.scss';

const TEXT_ERROR: string = 'Ой, кажется что-то пошло не так...';

interface ErrorFuseProps {
    readonly errorText?: string;
}

/**
 * Компонент будет показан, когда в предохранителе сработает ошибка.
 *  ВАЖНО, данный компонент должен использоваться только в предохранителе !
 */
function ErrorFuse(props: ErrorFuseProps) {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.errorImg} />
            <div className={styles.oopsTextContainer}>{TEXT_ERROR}</div>
            {
                props.errorText ? <div className={styles.errorTextContainer}>{props.errorText}</div> : null
            }
        </div>
    );
}

export default React.memo(ErrorFuse);
