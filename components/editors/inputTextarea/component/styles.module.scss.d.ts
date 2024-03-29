export type Styles = {
  'inputDefault': string;
  'inputDisabled': string;
  'inputError': string;
  'inputSuccess': string;
  'textarea': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
