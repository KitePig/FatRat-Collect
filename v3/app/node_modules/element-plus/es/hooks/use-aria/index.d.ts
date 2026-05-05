import * as vue from "vue";

//#region ../../packages/hooks/use-aria/index.d.ts
interface AriaProps {
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation?: 'horizontal' | 'vertical' | 'undefined';
  /**
   * @description native `aria-controls` attribute
   */
  ariaControls?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `AriaProps` instead.
 */
declare const ariaProps: {
  ariaLabel: StringConstructor;
  ariaOrientation: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  ariaControls: StringConstructor;
};
declare const useAriaProps: <T extends keyof typeof ariaProps>(arias: Array<T>) => Pick<{
  ariaLabel: StringConstructor;
  ariaOrientation: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  ariaControls: StringConstructor;
}, T>;
//#endregion
export { AriaProps, ariaProps, useAriaProps };