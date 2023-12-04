import {action, computed, makeObservable, observable} from "mobx";
import { SelectItem } from "..";
import cloneDeep from "lodash.clonedeep";
import { ValidatedValue } from "../../../models/validatedValue";
import { ComponentMultiSelectProps } from "../component/multiSelect";

type ItemValue = string | number;
type FunctionValidationValue<TValue extends ItemValue, TItem extends SelectItem<TValue>> = (items: TItem[]) => ValidatedValue<TItem[]>;
type EventChangeValue<TValue extends ItemValue, TItem extends SelectItem<TValue>> = (item: TItem[] | undefined | null) => void;

interface ComponentOptions<TValue extends ItemValue, TItem extends SelectItem<TValue>> extends Omit<ComponentMultiSelectProps, 'itemsList' | 'selectedItems' | 'eventChange'> {
    /**
     * Список элементов
     */
    readonly itemsList?: TItem[] | undefined;
    /**
     * Выбранные элементы
     */
    readonly selectedItems?: TItem[] | undefined;
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
     * Сбросить ошибку при выборе элемента
     */
    readonly isResetErrorOnDataChange?: boolean | undefined;
    /**
     * Проверить текущее выбранное значение
     */
    readonly validation?: FunctionValidationValue<TValue, TItem> | undefined;
}

export default class StoreComponentMultiSelect<TItem extends SelectItem<TValue>, TValue extends ItemValue = number> {

    //#region Options
    private _componentOptions_observable: ComponentOptions<TValue, TItem>;

    public setOptions(params: Partial<ComponentOptions<TValue, TItem>>) {
        let {
            isClearable,
            itemsList,
            errorText,
            placeholder,
            selectedItems,
            isSearchable,
            isLoading,
            isDisabled,
            isCloseMenuOnSelect
        } = this._componentOptions_observable;

        if (params.hasOwnProperty('itemsList')) {
            itemsList = params.itemsList;
        }

        if (params.hasOwnProperty('isClearable')) {
            isClearable = params.isClearable;
        }

        if (params.hasOwnProperty('selectedItems')) {
            selectedItems = params.selectedItems;
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

        if (params.hasOwnProperty('isCloseMenuOnSelect')) {
            isCloseMenuOnSelect = params.isCloseMenuOnSelect;
        }
        
        this._componentOptions_observable = {
            itemsList,
            selectedItems,
            errorText,
            placeholder,
            isSearchable,
            isClearable,
            isLoading,
            isDisabled,
            isCloseMenuOnSelect
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

    public eventChangeValue(items?: TItem[] | null | undefined) {
        let newSelectedItems: TItem[] = [];

        if (Array.isArray(items)) {
            newSelectedItems = items;
        }

        let errorText = this._componentOptions_observable.errorText;

        if (this._isResetErrorOnDataChange) {
            errorText = undefined;
        }

        this._componentOptions_observable = {
            ...this._componentOptions_observable,
            errorText: errorText,
            selectedItems: newSelectedItems
        }

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue(items);
        }
    }

    /**
     * Получить выбранное значение
     */
    public getSelectedValue(): TItem[] {
        if (!Array.isArray(this._componentOptions_observable.selectedItems)) {
            return [];
        }

        return cloneDeep(this._componentOptions_observable.selectedItems);
    }
    
    /**
     * Проверить текущее выбранное значение
     */
    public validation(): ValidatedValue<TItem[]> {
        const selectedItems: TItem[] = Array.isArray(this._componentOptions_observable.selectedItems) ? this._componentOptions_observable.selectedItems : [];

        if (typeof this._validation === 'function') {
            const validValue = this._validation(selectedItems);

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

        if (selectedItems.length) {
            this.setOptions({
                errorText: undefined
            });

            return {
                error: undefined,
                isError: false,
                result: cloneDeep(selectedItems)
            }
        }

        const defaultErrorText: string = 'Элементы не выбраны';

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
        this._validation = (typeof init.validation === 'function') ? init.validation : undefined;
        this._eventChangeValue = (typeof init.eventChangeValue === 'function') ? init.eventChangeValue : undefined;
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