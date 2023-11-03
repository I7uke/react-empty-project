import { observer } from "mobx-react";
import StoreComponentCheckbox from "../checkbox/store/storeComponentCheckbox";
import CheckboxSwitch, { CheckboxSwitchSize } from "./checkboxSwitch";

type Props = {
    readonly store: StoreComponentCheckbox;
    readonly size:CheckboxSwitchSize;
}

function CheckboxSwitchSmart(props: Props){
    return(
        <CheckboxSwitch
            size={props.size}
            eventChange={props.store.eventChangeValue}
            isChecked={props.store.isChecked}
        />);
}


export default observer(CheckboxSwitchSmart);