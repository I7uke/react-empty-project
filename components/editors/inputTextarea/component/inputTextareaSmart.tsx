
import { observer } from "mobx-react";
import StoreComponentInputTextarea from "../store/storeComponentInputTextarea";
import InputTextarea from "./inputTextarea";
import { SmartComponentProps } from "../../../../models/smartComponentProps";

function InputTextareaSmart(props: SmartComponentProps<StoreComponentInputTextarea>) {
    return (
        <InputTextarea
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(InputTextareaSmart);