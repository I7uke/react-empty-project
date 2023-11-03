import styles from './authPanel.module.scss';

interface Props {
    readonly children: React.ReactNode;
}

export default function AuthPanel(props: Props) {
    return (
        <div className={styles.authPanel}>
            <div>
                {props.children}
            </div>
        </div>
    );
}