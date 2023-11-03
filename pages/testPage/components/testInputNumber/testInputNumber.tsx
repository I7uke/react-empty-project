import React from "react";
import { SmartComponentProps } from "../../../../models/smartComponentProps";
import { InputNumberSmart, StoreComponentInputNumber } from "../../../../components/inputNumber";
import { v4 as uuidv4 } from 'uuid';

function TestInputNumber(props: SmartComponentProps<StoreComponentInputNumber>) {
    return (
        <div>
            <InputNumberSmart store={props.store} />
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
                        value: undefined
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
                        width: undefined
                    });
                }}
            >
                {'width 100%'}
            </button>


            <button
                onClick={() => {
                    props.store.setOptions({
                        width: 100
                    });
                }}
            >
                {'width 100px'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        width: 300
                    });
                }}
            >
                {'width 300px'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        max: 10
                    });
                }}
            >
                {'max: 10'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        max: undefined
                    });
                }}
            >
                {'max: undefined'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        min: -10
                    });
                }}
            >
                {'min: -10'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        min: undefined
                    });
                }}
            >
                {'min: undefined'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        precision: undefined
                    });
                }}
            >
                {'precision: undefined'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        precision: 0
                    });
                }}
            >
                {'precision: 0'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        precision: 2
                    });
                }}
            >
                {'precision: 2'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        precision: 5
                    });
                }}
            >
                {'precision: 5'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        step: 10
                    });
                }}
            >
                {'step: 10'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        step: 0.01
                    });
                }}
            >
                {'step: 0.01'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        step: undefined
                    });
                }}
            >
                {'step: undefined'}
            </button>

        </div>
    );
}

export default React.memo(TestInputNumber);