import { Link } from 'react-router-dom';
import styles from './authForgotPassword.module.scss';
import React from 'react';

interface Props {
    readonly linkPageForgotPassword: string;
    readonly text: string;
}

function AuthForgotPassword(props: Props) {
    return (
        <div className={styles.forgotPasswordContainer}>
            <Link
                className={styles.link}
                to={props.linkPageForgotPassword}
            >
                {props.text}
            </Link>
        </div>
    );
}

export default React.memo(AuthForgotPassword);