import React from "react";
import { ErrorText } from "../../errorText";
import styles from './styles.module.scss';

type ErrorText = string | undefined;
type InputTextStatus = 'default'
    | 'disabled'
    | 'success'
    | 'error';

export interface ComponentInputTextProps {
    status?: InputTextStatus;
    errorText?: ErrorText;
    value?: string | undefined;
    eventChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string | undefined;
    isReadOnly?: boolean;
}

function getCssClass(status: ComponentInputTextProps['status']): string {
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

function InputText(props: Readonly<ComponentInputTextProps>) {
    const cssClass: string = getCssClass(props.status);

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
            />
            {props.errorText ? <ErrorText errorText={props.errorText} /> : null}
        </div>
    );
}

export default React.memo(InputText);

