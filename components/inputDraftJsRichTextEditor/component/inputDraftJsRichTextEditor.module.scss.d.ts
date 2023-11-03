export type Styles = {
  'statusDefault': string;
  'statusError': string;
  'statusSuccess': string;
  'textEditor': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
