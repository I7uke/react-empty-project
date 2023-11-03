import 'react-datepicker/dist/react-datepicker.min.css';
import styles from './inputDateRangeStyle.scss';
import DatePicker from "react-datepicker";
import ru from "date-fns/esm/locale/ru";
import InputMask from 'react-input-mask';
import { ErrorTextInput } from '../../../errorTextInput';
import TodayButton from '../todayButton/todayButton';

type InputDateStatus = 'default' | 'disabled' | 'success' | 'error';

export interface ComponentInputDateRangeProps {
    readonly isClearable?: boolean | undefined;
    readonly eventChangeStartDate: (date: Date | null) => void;
    readonly eventChangeEndtDate: (date: Date | null) => void;
    readonly isShouldCloseOnSelect?: boolean | undefined;
    readonly isShowWeekNumbers?: boolean | undefined;
    readonly isReadOnly?: boolean | undefined;
    readonly status?: InputDateStatus;
    readonly errorText?: string | undefined;
    readonly startDate?: Date | null | undefined;
    readonly endDate?: Date | null | undefined;
}

const cssClassStatus: Record<InputDateStatus, string> = {
    default: styles.inputDefault,
    disabled: styles.inputDisabled,
    error: styles.inputError,
    success: styles.inputSuccess
};

export default function InputDateRange(props: ComponentInputDateRangeProps) {
    let cssClass: string = styles.inputDefault;

    if (typeof props.status === 'string') {
        if (cssClassStatus.hasOwnProperty(props.status)) {
            cssClass = cssClassStatus[props.status];
        }
    }

    return (
        <div>
            <div className={`${cssClass} ${styles.input}`}>
                <DatePicker
                    fixedHeight={true}
                    closeOnScroll={true}
                    isClearable={false}
                    selectsStart={true}
                    monthsShown={2}
                    className={styles.datePicker}
                    dateFormat={'dd.MM.yyyy'}
                    locale={ru}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    onChange={props.eventChangeStartDate}
                    shouldCloseOnSelect={props.isShouldCloseOnSelect}
                    disabled={props.status === 'disabled' || undefined}
                    showWeekNumbers={props.isShowWeekNumbers}
                    readOnly={props.isReadOnly}
                    placeholderText={'дд.мм.гггг'}
                    todayButton={<TodayButton />}
                    maxDate={props.endDate}
                    //customInput={<InputMask mask={'99.99.9999'} />}
                    selected={props.startDate}
                />
                <span className={styles.separator}>{` - `}</span>
                <DatePicker
                    fixedHeight={true}
                    closeOnScroll={true}
                    isClearable={false}
                    selectsEnd={true}
                    monthsShown={2}
                    className={styles.datePicker}
                    dateFormat={'dd.MM.yyyy'}
                    locale={ru}
                    onChange={props.eventChangeEndtDate}
                    shouldCloseOnSelect={props.isShouldCloseOnSelect}
                    disabled={props.status === 'disabled' || undefined}
                    showWeekNumbers={props.isShowWeekNumbers}
                    readOnly={props.isReadOnly}
                    placeholderText={'дд.мм.гггг'}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    minDate={props.startDate}
                    selected={props.endDate}
                    todayButton={<TodayButton />}
                    //customInput={<InputMask mask={'99.99.9999'} />}
                />
            </div>
            {props.errorText ? <ErrorTextInput errorText={props.errorText} /> : null}
        </div>
    );
}