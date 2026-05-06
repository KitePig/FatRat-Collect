import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./popper.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/popper/src/popper.d.ts
declare const effects: readonly ["light", "dark"];
declare const triggers: readonly ["click", "contextmenu", "hover", "focus"];
declare const Effect: {
  readonly LIGHT: "light";
  readonly DARK: "dark";
};
declare const roleTypes: readonly ["dialog", "grid", "group", "listbox", "menu", "navigation", "tooltip", "tree"];
type PopperEffect = (typeof effects)[number] | (string & NonNullable<unknown>);
type PopperTrigger = (typeof triggers)[number];
interface PopperProps {
  /**
   * @description role determines how aria attributes are distributed
   */
  role?: (typeof roleTypes)[number];
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperProps` instead.
 */
declare const popperProps: {
  readonly role: EpPropFinalized<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown, "tooltip", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `PopperProps` instead.
 */
type PopperPropsPublic = ExtractPublicPropTypes<typeof popperProps>;
type PopperInstance = InstanceType<typeof _default> & unknown;
/** @deprecated use `popperProps` instead, and it will be deprecated in the next major version */
declare const usePopperProps: {
  readonly role: EpPropFinalized<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown, "tooltip", boolean>;
};
/** @deprecated use `PopperProps` instead, and it will be deprecated in the next major version */
type UsePopperProps = PopperProps;
//#endregion
export { Effect, PopperEffect, PopperInstance, PopperProps, PopperPropsPublic, PopperTrigger, UsePopperProps, popperProps, roleTypes, usePopperProps };