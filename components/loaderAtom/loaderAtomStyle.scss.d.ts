export type Styles = {
  'componentContainer': string;
  'ladingText': string;
  'loading': string;
  'loadingRing': string;
  'rotate': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
