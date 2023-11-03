import { observer } from "mobx-react";
import { MultiSelect } from "..";
import { SmartComponentProps } from "../../../models/smartComponentProps";
import StoreComponentMultiSelect from "../store/storeComponentMultiSelect";

function MultiSelectSmart(props: SmartComponentProps<StoreComponentMultiSelect<any>>){
    return(
        <MultiSelect
            {...props.store.options}
            eventChange={props.store.eventChangeValue}
        />
    );
}

export default observer(MultiSelectSmart);