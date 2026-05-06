import * as _ctrl_tinycolor0 from "@ctrl/tinycolor";

//#region ../../packages/components/color-picker-panel/src/utils/color.d.ts
interface ColorOptions {
  enableAlpha: boolean;
  format: string;
  value?: string | null;
}
declare class Color {
  private _hue;
  private _saturation;
  private _value;
  private _alpha;
  private _tiny;
  private _isValid;
  enableAlpha: boolean;
  format: string;
  value: string;
  selected?: boolean;
  constructor(options?: Partial<ColorOptions>);
  set(prop: {
    [key: string]: any;
  } | any, value?: number): void;
  get(prop: string): any;
  toRgb(): _ctrl_tinycolor0.Numberify<_ctrl_tinycolor0.RGBA>;
  fromString(value: string): void;
  clear(): void;
  compare(color: this): boolean;
  doOnChange(): void;
}
//#endregion
export { Color };