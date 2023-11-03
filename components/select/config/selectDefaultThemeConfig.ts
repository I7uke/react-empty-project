import {Theme} from "react-select";

function selectDefaultThemeConfig(inputTheme: Theme) {
    return({
        ...inputTheme,
        colors: {
            ...inputTheme.colors,
            primary: '#2684ff',
            primary25: '#deebff',
            neutral20: '#cccccc',
            neutral0: 'white'
        }
    });
};

export default selectDefaultThemeConfig;
