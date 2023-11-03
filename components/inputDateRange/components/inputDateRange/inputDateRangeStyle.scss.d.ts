export type Styles = {
  'buttonToday': string;
  'datePicker': string;
  'input': string;
  'inputDefault': string;
  'inputDisabled': string;
  'inputError': string;
  'inputSuccess': string;
  'separator': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
