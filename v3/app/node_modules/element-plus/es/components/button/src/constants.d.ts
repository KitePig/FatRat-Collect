import { ButtonProps } from "./button.js";
import { InjectionKey } from "vue";

//#region ../../packages/components/button/src/constants.d.ts
interface ButtonGroupContext {
  size?: ButtonProps['size'];
  type?: ButtonProps['type'];
}
declare const buttonGroupContextKey: InjectionKey<ButtonGroupContext>;
//#endregion
export { ButtonGroupContext, buttonGroupContextKey };