import React from "react";
import styles from './errorTextInputStyle.scss';

interface Props {
    readonly errorText: string;
}

function ErrorTextInput(props:Props){
    return(
        <div className={styles.errorTextContainer}>{props.errorText}</div>
    );
}

export default React.memo(ErrorTextInput);