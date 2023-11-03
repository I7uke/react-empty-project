import { observer } from "mobx-react";
import InputDraftJsRichTextEditorSmart from "../../../../components/inputDraftJsRichTextEditor/component/inputDraftJsRichTextEditorSmart";
import { StoreComponentInputDraftJs } from "../../../../components/inputDraftJsRichTextEditor/store/storeComponentInputDraftJs";
import { SmartComponentProps } from "../../../../models/smartComponentProps";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { v4 as uuidv4 } from 'uuid';

const PreviewHtml = observer((props: SmartComponentProps<StoreComponentInputDraftJs>) => {
    if (!props.store.options.value) {
        return;
    }

    return (
        <div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(props.store.options.value.getCurrentContent())) }} />
        </div>
    );
});

export default function TestQuillRichTextEditor(props: SmartComponentProps<StoreComponentInputDraftJs>) {
    return (
        <div>
            <InputDraftJsRichTextEditorSmart store={props.store} />
            <PreviewHtml store={props.store} />
            <div>
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
                        props.store.setEmptyValue();
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
        </div>
    );
}