import { observer } from "mobx-react";
import StoreComponentInputText from "../store/storeComponentInputText";
import InputText from "./inputText";
import { SmartComponentProps } from "../../../../models/smartComponentProps";

function InputTextSmart(props: SmartComponentProps<StoreComponentInputText>) {
    return (
        <InputText
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(InputTextSmart);