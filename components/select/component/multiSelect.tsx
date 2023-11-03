import React from "react";
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import selectDefaultThemeConfig from "../config/selectDefaultThemeConfig";
import selectErrorThemeConfig from "../config/selectErrorThemeConfig";
import SelectNoOptionsMessage from "../config/selectNoOptionsMessage";
import selectCloseMenuOnScroll from "../config/selectCloseMenuOnScroll";
import SelectLoadingMessage from "../config/selectLoadingMessage";
import { ErrorTextInput } from "../../errorTextInput";

type ErrorText = string | undefined;

export interface ComponentMultiSelectProps {
    readonly itemsList?: unknown[] | undefined;
    readonly selectedItems?: unknown[] | undefined;
    readonly placeholder?: string;
    readonly errorText?: ErrorText;
    readonly eventChange: (item: any) => void;
    readonly isClearable?: boolean | undefined;
    readonly isSearchable?: boolean | undefined;
    readonly isLoading?: boolean | undefined;
    readonly isDisabled?: boolean | undefined;
    readonly isCloseMenuOnSelect?: boolean | undefined;
}

const animatedComponents = makeAnimated();

function MultiSelect(props: ComponentMultiSelectProps) {
    return (
        <div>
            <ReactSelect
                isMulti={true}
                theme={props.errorText ? selectErrorThemeConfig : selectDefaultThemeConfig}
                value={props.selectedItems}
                options={props.itemsList}
                menuPlacement={'auto'}
                menuPosition={'fixed'}
                placeholder={props.placeholder}
                onChange={props.eventChange}
                loadingMessage={SelectLoadingMessage}
                noOptionsMessage={SelectNoOptionsMessage}
                closeMenuOnScroll={selectCloseMenuOnScroll}
                isDisabled ={props.isDisabled}
                isLoading={props.isLoading}
                isClearable={props.isClearable}
                isSearchable={props.isSearchable}
                closeMenuOnSelect={props.isCloseMenuOnSelect}
                components={animatedComponents}
            />
            {props.errorText ? <ErrorTextInput errorText={props.errorText}/> : null}
        </div>
    );
}

export default React.memo(MultiSelect);