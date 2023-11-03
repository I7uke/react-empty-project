import styles from './authButton.module.scss';

interface Props {
    readonly children: React.ReactNode;
}

export default function AuthorizationButtonsContainer(props: Props) {
    return (
        <div className={styles.buttonsContainer}>
            {props.children}
        </div>
    );
}