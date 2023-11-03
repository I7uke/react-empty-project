import React from "react";
import styles from './forgotPasswordHelpText.module.scss';

interface Props {
    readonly helpText: string;
}

function ForgotPasswordHelpText(props: Props) {
    return (
        <div className={styles.forgotPasswordHelpText}>
            {props.helpText}
        </div>
    );
}

export default React.memo(ForgotPasswordHelpText);