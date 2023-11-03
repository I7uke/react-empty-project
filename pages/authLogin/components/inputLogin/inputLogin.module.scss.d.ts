export type Styles = {
  'componentContainer': string;
  'input': string;
  'inputDefault': string;
  'inputError': string;
  'inputSuccess': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
