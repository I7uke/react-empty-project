export type Styles = {
  'componentContainer': string;
  'errorImg': string;
  'errorTextContainer': string;
  'oopsTextContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
