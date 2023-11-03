import React from 'react';
import styles from './todayButtonStyle.scss';

function TodayButton(){
    return (
        <span
            title={'Перейти на текущий день'}
            className={styles.buttonToday}>
            {'Сегодня'}
        </span>
    );
}

export default React.memo(TodayButton);