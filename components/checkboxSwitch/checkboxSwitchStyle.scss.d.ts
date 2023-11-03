export type Styles = {
  'input': string;
  'label': string;
  'labelSizeDefault': string;
  'labelSizeLarge': string;
  'labelSizeSmall': string;
  'slider': string;
  'sliderSizeDefault': string;
  'sliderSizeLarge': string;
  'sliderSizeSmall': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
