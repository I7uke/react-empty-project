import { Link } from 'react-router-dom';
import styles from './authButton.module.scss';

interface Props {
    readonly text: string;
    readonly eventClickOrLink: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | string;
    readonly isRealLink?: boolean;
    readonly type?: 'primary' | 'secondary';
    readonly isLoading?: boolean;
}

export default function AuthorizationButton(props: Props) {
    if (props.isLoading) {
        let cssClassStatusLoading: string = styles.authorizationButtonPrimaryLoading;
        if (props.type === 'secondary') {
            cssClassStatusLoading = styles.authorizationButtonSecondaryLoading;
        }

        return (
            <span
                className={`${styles.authorizationButton} ${styles.loadingStatus} ${cssClassStatusLoading}`}
            >
                {props.text}
            </span>
        );
    }

    let cssClassButton = styles.authorizationButtonPrimary;
    if (props.type === 'secondary') {
        cssClassButton = styles.authorizationButtonSecondary;
    }

    if (typeof props.eventClickOrLink === 'function') {
        return (
            <button
                className={`${styles.authorizationButton} ${cssClassButton}`}
                onClick={props.eventClickOrLink}
            >
                {props.text}
            </button>
        );
    }

    if (props.isRealLink) {
        return (
            <a
                className={`${styles.authorizationButton} ${cssClassButton}`}
                href={props.eventClickOrLink}
            >
                {props.text}
            </a>
        );
    } else {
        return (
            <Link
                className={`${styles.authorizationButton} ${cssClassButton}`}
                to={props.eventClickOrLink}
            >
                {props.text}
            </Link>
        );
    }
}