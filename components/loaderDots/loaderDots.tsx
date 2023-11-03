import React from "react";
import styles from './loaderDotsStyle.scss';

function LoaderDots(){
    return(
        <div className={styles.spinnerBox}>
            <div className={styles.pulseContainer}>
                <div className={`${styles.pulseBubble} ${styles.pulseBubble1}`}/>
                <div className={`${styles.pulseBubble} ${styles.pulseBubble2}`}/>
                <div className={`${styles.pulseBubble} ${styles.pulseBubble3}`}/>
            </div>
        </div>
    );
}

export default React.memo(LoaderDots);
