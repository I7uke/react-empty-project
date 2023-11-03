import React from 'react';
import styles from './authTitle.module.scss';

interface Props {
    readonly title: string;
}

function AuthTitle(props: Props) {
    return (
        <div className={styles.authorizationTitle}>
            {props.title}
        </div>
    );
}

export default React.memo(AuthTitle);