export type Styles = {
  'componentContainer': string;
  'label': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
