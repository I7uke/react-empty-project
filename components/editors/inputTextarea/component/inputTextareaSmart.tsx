
import { observer } from "mobx-react";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import StoreComponentInputTextarea from "../store/storeComponentInputTextarea";
import InputTextarea from "./inputTextarea";

function InputTextareaSmart(props: SmartComponentProps<StoreComponentInputTextarea>) {
    return (
        <InputTextarea
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(InputTextareaSmart);