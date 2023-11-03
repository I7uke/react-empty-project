import React from 'react';
import styles from './testRowStyle.scss';

interface Props {
    readonly children: React.ReactNode;
}

function TestRow(props: Props) {
    return (
        <div className={styles.componentContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(TestRow);