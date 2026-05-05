import { Measurable } from "./constants.js";
import { _default } from "./trigger.vue.js";
import * as vue from "vue";

//#region ../../packages/components/popper/src/trigger.d.ts
interface PopperTriggerProps {
  /** @description Indicates the reference element to which the popper is attached */
  virtualRef?: Measurable;
  /** @description Indicates whether virtual triggering is enabled */
  virtualTriggering?: boolean;
  onMouseenter?: (e: MouseEvent) => void;
  onMouseleave?: (e: MouseEvent) => void;
  onClick?: (e: PointerEvent) => void;
  onKeydown?: (e: KeyboardEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onContextmenu?: (e: PointerEvent) => void;
  id?: string;
  open?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperTriggerProps` instead.
 */
declare const popperTriggerProps: {
  readonly virtualRef: {
    readonly type: vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly virtualTriggering: BooleanConstructor;
  readonly onMouseenter: {
    readonly type: vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onMouseleave: {
    readonly type: vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onClick: {
    readonly type: vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onKeydown: {
    readonly type: vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onFocus: {
    readonly type: vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onBlur: {
    readonly type: vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onContextmenu: {
    readonly type: vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly id: StringConstructor;
  readonly open: BooleanConstructor;
};
type PopperTriggerInstance = InstanceType<typeof _default> & unknown;
/** @deprecated use `popperTriggerProps` instead, and it will be deprecated in the next major version */
declare const usePopperTriggerProps: {
  readonly virtualRef: {
    readonly type: vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly virtualTriggering: BooleanConstructor;
  readonly onMouseenter: {
    readonly type: vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onMouseleave: {
    readonly type: vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onClick: {
    readonly type: vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onKeydown: {
    readonly type: vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onFocus: {
    readonly type: vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onBlur: {
    readonly type: vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onContextmenu: {
    readonly type: vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly id: StringConstructor;
  readonly open: BooleanConstructor;
};
/** @deprecated use `PopperTriggerInstance` instead, and it will be deprecated in the next major version */
type ElPopperArrowTrigger = PopperTriggerInstance;
//#endregion
export { ElPopperArrowTrigger, PopperTriggerInstance, PopperTriggerProps, popperTriggerProps, usePopperTriggerProps };