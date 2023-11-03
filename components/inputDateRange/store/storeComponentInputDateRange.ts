import { action, computed, makeObservable, observable } from "mobx";
import { ValidatedValue } from "../../../models/validatedValue";
import { checkDate } from "ts-common-helpers";
import { ComponentInputDateRangeProps } from "../components/inputDateRange/inputDateRange";

type EventChangeValue = (range?: [Date | null | undefined, Date | null | undefined]) => void;
type FunctionValidationValue = (range?: [Date | null | undefined, Date | null | undefined]) => ValidatedValue<[Date, Date]>;
type ComponentOptions = Omit<ComponentInputDateRangeProps, 'eventChangeStartDate' | 'eventChangeEndtDate'>;

interface InitData {
    /**
     * Список опций для компонента
     */
    readonly options: ComponentOptions;
    /**
     * Слушатель значение изменено
     */
    readonly eventChangeValue?: EventChangeValue | undefined;
    /**
     * Проверить текущее выбранное значение
     */
    readonly validation?: FunctionValidationValue | undefined;
    /**
     * Сбрасывать ошибку при выборе элемента
     */
    readonly isResetErrorOnDataChange?: boolean | undefined;
}

export default class StoreComponentInputDateRange {
    //#region Options
    private _componentOptions_observable: ComponentOptions;

    public setOptions(params: Partial<ComponentOptions>) {
        let {
            errorText,
            isClearable,
            isReadOnly,
            isShouldCloseOnSelect,
            isShowWeekNumbers,
            status,
            endDate,
            startDate
        } = this._componentOptions_observable;

        if (params.hasOwnProperty('errorText')) {
            errorText = params.errorText;
        }

        if (params.hasOwnProperty('isClearable')) {
            isClearable = params.isClearable;
        }

        if (params.hasOwnProperty('isReadOnly')) {
            isReadOnly = params.isReadOnly;
        }

        if (params.hasOwnProperty('isShouldCloseOnSelect')) {
            isShouldCloseOnSelect = params.isShouldCloseOnSelect;
        }

        if (params.hasOwnProperty('isShowWeekNumbers')) {
            isShowWeekNumbers = params.isShowWeekNumbers;
        }

        if (params.hasOwnProperty('status')) {
            status = params.status;
        }

        if (params.hasOwnProperty('endDate')) {
            endDate = params.endDate;
        }

        if (params.hasOwnProperty('startDate')) {
            startDate = params.startDate;
        }
        
        this._componentOptions_observable = {
            errorText,
            isClearable,
            isReadOnly,
            isShouldCloseOnSelect,
            isShowWeekNumbers,
            status,
            endDate,
            startDate
        };
    }

    get options() {
        return this._componentOptions_observable;
    }
    //#endregion

    //#region Внутренние настройки
    private readonly _eventChangeValue?: EventChangeValue | undefined;
    private readonly _isResetErrorOnDataChange: boolean;
    private readonly _validation?: FunctionValidationValue | undefined;
    //#endregion

    private _changeStartEndDate(date: Date | null | undefined, changeType: 'startDate' | 'endDate'){
        if (this._componentOptions_observable.isReadOnly) {
            return;
        }

        if (this._componentOptions_observable.status === 'disabled') {
            return;
        }

        const newValue = date;
        const oldValue = changeType === 'startDate' ? this._componentOptions_observable.startDate : this._componentOptions_observable.endDate;


        if (newValue === oldValue) {
            return;
        }

        let errorText = this._componentOptions_observable.errorText;
        let status = this._componentOptions_observable.status;
        
        if (this._isResetErrorOnDataChange) {
            if (errorText) {
                errorText = undefined;
            }

            if (status === 'error') {
                status = undefined;
            }
        }

        if(changeType === 'startDate') {
            this._componentOptions_observable = {
                ...this._componentOptions_observable,
                errorText: errorText,
                status: status,
                startDate: newValue
            };
        } else {
            this._componentOptions_observable = {
                ...this._componentOptions_observable,
                errorText: errorText,
                status: status,
                endDate: newValue
            };
        }

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue([this._componentOptions_observable.startDate, this._componentOptions_observable.endDate]);
        }
    }

    public  eventChangeStartDate(date?: Date | null | undefined) {
        this._changeStartEndDate(date, 'startDate');
    }

    public eventChangeEndtDate(date?: Date | null | undefined) {
        console.log(date);
        this._changeStartEndDate(date, 'endDate');
    }

    public validation(): ValidatedValue<[Date, Date]> {
        const { startDate, endDate } = this._componentOptions_observable;

        if (typeof this._validation === 'function') {
            const validValue = this._validation([startDate, endDate]);

            if (typeof validValue.error === 'string') {
                this.setOptions({
                    errorText: validValue.error,
                    status: 'error'
                });
            } else {
                this.setOptions({
                    errorText: undefined,
                    status: undefined
                });
            }

            return validValue;
        }

        const validDateStart = checkDate(startDate);

        if(!validDateStart) {
            const errorDateStart: string = 'Начало периода не может быть пустым';

            this.setOptions({
                errorText: errorDateStart,
                status: 'error'
            });

            return {
                error: errorDateStart,
                isError: true,
                value: undefined
            };
        }

        const validDateEnd = checkDate(endDate);

        if(!validDateEnd) {
            const errorDateEnd: string = 'Конец периода не может быть пустым';

            this.setOptions({
                errorText: errorDateEnd,
                status: 'error'
            });

            return {
                error: errorDateEnd,
                isError: true,
                value: undefined
            };
        }

        this.setOptions({
            errorText: undefined,
            status: undefined
        });

        return {
            error: undefined,
            isError: false,
            value:[validDateStart, validDateEnd]
        }
    }

    constructor(init: InitData) {
        this.eventChangeStartDate = this.eventChangeStartDate.bind(this);
        this.eventChangeEndtDate = this.eventChangeEndtDate.bind(this);

        this._componentOptions_observable = init.options;
        this._eventChangeValue = (typeof init.eventChangeValue === 'function') ? init.eventChangeValue : undefined;
        this._validation = (typeof init.validation === 'function') ? init.validation : undefined;
        this._isResetErrorOnDataChange = !!init.isResetErrorOnDataChange;

        makeObservable<this,
            '_componentOptions_observable' 
            | '_changeStartEndDate'
        >(this, {
            _componentOptions_observable: observable.ref,
            _changeStartEndDate: action,
            setOptions: action,
            options: computed,
        });
    }
}