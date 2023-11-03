import {Theme} from "react-select";

function selectErrorThemeConfig(inputTheme: Theme) {
    return({
        ...inputTheme,
        colors: {
            ...inputTheme.colors,
            primary: '#de350b', //!
            primary25: '#deebff',
            neutral20: '#de350b', //!
            neutral0: 'white',
            neutral30: '#de350b', // ! hover
        }
    });
};

export default selectErrorThemeConfig;