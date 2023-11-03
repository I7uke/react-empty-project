export type Styles = {
  'buttonHandler': string;
  'buttonHandlerMinus': string;
  'buttonHandlerPlus': string;
  'input': string;
  'inputDefault': string;
  'inputDisabled': string;
  'inputEditMode': string;
  'inputError': string;
  'inputReadOnlyMode': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
