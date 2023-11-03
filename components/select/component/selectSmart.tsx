import { observer } from "mobx-react";
import Select from "./select";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import StoreComponentSelect from "../store/storeComponentSelect";

function SelectSmart(props: SmartComponentProps<StoreComponentSelect<any>>){
    return (
        <Select
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(SelectSmart);