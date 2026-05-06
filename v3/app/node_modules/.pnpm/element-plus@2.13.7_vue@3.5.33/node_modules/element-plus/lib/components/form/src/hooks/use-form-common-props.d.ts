import { ComponentSize } from "../../../../constants/size.js";
import * as vue from "vue";
import { MaybeRef } from "@vueuse/core";

//#region ../../packages/components/form/src/hooks/use-form-common-props.d.ts
declare const useFormSize: (fallback?: MaybeRef<ComponentSize | undefined>, ignore?: Partial<Record<"prop" | "form" | "formItem" | "global", boolean>>) => vue.ComputedRef<"" | "default" | "small" | "large">;
declare const useFormDisabled: (fallback?: MaybeRef<boolean | undefined>) => vue.ComputedRef<boolean>;
declare const useSize: (fallback?: MaybeRef<ComponentSize | undefined>, ignore?: Partial<Record<"prop" | "form" | "formItem" | "global", boolean>>) => vue.ComputedRef<"" | "default" | "small" | "large">;
declare const useDisabled: (fallback?: MaybeRef<boolean | undefined>) => vue.ComputedRef<boolean>;
//#endregion
export { useDisabled, useFormDisabled, useFormSize, useSize };