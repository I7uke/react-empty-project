import { StoreComponentCheckbox } from "../../../components/checkbox";
import { StoreComponentInputDate } from "../../../components/inputDate";
import { StoreComponentInputDateRange } from "../../../components/inputDateRange";
import { StoreComponentInputNumber } from "../../../components/inputNumber";
import { StoreComponentInputText } from "../../../components/inputText";
import { StoreComponentInputTextarea } from "../../../components/inputTextarea";
import { SelectItem, StoreComponentMultiSelect, StoreComponentSelect } from "../../../components/select";


export class StorePageContent {
    public readonly storeSelect: StoreComponentSelect<SelectItem<number>>;
    public readonly storeMultiSelect: StoreComponentMultiSelect<SelectItem<number>>;
    public readonly storeComponentCheckbox1: StoreComponentCheckbox;
    public readonly storeComponentCheckbox2: StoreComponentCheckbox;
    public readonly storeComponentCheckbox3: StoreComponentCheckbox;
    public readonly storeComponentInputText: StoreComponentInputText;
    public readonly storeComponentInputTextarea: StoreComponentInputTextarea;
    public readonly storeComponentInputNumber: StoreComponentInputNumber;
    public readonly storeComponentInputDate: StoreComponentInputDate;
    public readonly storeComponentInputDateRange: StoreComponentInputDateRange;

    constructor() {
        this.storeSelect = new StoreComponentSelect<SelectItem<number>>({
            isResetErrorOnDataChange: true,
            validation: (item) => {
                if (item) {
                    return {
                        error: undefined,
                        isError: false,
                        value: item
                    }
                }

                return {
                    error: 'Поле не может быть пустым! Элемент не выбран',
                    isError: true,
                    value: undefined
                }
            },
            options: {
                itemsList: [],
                isClearable: true,
                placeholder: 'Placeholder',
            }
        });

        this.storeMultiSelect = new StoreComponentMultiSelect<SelectItem<number>>({
            isResetErrorOnDataChange: true,
            validation(items) {
                if (items.length) {
                    return {
                        error: undefined,
                        isError: false,
                        value: items
                    }
                }

                return {
                    error: 'Поле не может быть пустым! Элементы не выбраны',
                    isError: true,
                    value: undefined
                }
            },
            options: {
                itemsList: [],
                isClearable: true,
                placeholder: 'Placeholder',
            }
        });

        this.storeComponentCheckbox1 = new StoreComponentCheckbox({
            isChecked: true,
            eventChangeValue: (isChecked) => {
                console.log(`isChecked1: ${isChecked}`);
            }
        });

        this.storeComponentCheckbox2 = new StoreComponentCheckbox({
            isChecked: true,
            eventChangeValue: (isChecked) => {
                console.log(`isChecked2: ${isChecked}`);
            }
        });

        this.storeComponentCheckbox3 = new StoreComponentCheckbox({
            isChecked: true,
            eventChangeValue: (isChecked) => {
                console.log(`CheckboxSwitchSmart: ${isChecked}`);
            }
        });

        this.storeComponentInputText = new StoreComponentInputText({
            options: {
                value: ''
            },
            isResetErrorOnDataChange: true,
            validation: (value) => {
                if (!value) {
                    return {
                        error: 'Поле не может быть пустым!',
                        isError: true,
                        value: undefined
                    }
                }

                return {
                    error: undefined,
                    isError: false,
                    value: value
                }
            }
        });

        this.storeComponentInputTextarea = new StoreComponentInputTextarea({
            options: {
                value: ''
            },
            isResetErrorOnDataChange: true,
            validation: (value) => {
                if (!value) {
                    return {
                        error: 'Поле не может быть пустым!',
                        isError: true,
                        value: undefined
                    }
                }

                return {
                    error: undefined,
                    isError: false,
                    value: value
                }
            }
        });

        this.storeComponentInputNumber = new StoreComponentInputNumber({
            options: {
                value: 5
            },
            isResetErrorOnDataChange: true
        });

        this.storeComponentInputDate = new StoreComponentInputDate({
            options: {
                selectedDate: new Date()
            },
            isResetErrorOnDataChange: true
        });

        this.storeComponentInputDateRange = new StoreComponentInputDateRange({
            options: {
                isClearable: true
            },
            isResetErrorOnDataChange: true
        });
    }
}