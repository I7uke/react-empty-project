import { observer } from "mobx-react";
import StoreComponentCheckbox from "../checkbox/store/storeComponentCheckbox";
import CheckboxWithLabel from "./checkboxWithLabel";

type Props = {
    readonly label: string;
    readonly store: StoreComponentCheckbox;
}

function CheckboxWithLabelSmart(props: Props) {
    return (
        <CheckboxWithLabel
            label={props.label}
            eventChange={props.store.eventChangeValue}
            isChecked={props.store.isChecked}
        />
    );
}

export default observer(CheckboxWithLabelSmart);