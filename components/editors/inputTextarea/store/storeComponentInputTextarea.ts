import { action, computed, makeObservable, observable } from "mobx";
import { ComponentInputTextareaProps } from "../component/inputTextarea";
import { ValidatedValue } from "../../../../models/validatedValue";

type EventChangeValue = (value: string) => void;
type FunctionValidationValue = (value?: string | null | undefined) => ValidatedValue<string>;
type ComponentOptions = Omit<ComponentInputTextareaProps, 'eventChange'>;

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

export default class StoreComponentInputTextarea {

    //#region Options
    private _componentOptions_observable: Readonly<ComponentOptions>;

    public setOptions(params: Partial<ComponentOptions>) {
        const oldParams = this._componentOptions_observable;
        this._componentOptions_observable = { ...oldParams, ...params };
    }

    get options(): Readonly<ComponentOptions> {
        return this._componentOptions_observable;
    }
    //#endregion

    //#region Внутренние настройки
    private readonly _eventChangeValue?: EventChangeValue | undefined;
    private readonly _isResetErrorOnDataChange: boolean;
    private readonly _validation?: FunctionValidationValue | undefined;
    //#endregion

    public eventChangeValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newValue: string = e.currentTarget.value;
        const oldValue = this._componentOptions_observable.value;

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
            value: newValue
        };

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue(newValue);
        }
    }

    public validation(): ValidatedValue<string> {
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

        if (typeof currentValue !== 'string') {
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

        if (!currentValue) {
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
            result: currentValue
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