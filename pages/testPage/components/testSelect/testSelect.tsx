import React from "react";
import { SmartComponentProps } from "../../../../models/smartComponentProps";
import { v4 as uuidv4 } from 'uuid';
import { StoreComponentSelect, SelectItem, SelectSmart } from "../../../../components/select";

function TestSelect(props: SmartComponentProps<StoreComponentSelect<SelectItem<number>>>) {
    return (
        <div>
            <SelectSmart store={props.store} />

            <br />
            <button
                onClick={() => {
                    props.store.setOptions({
                        errorText: uuidv4()
                    });
                }}
            >
                {'Ошибка'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        errorText: undefined
                    });
                }}
            >
                {'Удалить ошибку'}
            </button>

            <button
                onClick={() => {
                    props.store.validation();
                }}
            >
                {'validation'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        selectedItem: null
                    });
                }}
            >
                {'Сбросить выбор'}
            </button>

            <button
                onClick={() => {
                    const TEST_DATA: SelectItem<number>[] = [];

                    for (let i = 0; i < 100; ++i) {
                        TEST_DATA.push({
                            label: `item label ${i} ${uuidv4()}`,
                            value: i
                        });
                    }

                    props.store.setOptions({
                        itemsList: TEST_DATA
                    });
                }}
            >
                {'Добавить элементов'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        itemsList: []
                    });
                }}
            >
                {'Пустой список'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isClearable: true
                    });
                }}
            >
                {'isClearable: true'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isClearable: false
                    });
                }}
            >
                {'isClearable: false'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isSearchable: true
                    });
                }}
            >
                {'isSearchable: true'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isSearchable: false
                    });
                }}
            >
                {'isSearchable: false'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isDisabled: false
                    });
                }}
            >
                {'isDisabled: false'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isDisabled: true
                    });
                }}
            >
                {'isDisabled: true'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isLoading: false
                    });
                }}
            >
                {'isLoading: false'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isLoading: true
                    });
                }}
            >
                {'isLoading: true'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        placeholder: uuidv4()
                    });
                }}
            >
                {'placeholder'}
            </button>
        </div>
    );
}

export default React.memo(TestSelect);