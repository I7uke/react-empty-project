import React from "react";
import { StoreComponentInputDate } from "../../../../components/inputDate";
import InputDateSmart from "../../../../components/inputDate/component/inputDateSmart";
import { SmartComponentProps } from "../../../../models/smartComponentProps";
import { v4 as uuidv4 } from 'uuid';

function TestInputDate(props: SmartComponentProps<StoreComponentInputDate>) {
    return (
        <div>
            <InputDateSmart store={props.store}/>

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
                        selectedDate: undefined
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

            <button
                onClick={() => {
                    const testDate = new Date();
                    testDate.setDate(testDate.getDate() + 3)
                    props.store.setOptions({
                        maxDate: testDate
                    });
                }}
            >
                {'set maxDate'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        maxDate: undefined
                    });
                }}
            >
                {'maxDate: undefined'}
            </button>


            <button
                onClick={() => {
                    const testDate = new Date();
                    testDate.setDate(testDate.getDate() - 3)
                    props.store.setOptions({
                        minDate: testDate
                    });
                }}
            >
                {'set minDate'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        minDate: undefined
                    });
                }}
            >
                {'minDate: undefined'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isShowWeekNumbers: true
                    });
                }}
            >
                {'isShowWeekNumbers: true'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isShowWeekNumbers: undefined
                    });
                }}
            >
                {'isShowWeekNumbers: undefined'}
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
                        isClearable: undefined
                    });
                }}
            >
                {'isClearable: undefined'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isShouldCloseOnSelect: true 
                    });
                }}
            >
                {'isShouldCloseOnSelect: true'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isShouldCloseOnSelect: undefined 
                    });
                }}
            >
                {'isShouldCloseOnSelect: undefined'}
            </button>

            <button
                onClick={() => {
                    props.store.setOptions({
                        isShouldCloseOnSelect: false 
                    });
                }}
            >
                {'isShouldCloseOnSelect: false'}
            </button>

        </div>
    );
}

export default React.memo(TestInputDate);