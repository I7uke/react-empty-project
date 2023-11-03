import styles from './authInputErrorText.module.scss';

interface Props {
    readonly errorText: string;
}

export default function AuthInputErrorText(props: Props){
    return(
        <div className={styles.errorTextContainer}>{props.errorText}</div>
    );
}