import { observer } from "mobx-react";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import StoreComponentInputDate from "../store/storeComponentInputDate";
import InputDate from "./inputDate";

function InputDateSmart(props: SmartComponentProps<StoreComponentInputDate>) {
    return (
        <InputDate
            {...props.store.options}
            eventChangeDate={props.store.eventChangeValue}
        />
    );
}

export default observer(InputDateSmart);