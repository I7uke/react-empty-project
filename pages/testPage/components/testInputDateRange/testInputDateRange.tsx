import { InputDateRangeSmart, StoreComponentInputDateRange } from "../../../../components/inputDateRange";
import { SmartComponentProps } from "../../../../models/smartComponentProps";
import { v4 as uuidv4 } from 'uuid';

export default function TestInputDateRange(props: SmartComponentProps<StoreComponentInputDateRange>) {
    return (
        <div>
            <InputDateRangeSmart store={props.store} />

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
                        startDate: undefined,
                        endDate: undefined
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