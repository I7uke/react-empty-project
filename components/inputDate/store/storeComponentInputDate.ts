import { action, computed, makeObservable, observable } from "mobx";
import { ValidatedValue } from "../../../models/validatedValue";
import { checkDate } from "ts-common-helpers";
import { ComponentInputDateProps } from "../component/inputDate";

type EventChangeValue = (value?: Date | null | undefined) => void;
type FunctionValidationValue = (value?: Date | null | undefined) => ValidatedValue<Date>;
type ComponentOptions = Omit<ComponentInputDateProps, 'eventChangeDate'>;

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

export default class StoreComponentInputDate {
    //#region Options
    private _componentOptions_observable: ComponentOptions;

    public setOptions(params: Partial<ComponentOptions>) {

        let {
            errorText,
            isClearable,
            isReadOnly,
            isShouldCloseOnSelect,
            isShowWeekNumbers,
            maxDate,
            minDate,
            selectedDate,
            status,
            placeholder
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

        if (params.hasOwnProperty('maxDate')) {
            maxDate = params.maxDate;
        }

        if (params.hasOwnProperty('minDate')) {
            minDate = params.minDate;
        }

        if (params.hasOwnProperty('selectedDate')) {
            selectedDate = params.selectedDate;
        }

        if (params.hasOwnProperty('status')) {
            status = params.status;
        }

        if (params.hasOwnProperty('placeholder')) {
            placeholder = params.placeholder;
        }

        this._componentOptions_observable = {
            errorText,
            isClearable,
            isReadOnly,
            isShouldCloseOnSelect,
            isShowWeekNumbers,
            maxDate,
            minDate,
            selectedDate,
            status,
            placeholder
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

    public eventChangeValue(date?: Date | null | undefined) {
        if (this._componentOptions_observable.isReadOnly) {
            return;
        }

        if (this._componentOptions_observable.status === 'disabled') {
            return;
        }

        const newValue = date;
        const oldValue = this._componentOptions_observable.selectedDate;

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

        this._componentOptions_observable = {
            ...this._componentOptions_observable,
            errorText: errorText,
            status: status,
            selectedDate: newValue
        };

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue(newValue);
        }
    }

    public validation(): ValidatedValue<Date> {
        const currentValue = this._componentOptions_observable.selectedDate;

        if (typeof this._validation === 'function') {
            const validValue = this._validation(currentValue);

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

        const defaultErrorText: string = 'Поле не может быть пустым';

        const validDate = checkDate(currentValue);
        if (!validDate) {
            this.setOptions({
                errorText: defaultErrorText,
                status: 'error'
            });

            return {
                error: defaultErrorText,
                isError: true,
                result: undefined
            }
        }

        this.setOptions({
            errorText: undefined,
            status: undefined
        });

        return {
            error: undefined,
            isError: false,
            result: validDate
        }
    }

    constructor(init: InitData) {
        this.eventChangeValue = this.eventChangeValue.bind(this);
        this._componentOptions_observable = init.options;
        this._eventChangeValue = (typeof init.eventChangeValue === 'function') ? init.eventChangeValue : undefined;
        this._validation = (typeof init.validation === 'function') ? init.validation : undefined;
        this._isResetErrorOnDataChange = !!init.isResetErrorOnDataChange;

        makeObservable<this,
            '_componentOptions_observable'
        >(this, {
            _componentOptions_observable: observable.ref,
            eventChangeValue: action,
            setOptions: action,
            options: computed,
        });
    }
}