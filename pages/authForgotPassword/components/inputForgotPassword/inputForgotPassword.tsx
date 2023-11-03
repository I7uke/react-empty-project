import { AuthInputErrorText } from '../../../../components/authorization/authInputErrorText';
import styles from './inputForgotPassword.module.scss';

type ErrorText = string | undefined;
type InputTextStatus = 'default' | 'success' | 'error';

export interface ComponentInputForgotPasswordProps {
    readonly status?: InputTextStatus;
    readonly errorText?: ErrorText;
    readonly value?: string | undefined;
    readonly eventChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly placeholder?: string | undefined;
    readonly isReadOnly?: boolean;
}

const cssClassStatus: Record<InputTextStatus, string> = {
    default: styles.inputDefault,
    error: styles.inputError,
    success: styles.inputSuccess
};

export default function InputForgotPassword(props: ComponentInputForgotPasswordProps) {

    let cssClass: string = styles.inputDefault;

    if (typeof props.status === 'string') {
        if (cssClassStatus.hasOwnProperty(props.status)) {
            cssClass = cssClassStatus[props.status];
        }
    }

    return (
        <div className={styles.componentContainer}>
            <input
                className={`${cssClass} ${styles.input}`}
                type={'text'}
                placeholder={props.placeholder}
                value={props.value}
                onChange={!!props.isReadOnly ? undefined : props.eventChange}
                readOnly={props.isReadOnly}
            />
            {props.errorText ? <AuthInputErrorText errorText={props.errorText} /> : null}
        </div>
    );
}