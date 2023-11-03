import { SmartComponentProps } from "../../../models/smartComponentProps";
import StoreComponentInputNumber from "../store/storeComponentInputNumber";
import InputNumber from "./inputNumber";
import { observer } from "mobx-react";

function InputNumberSmart(props: SmartComponentProps<StoreComponentInputNumber>) {
    return (
        <InputNumber
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(InputNumberSmart);