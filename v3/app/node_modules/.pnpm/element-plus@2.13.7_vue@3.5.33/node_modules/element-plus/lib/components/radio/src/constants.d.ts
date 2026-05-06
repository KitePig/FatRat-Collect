import { RadioGroupProps } from "./radio-group.js";
import { InjectionKey } from "vue";

//#region ../../packages/components/radio/src/constants.d.ts
interface RadioGroupContext extends RadioGroupProps {
  changeEvent: (val: RadioGroupProps['modelValue']) => void;
}
declare const radioGroupKey: InjectionKey<RadioGroupContext>;
//#endregion
export { RadioGroupContext, radioGroupKey };