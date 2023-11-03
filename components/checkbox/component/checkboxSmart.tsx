import { observer } from "mobx-react";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import StoreComponentCheckbox from "../store/storeComponentCheckbox";
import Checkbox from "./checkbox";

function CheckboxSmart(props: SmartComponentProps<StoreComponentCheckbox>) {
    return (
        <Checkbox
            eventChange={props.store.eventChangeValue}
            isChecked={props.store.isChecked}
        />
    );
}

export default observer(CheckboxSmart);