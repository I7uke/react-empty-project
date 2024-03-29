import React from "react";
import { SmartComponentProps } from "../../../../models/smartComponentProps";
import { v4 as uuidv4 } from 'uuid';
import { InputTextareaSmart, StoreComponentInputTextarea } from "../../../../components/editors/inputTextarea";

function TestInputTextarea(props: SmartComponentProps<StoreComponentInputTextarea>) {
    return (
        <div>
            <InputTextareaSmart store={props.store}/>            
            <br />
            <button
                onClick={() => {
                    props.store.setOptions({
                        status: 'error',
                        errorText: uuidv4()
                    });
                }}
            >
                {'Ошибка'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        status: undefined,
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
                        value: ''
                    });
                }}
            >
                {'Пустое значение'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isReadOnly: false
                    });
                }}
            >
                {'isReadOnly: false'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isReadOnly: true
                    });
                }}
            >
                {'isReadOnly: true'}
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

            <button
                onClick={() => {
                    props.store.setOptions({
                        placeholder: undefined
                    });
                }}
            >
                {'Убрать placeholder'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        status: "default"
                    });
                }}
            >
                {'status default'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        status: 'disabled'
                    });
                }}
            >
                {'status disabled'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        status: 'error'
                    });
                }}
            >
                {'status error'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        status: 'success'
                    });
                }}
            >
                {'status success'}
            </button>
            
        </div>
    );
}

export default React.memo(TestInputTextarea);