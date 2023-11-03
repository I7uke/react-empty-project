import React from "react";
import styles from './checkboxSwitchStyle.scss';

export type CheckboxSwitchSize = 'large' | 'default' | 'small';

type Props = {
    /**
     * Размер переключателя
     */
    readonly size: CheckboxSwitchSize;
    readonly eventChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    readonly isChecked?: boolean | undefined;
}

const cssClassSwitchSize:Record<CheckboxSwitchSize, {
    readonly cssClassLabel: string;
    readonly cssClassSlider: string;
}> = {
    large: {
        cssClassLabel: styles.labelSizeLarge,
        cssClassSlider: styles.sliderSizeLarge
    },
    default: {
        cssClassLabel: styles.labelSizeDefault,
        cssClassSlider: styles.sliderSizeDefault
    },
    small: {
        cssClassLabel: styles.labelSizeSmall,
        cssClassSlider: styles.sliderSizeSmall
    },
}

function CheckboxSwitch(props: Props) {
    let cssClassSize = cssClassSwitchSize.default;

    if (cssClassSwitchSize.hasOwnProperty(props.size)) {
        cssClassSize = cssClassSwitchSize[props.size];
    }

    const cssClassLabel: string = cssClassSize.cssClassLabel;
    const cssClassSlider: string = cssClassSize.cssClassSlider;

    return (
        <label className={`${styles.label} ${cssClassLabel}` }>
            <input
                checked={props.isChecked}
                onChange={props.eventChange}
                type={'checkbox'}
                className={styles.input}
            />
            <span className={`${styles.slider} ${cssClassSlider}`} />
        </label>
    );
}

export default React.memo(CheckboxSwitch);