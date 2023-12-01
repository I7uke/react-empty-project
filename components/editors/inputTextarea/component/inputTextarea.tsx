import React from "react";
import { ErrorTextInput } from "../../errorTextInput";
import styles from './inputTextareaStyle.scss';

type ErrorText = string | undefined;
type InputTextStatus = 'default'
    | 'disabled'
    | 'success'
    | 'error';

export interface ComponentInputTextareaProps {
    readonly status?: InputTextStatus;
    readonly errorText?: ErrorText;
    readonly value?: string | undefined;
    readonly eventChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly placeholder?: string | undefined;
    readonly isReadOnly?: boolean;
    readonly isAutoFocus?: boolean | undefined;
}

const cssClassStatus: Record<InputTextStatus, string> = {
    default: styles.inputDefault,
    disabled: styles.inputDisabled,
    error: styles.inputError,
    success: styles.inputSuccess
};

function InputTextarea(props: ComponentInputTextareaProps) {

    let cssClass: string = styles.inputDefault;

    if (typeof props.status === 'string') {
        if (cssClassStatus.hasOwnProperty(props.status)) {
            cssClass = cssClassStatus[props.status];
        }
    }

    return (
        <div>
            <textarea
                className={`${cssClass} ${styles.textarea}`}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(props.status === 'disabled' || !!props.isReadOnly) ? undefined : props.eventChange}
                disabled={props.status === 'disabled' || undefined}
                readOnly={props.isReadOnly}
                autoFocus={props.isAutoFocus}
            />
            {props.errorText ? <ErrorTextInput errorText={props.errorText} /> : null}
        </div>
    );
}

export default React.memo(InputTextarea);