import { action, computed, makeObservable, observable } from "mobx";
import { ValidatedValue } from "../../../models/validatedValue";
import { ComponentInputNumberProps } from "../component/inputNumber";

type EventChangeValue = (value?: number | null | undefined) => void;
type FunctionValidationValue = (value?: number | null | undefined) => ValidatedValue<number>;

type ComponentOptions = Omit<ComponentInputNumberProps, 'eventChange'>;

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


export default class StoreComponentInputNumber {

    //#region Options
    private _componentOptions_observable: ComponentOptions;

    public setOptions(params: Partial<ComponentOptions>) {

        let {
            errorText,
            isReadOnly,
            placeholder,
            status,
            value,
            max,
            min,
            precision,
            step,
            width
        } = this._componentOptions_observable;

        if (params.hasOwnProperty('errorText')) {
            errorText = params.errorText;
        }

        if (params.hasOwnProperty('isReadOnly')) {
            isReadOnly = params.isReadOnly;
        }

        if (params.hasOwnProperty('placeholder')) {
            placeholder = params.placeholder;
        }

        if (params.hasOwnProperty('status')) {
            status = params.status;
        }

        if (params.hasOwnProperty('value')) {
            value = params.value;
        }

        if (params.hasOwnProperty('precision')) {
            precision = params.precision;
        }

        if (params.hasOwnProperty('step')) {
            step = params.step;
        }

        if (params.hasOwnProperty('width')) {
            width = params.width;
        }

        if (params.hasOwnProperty('max')) {
            max = params.max;
        }

        if (params.hasOwnProperty('min')) {
            min = params.min;
        }
        
        this._componentOptions_observable = {
            errorText,
            isReadOnly,
            placeholder,
            status,
            value,
            max,
            min,
            precision,
            step,
            width
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

    public eventChangeValue(value?: number | null | undefined) {
        if(this._componentOptions_observable.status === 'disabled' || this._componentOptions_observable.isReadOnly) {
            return;
        }

        const oldValue = this._componentOptions_observable.value;

        if (value === oldValue) {
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
            value: value
        };

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue(value);
        }
    }

    public validation(): ValidatedValue<number> {
        const currentValue = this._componentOptions_observable.value;

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

        if (typeof currentValue !== 'number') {
            this.setOptions({
                errorText: defaultErrorText,
                status: 'error'
            });

            return {
                error: defaultErrorText,
                isError: true,
                value: undefined
            }
        }

        if (isNaN(currentValue)) {
            this.setOptions({
                errorText: defaultErrorText,
                status: 'error'
            });

            return {
                error: defaultErrorText,
                isError: true,
                value: undefined
            }
        }

        this.setOptions({
            errorText: undefined,
            status: undefined
        });

        return {
            error: undefined,
            isError: false,
            value: currentValue
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