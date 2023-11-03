import 'react-datepicker/dist/react-datepicker.min.css';
import styles from './inputDateStyle.scss';

import DatePicker from "react-datepicker";
import ru from "date-fns/esm/locale/ru";
import InputMask from 'react-input-mask';
import { ErrorTextInput } from "../../errorTextInput";

type InputDateStatus = 'default' | 'disabled' | 'success' | 'error';

export interface ComponentInputDateProps {
    readonly isClearable?: boolean | undefined;
    readonly selectedDate?: Date | null | undefined;
    readonly eventChangeDate: (date: Date | null) => void;
    readonly isShouldCloseOnSelect?: boolean | undefined;
    readonly isShowWeekNumbers?: boolean | undefined;
    readonly isReadOnly?: boolean | undefined;
    readonly minDate?: Date | null | undefined;
    readonly maxDate?: Date | null | undefined;
    readonly status?: InputDateStatus;
    readonly errorText?: string | undefined;
    readonly placeholder?: string | undefined;
}

const cssClassStatus: Record<InputDateStatus, string> = {
    default: styles.inputDefault,
    disabled: styles.inputDisabled,
    error: styles.inputError,
    success: styles.inputSuccess
};

function TodayButton() {
    return (
        <span
            title={'Перейти на текущий день'}
            className={styles.buttonToday}>
            {'Сегодня'}
        </span>
    );
}

export default function InputDate(props: ComponentInputDateProps) {
    let cssClass: string = styles.inputDefault;

    if (typeof props.status === 'string') {
        if (cssClassStatus.hasOwnProperty(props.status)) {
            cssClass = cssClassStatus[props.status];
        }
    }
    const isCantEdit: boolean = props.status === 'disabled' || !!props.isReadOnly;

    return (
        <div>
            <DatePicker
                className={`${cssClass} ${styles.input}`}
                clearButtonClassName={styles.buttonClearSelectedDate}
                isClearable={isCantEdit ? false : props.isClearable}
                dateFormat={'dd.MM.yyyy'}
                locale={ru}
                selected={props.selectedDate}
                onChange={props.eventChangeDate}
                shouldCloseOnSelect={props.isShouldCloseOnSelect}
                disabled={props.status === 'disabled' || undefined}
                showWeekNumbers={props.isShowWeekNumbers}
                fixedHeight={true}
                readOnly={props.isReadOnly}
                closeOnScroll={true}
                minDate={props.minDate}
                maxDate={props.maxDate}
                placeholderText={props.placeholder || 'дд.мм.гггг'}
                todayButton={<TodayButton />}
                customInput={<InputMask mask={'99.99.9999'} />}
            />
            {props.errorText ? <ErrorTextInput errorText={props.errorText} /> : null}
        </div>
    );
}