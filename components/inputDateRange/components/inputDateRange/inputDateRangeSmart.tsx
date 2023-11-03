import { observer } from "mobx-react";
import { SmartComponentProps } from "../../../../models/smartComponentProps";
import StoreComponentInputDateRange from "../../store/storeComponentInputDateRange";
import InputDateRange from "./inputDateRange";

function InputDateRangeSmart(props: SmartComponentProps<StoreComponentInputDateRange>) {
    return (<InputDateRange {...props.store.options}
        eventChangeStartDate={props.store.eventChangeStartDate}
        eventChangeEndtDate={props.store.eventChangeEndtDate}
    />);
}

export default observer(InputDateRangeSmart);