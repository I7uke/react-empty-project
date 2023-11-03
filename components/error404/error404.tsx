import React from "react";
import styles from './error404Style.scss';

function Error404(){

    return(
        <div className={styles.error404Text}>
            404
        </div>
    );

}

export default React.memo(Error404);