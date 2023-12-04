import React from "react";
import styles from './style.module.scss';

interface Props {
    readonly errorText: string;
}

function ErrorText(props:Props){
    return(
        <div className={styles.errorTextContainer}>{props.errorText}</div>
    );
}

export default React.memo(ErrorText);