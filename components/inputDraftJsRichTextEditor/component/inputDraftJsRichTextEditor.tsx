import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './inputDraftJsRichTextEditor.module.scss';
import { ErrorTextInput } from '../../errorTextInput';

type ErrorText = string | undefined;
type InputTextStatus = 'default'
    | 'success'
    | 'error';

export interface ComponentInputDraftJsRichTextEditorProps {
    readonly status?: InputTextStatus;
    readonly errorText?: ErrorText;
    readonly value?: EditorState | undefined;
    readonly eventChange?: (editorState: EditorState) => void;
    readonly placeholder?: string | undefined;
    readonly isReadOnly?: boolean;
}

const cssClassStatus: Record<InputTextStatus, string> = {
    default: styles.statusDefault,
    error: styles.statusError,
    success: styles.statusSuccess
};

export default function InputDraftJsRichTextEditor(props: ComponentInputDraftJsRichTextEditorProps) {
    let cssClass: string = styles.statusDefault;

    if (typeof props.status === 'string') {
        if (cssClassStatus.hasOwnProperty(props.status)) {
            cssClass = cssClassStatus[props.status];
        }
    }

    return (
        <div>
            <Editor
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history']
                }}
                editorState={props.value}
                editorClassName={`${cssClass} ${styles.textEditor}`}
                onEditorStateChange={props.isReadOnly ? undefined : props.eventChange}
                placeholder={props.placeholder}
                readOnly={props.isReadOnly}
                locale='ru'
            />
            {props.errorText ? <ErrorTextInput errorText={props.errorText} /> : null}
        </div>
    );
}