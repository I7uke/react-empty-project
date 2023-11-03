import { action, computed, makeObservable, observable } from "mobx";
import { ValidatedValue } from "../../../models/validatedValue";
import { ComponentInputDraftJsRichTextEditorProps } from "../component/inputDraftJsRichTextEditor";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from "draftjs-to-html";

type EventChangeValue = (editorState: EditorState) => void;
type FunctionValidationValue = (value?: string | null | undefined) => ValidatedValue<string>;
type ComponentOptions = Omit<ComponentInputDraftJsRichTextEditorProps, 'eventChange'>;


interface InitOptions extends Omit<ComponentInputDraftJsRichTextEditorProps, 'eventChange' | 'value'> {
    value?: string | undefined;
}


interface InitData {
    /**
     * Список опций для компонента
     */
    readonly options: InitOptions;
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

export class StoreComponentInputDraftJs {
    //#region Options
    private _componentOptions_observable: ComponentOptions;

    public setOptions(params: Partial<ComponentOptions>) {

        let {
            errorText,
            isReadOnly,
            placeholder,
            status,
            value
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

        this._componentOptions_observable = {
            errorText,
            isReadOnly,
            placeholder,
            status,
            value
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

    private _convertToHtml(): string {
        const currentValue = this._componentOptions_observable.value;

        if (!currentValue) {
            return '';
        }

        const htmlValue: string = draftToHtml(convertToRaw(currentValue.getCurrentContent()));

        if (!htmlValue) {
            return '';
        }

        return htmlValue;
    }

    public getHtmlValue():string {
        return this._convertToHtml();
    }

    public setEmptyValue() {
        this.setOptions({
            value: EditorState.createEmpty()
        });
    }

    public eventChangeValue(editorState: EditorState) {
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
            value: editorState
        };

        if (typeof this._eventChangeValue === 'function') {
            this._eventChangeValue(editorState);
        }
    }

    public validation(): ValidatedValue<string> {
        const currentHtmlValue = this._convertToHtml();

        if (typeof this._validation === 'function') {
            const validValue = this._validation(currentHtmlValue);

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

        if (typeof currentHtmlValue !== 'string') {
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

        if (!currentHtmlValue) {
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
            value: currentHtmlValue
        }
    }

    constructor(init: InitData) {
        this.eventChangeValue = this.eventChangeValue.bind(this);

        const valueHtml = htmlToDraft(init.options?.value ?? '');
        const contentState = ContentState.createFromBlockArray(valueHtml.contentBlocks, valueHtml.entityMap);
        const editorState = EditorState.createWithContent(contentState);

        this._componentOptions_observable = {
            ...init.options,
            value: editorState
        };
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