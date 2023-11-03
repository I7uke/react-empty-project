import { observer } from "mobx-react";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import { StoreComponentInputDraftJs } from "../store/storeComponentInputDraftJs";
import { InputDraftJsRichTextEditor } from "..";

function InputDraftJsRichTextEditorSmart(props: SmartComponentProps<StoreComponentInputDraftJs>) {
    return (
        <InputDraftJsRichTextEditor
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(InputDraftJsRichTextEditorSmart);
