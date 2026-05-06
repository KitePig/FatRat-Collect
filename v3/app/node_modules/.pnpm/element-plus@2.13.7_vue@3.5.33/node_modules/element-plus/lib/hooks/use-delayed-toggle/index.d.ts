import { EpPropFinalized } from "../../utils/vue/props/types.js";
import "../../utils/index.js";
import { ToRefs } from "vue";

//#region ../../packages/hooks/use-delayed-toggle/index.d.ts
interface UseDelayedToggleProps {
  /**
   * @description delay of appearance, in millisecond, not valid in controlled mode
   */
  showAfter?: number;
  /**
   * @description delay of disappear, in millisecond, not valid in controlled mode
   */
  hideAfter?: number;
  /**
   * @description disappear automatically, in millisecond, not valid in controlled mode
   */
  autoClose?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `UseDelayedToggleProps` instead.
 */
declare const useDelayedToggleProps: {
  readonly showAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly hideAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
  readonly autoClose: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
};
type DelayedToggle = {
  open: (event?: Event) => void;
  close: (event?: Event) => void;
} & ToRefs<Required<UseDelayedToggleProps>>;
declare const useDelayedTogglePropsDefaults: {
  readonly showAfter: 0;
  readonly hideAfter: 200;
  readonly autoClose: 0;
};
declare const useDelayedToggle: ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}: DelayedToggle) => {
  onOpen: (event?: Event, delay?: number) => void;
  onClose: (event?: Event, delay?: number) => void;
};
//#endregion
export { DelayedToggle, UseDelayedToggleProps, useDelayedToggle, useDelayedToggleProps, useDelayedTogglePropsDefaults };