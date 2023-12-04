import React from "react";
import styles from './styles.module.scss';
import { ErrorText } from "../../errorText";

type ErrorText = string | undefined;
type InputTextStatus = 'default'
    | 'disabled'
    | 'success'
    | 'error';

export interface ComponentInputTextareaProps {
    status?: InputTextStatus;
    errorText?: ErrorText;
    value?: string | undefined;
    eventChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string | undefined;
    isReadOnly?: boolean;
    isAutoFocus?: boolean | undefined;
}

function getCssClass(status: ComponentInputTextareaProps['status']): string {
    if (status === 'disabled') {
        return styles.inputDisabled;
    }

    if (status === 'error') {
        return styles.inputError;
    }

    if (status === 'success') {
        return styles.inputSuccess;
    }

    return styles.inputDefault;
}

function InputTextarea(props: Readonly<ComponentInputTextareaProps>) {
    const cssClass: string = getCssClass(props.status);

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
            {props.errorText ? <ErrorText errorText={props.errorText} /> : null}
        </div>
    );
}

export default React.memo(InputTextarea);