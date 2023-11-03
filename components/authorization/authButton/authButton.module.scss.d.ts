export type Styles = {
  'authorizationButton': string;
  'authorizationButtonPrimary': string;
  'authorizationButtonPrimaryLoading': string;
  'authorizationButtonSecondary': string;
  'authorizationButtonSecondaryLoading': string;
  'buttonsContainer': string;
  'loading': string;
  'loadingStatus': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
