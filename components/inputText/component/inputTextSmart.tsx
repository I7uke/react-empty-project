import { observer } from "mobx-react";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import StoreComponentInputText from "../store/storeComponentInputText";
import InputText from "./inputText";

function InputTextSmart(props: SmartComponentProps<StoreComponentInputText>) {
    return (
        <InputText
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(InputTextSmart);