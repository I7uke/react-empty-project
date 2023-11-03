export type Styles = {
  'buttonClearSelectedDate': string;
  'buttonToday': string;
  'input': string;
  'inputDefault': string;
  'inputDisabled': string;
  'inputError': string;
  'inputSuccess': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
