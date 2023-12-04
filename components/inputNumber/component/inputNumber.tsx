import React, { useRef, useState } from "react";
import RcInputNumber from 'rc-input-number';
import styles from './inputNumberStyle.scss';
import SvgIcoChevronUp from '../../../img/svg_ico/chevronUp.svg';
import SvgIcoChevronDown from '../../../img/svg_ico/chevronDown.svg';
import { ErrorText } from "../../editors/errorText";

type ErrorText = string | undefined;
type InputNumberStatus = 'default'
    | 'disabled'
    | 'error';

export interface ComponentInputNumberProps {
    /**
     * Текущее значение
     */
    readonly value?: number | undefined | null;
    /**
     * Минимальное значение
     */
    readonly min?: number;
    /**
     * Максимальное значение
     */
    readonly max?: number;
    /**
     * Событие изменить данные
     */
    readonly eventChange?: (value: number | null | undefined) => void;
    /**
     * Текст ошибки
     */
    readonly errorText?: ErrorText;
    /**
     * Текст-заполнитель 
     */
    readonly placeholder?: string;
    /**
     * Точность
     */
    readonly precision?: number | undefined;
    /**
     * Режим только чтение
     */
    readonly isReadOnly?: boolean | undefined
    /**
     * Статус
     */
    readonly status?: InputNumberStatus;
    /**
     * Шаг изменения при использовании кнопок
     */
    readonly step?: number | undefined;
    /**
     * Ширина input
     */
    readonly width?: number | undefined;
}

const cssClassStatus: Record<InputNumberStatus, string> = {
    default: styles.inputDefault,
    disabled: styles.inputDisabled,
    error: styles.inputError,
};

const upHandler = <span className={`${styles.buttonHandler} ${styles.buttonHandlerPlus}`}><SvgIcoChevronUp /></span>;
const downHandler = <span className={`${styles.buttonHandler} ${styles.buttonHandlerMinus}`}><SvgIcoChevronDown /></span>;

function InputNumber(props: ComponentInputNumberProps) {
    let cssClass: string = styles.inputDefault;

    if (typeof props.status === 'string') {
        if (cssClassStatus.hasOwnProperty(props.status)) {
            cssClass = cssClassStatus[props.status];
        }
    }

    const isCantEdit: boolean = props.status === 'disabled' || !!props.isReadOnly;

    return (
        <div>
            <RcInputNumber
                style={{ width: props.width }}
                className={`${cssClass} ${styles.input} ${isCantEdit ? styles.inputReadOnlyMode : styles.inputEditMode}`}
                value={props.value}
                onChange={isCantEdit ? undefined : props.eventChange}
                decimalSeparator={','}
                min={props.min}
                max={props.max}
                placeholder={props.placeholder}
                precision={props.precision}
                readOnly={props.isReadOnly}
                disabled={props.status ==='disabled' || undefined}
                upHandler={isCantEdit ? undefined : upHandler}
                downHandler={isCantEdit ? undefined : downHandler}
                step={props.step}
            />
            {props.errorText ? <ErrorText errorText={props.errorText} /> : null}
        </div>
    );
}

export default React.memo(InputNumber);