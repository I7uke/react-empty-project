import React from "react";
import styles from './testBlockStyle.scss';

interface Props {
    readonly children: React.ReactNode;
    readonly label: string;
}

function TestBlock(props: Props){
    return (
        <div className={styles.componentContainer}>
            <div className={styles.label}>
                {props.label}
            </div>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );

}

export default React.memo(TestBlock);