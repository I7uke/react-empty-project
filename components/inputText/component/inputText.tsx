import React from "react";
import { ErrorTextInput } from "../../errorTextInput";
import styles from './inputTextStyle.scss';

type ErrorText = string | undefined;

type InputTextStatus = 'default'
    | 'disabled'
    | 'success'
    | 'error';

export interface ComponentInputTextProps {
    readonly status?: InputTextStatus;
    readonly errorText?: ErrorText;
    readonly value?: string | undefined;
    readonly eventChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

function InputText(props: ComponentInputTextProps) {
    let cssClass: string = styles.inputDefault;

    if (typeof props.status === 'string') {
        if (cssClassStatus.hasOwnProperty(props.status)) {
            cssClass = cssClassStatus[props.status];
        }
    }

    return (
        <div>
            <input
                className={`${cssClass} ${styles.input}`}
                type={'text'}
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

export default React.memo(InputText);

