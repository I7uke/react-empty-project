import React from "react";
import styles from './loaderSuspenseStyle.scss';

const TEXT_LOADING: string = 'Загрузка...';

/**
 * Очень легкий статус загрузки
 * ВАЖНО: использовать только с Suspense
 * @constructor
 */
function LoaderSuspense() {
    return (<div className={styles.loaderSuspenseContainer}>{TEXT_LOADING}</div>);
}

export default React.memo(LoaderSuspense);