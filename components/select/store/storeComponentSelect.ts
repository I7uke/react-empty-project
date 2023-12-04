import { action, computed, makeObservable, observable } from "mobx";
import { SelectItem } from "..";
import cloneDeep from "lodash.clonedeep";
import { ValidatedValue } from "../../../models/validatedValue";
import { ComponentSelectProps } from "../component/select";

type ItemValue = string | number;
type EventChangeValue<TValue extends ItemValue, TItem extends SelectItem<TValue>> = (currentItem: TItem | null, prevItem?: TItem | null | undefined) => void;
type FunctionValidationValue<TValue extends ItemValue, TItem extends SelectItem<TValue>> = (item?: TItem | null | undefined) => ValidatedValue<TItem>;

interface ComponentOptions<TValue extends ItemValue, TItem extends SelectItem<TValue>> extends Omit<ComponentSelectProps, 'eventChange' | 'itemsList' | 'selectedItem'> {
    /**
     * Список элементов
     */
    readonly itemsList?: TItem[] | undefined;
    /**
     * Текущий выбранный элемент
     */
    readonly selectedItem?: TItem | undefined | null;
}

interface InitData<TValue extends ItemValue, TItem extends SelectItem<TValue>> {
    /**
     * Список опций для компонента
     */
    readonly options: ComponentOptions<TValue, TItem>;
    /**
     * Слушатель значение изменено
     */
    readonly eventChangeValue?: EventChangeValue<TValue, TItem> | undefined;
    /**
     * Проверить текущее выбранное значение
     */
    readonly validation?: FunctionValidationValue<TValue, TItem> | undefined;
    /**
     * Сбрасывать ошибку при выборе элемента
     */
    readonly isResetErrorOnDataChange?: boolean | undefined;
}

export default class StoreComponentSelect<TItem extends SelectItem<TValue>, TValue extends ItemValue = number> {

    //#region Options
    private _componentOptions_observable: ComponentOptions<TValue, TItem>;

    public setOptions(params: Partial<ComponentOptions<TValue, TItem>>) {
        let {
            isClearable,
            itemsList,
            errorText,
            placeholder,
            selectedItem,
            isSearchable,
            isLoading,
            isDisabled
        } = this._componentOptions_observable;

        if (params.hasOwnProperty('itemsList')) {
            itemsList = params.itemsList;
        }

        if (params.hasOwnProperty('isClearable')) {
            isClearable = params.isClearable;
        }

        if (params.hasOwnProperty('selectedItem')) {
            selectedItem = params.selectedItem;
        }

        if (params.hasOwnProperty('errorText')) {
            errorText = params.errorText;
        }

        if (params.hasOwnProperty('placeholder')) {
            placeholder = params.placeholder;
        }

        if (params.hasOwnProperty('isSearchable')) {
            isSearchable = params.isSearchable;
        }

        if (params.hasOwnProperty('isLoading')) {
            isLoading = params.isLoading;
        }

        if (params.hasOwnProperty('isDisabled')) {
            isDisabled = params.isDisabled;
        }

        this._componentOptions_observable = {
            itemsList,
            selectedItem,
            errorText,
            placeholder,
            isSearchable,
            isClearable,
            isLoading,
            isDisabled
        };
    }

    get options() {
        return this._componentOptions_observable;
    }
    //#endregion

    //#region Внутренние настройки
    private readonly _eventChangeValue?: EventChangeValue<TValue, TItem> | undefined;
    private readonly _isResetErrorOnDataChange: boolean;
    private readonly _validation?: FunctionValidationValue<TValue, TItem> | undefined;
    //#endregion

    public eventChangeValue(item: TItem | null) {
        const selectedItem = cloneDeep(item);

        if (selectedItem) {
            if (this._componentOptions_observable.selectedItem) {
                if (selectedItem.value === this._componentOptions_observable.selectedItem.value) {
                    return;
                }
            }
        } else {
            if (selectedItem === this._componentOptions_observable.selectedItem) {
                return;
            }
        }

        let errorText = this._componentOptions_observable.errorText;

        if (this._isResetErrorOnDataChange) {
            errorText = undefined;
        }

        const prevItem = cloneDeep(this._componentOptions_observable.selectedItem);

        this._componentOptions_observable = {
            ...this._componentOptions_observable,
            errorText: errorText,
            selectedItem: selectedItem
        }

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue(selectedItem, prevItem);
        }
    }

    /**
     * Получить выбранное значение
     */
    public getSelectedValue(): TItem | undefined {
        if (!this._componentOptions_observable.selectedItem) {
            return undefined;
        }

        return cloneDeep(this._componentOptions_observable.selectedItem);
    }

    /**
     * Проверить текущее выбранное значение
     */
    public validation(): ValidatedValue<TItem> {
        const selectedItem = this._componentOptions_observable.selectedItem;

        if (typeof this._validation === 'function') {
            const validValue = this._validation(selectedItem);

            if (typeof validValue.error === 'string') {
                this.setOptions({
                    errorText: validValue.error
                });
            } else {
                this.setOptions({
                    errorText: undefined
                });
            }

            return validValue;
        }

        if (selectedItem) {
            this.setOptions({
                errorText: undefined
            });

            return {
                error: undefined,
                isError: false,
                result: cloneDeep(selectedItem)
            }
        }

        const defaultErrorText: string = 'Элемент не выбран';

        this.setOptions({
            errorText: defaultErrorText
        });

        return {
            error: defaultErrorText,
            isError: true,
            result: undefined
        }
    }

    constructor(init: InitData<TValue, TItem>) {
        this.eventChangeValue = this.eventChangeValue.bind(this);
        this._componentOptions_observable = init.options;
        this._eventChangeValue = (typeof init.eventChangeValue === 'function') ? init.eventChangeValue : undefined;
        this._validation = (typeof init.validation === 'function') ? init.validation : undefined;
        this._isResetErrorOnDataChange = !!init.isResetErrorOnDataChange;

        makeObservable<this,
            '_componentOptions_observable'>(this, {
                _componentOptions_observable: observable.ref,
                eventChangeValue: action,
                setOptions: action,
                options: computed,
            });
    }
}