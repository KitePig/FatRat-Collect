import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/backtop/src/backtop.d.ts
interface BacktopProps {
  /**
   * @description the button will not show until the scroll height reaches this value.
   */
  visibilityHeight?: number;
  /**
   * @description the target to trigger scroll.
   */
  target?: string;
  /**
   * @description right distance.
   */
  right?: number;
  /**
   * @description bottom distance.
   */
  bottom?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `BacktopProps` instead.
 */
declare const backtopProps: {
  /**
   * @description the button will not show until the scroll height reaches this value.
   */
  readonly visibilityHeight: {
    readonly type: NumberConstructor;
    readonly default: 200;
  };
  /**
   * @description the target to trigger scroll.
   */
  readonly target: {
    readonly type: StringConstructor;
    readonly default: "";
  };
  /**
   * @description right distance.
   */
  readonly right: {
    readonly type: NumberConstructor;
    readonly default: 40;
  };
  /**
   * @description bottom distance.
   */
  readonly bottom: {
    readonly type: NumberConstructor;
    readonly default: 40;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `BacktopProps` instead.
 */
type BacktopPropsPublic = ExtractPublicPropTypes<typeof backtopProps>;
declare const backtopEmits: {
  click: (evt: MouseEvent) => boolean;
};
type BacktopEmits = typeof backtopEmits;
//#endregion
export { BacktopEmits, BacktopProps, BacktopPropsPublic, backtopEmits, backtopProps };