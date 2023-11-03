import React from 'react';
import styles from './authServerError.module.scss';

interface Props {
    readonly errorText: string;
}

function AuthServerError(props: Props) {
    return (
        <div className={styles.errorTextContainer}>
            {props.errorText}
        </div>
    );
}

export default React.memo(AuthServerError);