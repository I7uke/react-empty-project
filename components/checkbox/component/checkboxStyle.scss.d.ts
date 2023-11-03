export type Styles = {
  'animation_draw': string;
  'box': string;
  'checkboxSize': string;
  'input': string;
  'label': string;
  'svg': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
