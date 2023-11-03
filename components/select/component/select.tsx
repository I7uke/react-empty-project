import React from "react";
import ReactSelect from 'react-select';
import selectDefaultThemeConfig from "../config/selectDefaultThemeConfig";
import selectErrorThemeConfig from "../config/selectErrorThemeConfig";
import SelectNoOptionsMessage from "../config/selectNoOptionsMessage";
import selectCloseMenuOnScroll from "../config/selectCloseMenuOnScroll";
import SelectLoadingMessage from "../config/selectLoadingMessage";
import { ErrorTextInput } from "../../errorTextInput";

type ErrorText = string | undefined;

export interface ComponentSelectProps {
    readonly itemsList?: unknown[] | undefined;
    readonly selectedItem?: unknown | undefined | null;
    readonly placeholder?: string;
    readonly errorText?: ErrorText;
    readonly isClearable?: boolean | undefined;
    readonly isSearchable?: boolean | undefined;
    readonly isLoading?: boolean | undefined;
    readonly isDisabled?: boolean | undefined;
    readonly eventChange: (item: unknown) => void
}

function Select(props: ComponentSelectProps) {
    return (
        <div>
            <ReactSelect
                theme={props.errorText ? selectErrorThemeConfig : selectDefaultThemeConfig}
                value={props.selectedItem}
                options={props.itemsList}
                menuPlacement={'auto'}
                menuPosition={'fixed'}
                placeholder={props.placeholder}
                onChange={props.eventChange}
                loadingMessage={SelectLoadingMessage}
                noOptionsMessage={SelectNoOptionsMessage}
                closeMenuOnScroll={selectCloseMenuOnScroll}
                isDisabled={props.isDisabled}
                isLoading={props.isLoading}
                isClearable={props.isClearable}
                isSearchable={props.isSearchable}
            />
            {props.errorText ? <ErrorTextInput errorText={props.errorText} /> : null}
        </div>
    );
}

export default React.memo(Select);